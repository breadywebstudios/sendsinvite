#!/usr/bin/env python3
"""Build the standalone website into ../invite-site/public from src/ + site/ + art + photos.
Usage: python3 build_site.py [art dir]   (config.js in the output is kept if it already exists)"""
import os, re, sys, glob, json, shutil
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__))
ART = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, 'art', 'out')
# inside the website repository the site is built in place; in the project files it goes to ../invite-site
ROOT = HERE if os.path.isdir(os.path.join(HERE, 'public')) else os.path.join(HERE, '..', 'invite-site'); OUT = os.path.join(ROOT, 'public')
for d in ('art', 'photos'): os.makedirs(os.path.join(OUT, d), exist_ok=True)
if os.path.abspath(ROOT) != os.path.abspath(HERE): os.makedirs(os.path.join(ROOT, 'supabase'), exist_ok=True)

css = open(os.path.join(HERE, 'src', 'app.css')).read()
js = open(os.path.join(HERE, 'src', 'app.js')).read()
css = css.replace('__GRAIN__', 'art/grain.webp').replace('__LINEN__', 'art/linen.webp')
rules = []
for f in sorted(glob.glob(os.path.join(ART, '*.webp'))):
    n = os.path.basename(f)[:-5]; shutil.copyfile(f, os.path.join(OUT, 'art', n + '.webp'))
    if n in ('grain', 'linen'): continue
    w, h = Image.open(f).size
    rules.append('.art-%s{aspect-ratio:%d/%d;--img:url("art/%s.webp");background-image:var(--img)}' % (n, w, h, n))
RESET = ('html{-webkit-text-size-adjust:100%}:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}'
         'body{margin:0;font:14px system-ui,-apple-system,"Segoe UI",sans-serif}img{max-width:100%}[hidden]{display:none!important}\n')
open(os.path.join(OUT, 'app.css'), 'w').write(RESET + css + '\n' + '\n'.join(rules) + '\n')
open(os.path.join(OUT, 'app.js'), 'w').write(js)

# library photos: LIBRARY entry N is file real-NN-*.jpg. With the original photos present (art/photos-real) they are
# resized into public/photos; otherwise the photos already in public/photos are used as they are.
photos = {}
SRC = os.path.join(HERE, 'art', 'photos-real')
lib = re.findall(r"\['([0-9a-f]{32})'", js[js.index('var LIBRARY = ['):js.index('];', js.index('var LIBRARY = ['))])
for i, pid in enumerate(lib):
    f = glob.glob(os.path.join(SRC if os.path.isdir(SRC) else os.path.join(OUT, 'photos'), 'real-%02d-*.jpg' % (i + 1))); assert len(f) == 1, (i, f)
    name = os.path.basename(f[0])
    if os.path.isdir(SRC):
        im = Image.open(f[0]).convert('RGB'); im.thumbnail((1600, 1600)); im.save(os.path.join(OUT, 'photos', name), 'JPEG', quality=82, optimize=True, progressive=True)
    photos[pid] = 'photos/' + name
site = open(os.path.join(HERE, 'site', 'site.js')).read()
open(os.path.join(OUT, 'site.js'), 'w').write('window.SITE_PHOTOS = ' + json.dumps(photos, separators=(',', ':')) + ';\n' + site)

cfg = os.path.join(OUT, 'config.js')
if not os.path.exists(cfg):
    open(cfg, 'w').write('/* Where this site keeps invitations, replies and uploaded photos.\n   Both values are safe to publish: the database only allows what its rules permit. */\n'
                         'window.SITE_CONFIG = {\n  supabaseUrl: "",\n  supabaseKey: ""\n};\n')
if os.path.abspath(ROOT) != os.path.abspath(HERE): shutil.copyfile(os.path.join(HERE, 'supabase', 'schema.sql'), os.path.join(ROOT, 'supabase', 'schema.sql'))

m = re.search(r"FONTS = \((.*?)\)\nDEFS = '''(.*?)'''", open(os.path.join(HERE, 'build.py')).read(), re.S)
FONTS = ''.join(re.findall(r"'([^']*)'", m.group(1))); DEFS = m.group(2)
import hashlib
def v(name): return hashlib.md5(open(os.path.join(OUT, name), 'rb').read()).hexdigest()[:8]
html = '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Invitation Studio</title>
<meta name="description" content="Beautiful animated invitations for weddings, birthdays and every celebration. Guests open a link and reply right on the page.">
<meta property="og:title" content="You are invited">
<meta property="og:description" content="Open your invitation and let the host know if you can come.">
<meta property="og:type" content="website">
<meta property="og:image" content="photos/real-01-wedding.jpg">
<meta name="theme-color" content="#f3f0ea">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="%s">
<link rel="stylesheet" href="app.css?v=%s">
</head>
<body>
%s
<div id="app"></div>
<noscript><p style="padding:24px;text-align:center">This invitation needs JavaScript. Turn it on in your browser and reload the page.</p></noscript>
<script src="config.js?v=%s"></script>
<script src="site.js?v=%s"></script>
<script src="app.js?v=%s"></script>
<script src="track.js" defer></script>
</body>
</html>
''' % (FONTS, v('app.css'), DEFS, v('config.js'), v('site.js'), v('app.js'))
open(os.path.join(OUT, 'index.html'), 'w').write(html)
# Guest links with a name (/emma-oliver-wedding) have no file behind them. GitHub Pages serves 404.html for those,
# so it is a copy of the page; on Vercel, vercel.json rewrites them to index.html instead.
open(os.path.join(OUT, '404.html'), 'w').write(html)
open(os.path.join(OUT, 'favicon.svg'), 'w').write('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#f3f0ea"/><path d="M5 10h22v13H5z" fill="#fffdf9" stroke="#8a6d3b" stroke-width="1.4"/><path d="M5 10l11 8 11-8" fill="none" stroke="#8a6d3b" stroke-width="1.4"/><circle cx="16" cy="18" r="3" fill="#b0483a"/></svg>\n')
total = sum(os.path.getsize(os.path.join(dp, f)) for dp, _, fs in os.walk(OUT) for f in fs)
print(OUT, 'files', sum(len(fs) for _, _, fs in os.walk(OUT)), 'bytes', total)
