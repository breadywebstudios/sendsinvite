#!/usr/bin/env python3
"""Assemble index.html for Invitation Studio from src/ + art in ../studio/out."""
import base64, os, sys
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__))
ART = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, '..', 'studio', 'out')
import glob
NAMES = sorted(os.path.basename(f)[:-5] for f in glob.glob(os.path.join(ART, '*.webp')) if os.path.basename(f) not in ('grain.webp', 'linen.webp'))
def uri(p):
    return 'data:image/webp;base64,' + base64.b64encode(open(p,'rb').read()).decode()
css = open(os.path.join(HERE,'src','app.css')).read()
js = open(os.path.join(HERE,'src','app.js')).read()
css = css.replace('__GRAIN__', uri(os.path.join(ART,'grain.webp'))).replace('__LINEN__', uri(os.path.join(ART,'linen.webp')))
rules = []
for n in NAMES:
    p = os.path.join(ART, n + '.webp'); w, h = Image.open(p).size
    rules.append('.art-%s{aspect-ratio:%d/%d;--img:url("%s");background-image:var(--img)}' % (n, w, h, uri(p)))
css += '\n' + '\n'.join(rules)
FONTS = ('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500'
  '&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400'
  '&family=Parisienne&family=Jost:wght@300;400;500&family=Quicksand:wght@400;500;600&family=Dancing+Script:wght@500;600'
  '&family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Great+Vibes&family=Cinzel:wght@400;500;600&family=Zilla+Slab:wght@500;600'
  '&family=Pacifico&family=Bitter:wght@400;500;600&family=Caveat:wght@500;600&display=swap')
DEFS = '''<svg class="defs" aria-hidden="true" focusable="false"><defs>
<filter id="torn" x="-4%" y="-4%" width="108%" height="108%"><feTurbulence type="fractalNoise" baseFrequency="0.035 0.06" numOctaves="4" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="11" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="torn2" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.05 0.09" numOctaves="5" seed="19" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="16" xChannelSelector="R" yChannelSelector="G"/></filter>
<linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f4f2"/><stop offset=".35" stop-color="#9c9c98"/><stop offset=".55" stop-color="#e9e9e6"/><stop offset=".8" stop-color="#8a8a86"/><stop offset="1" stop-color="#d6d6d2"/></linearGradient>
</defs></svg>'''
html = ('<title>Invitation Studio</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n'
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
  '<link rel="stylesheet" href="%s">\n<style>\n%s\n</style>\n%s\n<div id="app"></div>\n<script>\n%s\n</script>\n') % (FONTS, css, DEFS, js)
out = os.path.join(HERE, 'index.html'); open(out,'w').write(html)
print(out, len(html))
