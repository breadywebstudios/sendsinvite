#!/usr/bin/env python3
"""Paint the wedding watercolour artwork (blue blooms, sage leaves, gold foil sprigs) into art/out/wc-*.webp.

Each piece is drawn as an SVG with watercolour filters (wobbly edges, pigment pooling at the rim, paper grain),
rendered by headless Chrome on a transparent background and saved as WebP.
Usage: python art/watercolor.py [path to chrome]      (needs Pillow and Chrome or Edge)"""
import math, os, random, subprocess, sys, tempfile
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'out')
CHROME = sys.argv[1] if len(sys.argv) > 1 else next((p for p in (
    r'C:\Program Files\Google\Chrome\Application\chrome.exe', r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome') if os.path.exists(p)), 'chrome')
SCALE = 2

BLUE = ['#b4cbe0', '#7d9fc3', '#4f72a0', '#2f4a73']          # petals, light to deep
LEAF = ['#86a79b', '#a3bba9', '#6b8a99', '#5d8076']          # sage and blue-grey greens
GOLD = 'url(#gold)'

DEFS = '''<defs>
<linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b48a3c"/><stop offset=".3" stop-color="#ecd592"/><stop offset=".5" stop-color="#c9a24e"/><stop offset=".75" stop-color="#f3e2a8"/><stop offset="1" stop-color="#a97f34"/></linearGradient>
<filter id="wc" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="4" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" result="d"/>
  <feGaussianBlur in="d" stdDeviation=".7" result="soft"/>
  <feMorphology in="d" operator="erode" radius="2.2" result="er"/><feGaussianBlur in="er" stdDeviation="1.6" result="erb"/>
  <feComposite in="d" in2="erb" operator="out" result="rim"/>
  <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="11" result="g"/>
  <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  .9 0 0 0 .55" result="grain"/>
  <feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="23" result="b"/>
  <feColorMatrix in="b" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 1.5 0 0 .25" result="bloom"/>
  <feMerge result="m"><feMergeNode in="soft"/><feMergeNode in="rim"/></feMerge>
  <feComposite in="m" in2="grain" operator="in" result="m2"/><feComposite in="m2" in2="bloom" operator="in"/>
</filter>
<filter id="foil" x="-20%" y="-20%" width="140%" height="140%">
  <feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="2" seed="8" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G"/>
</filter>
</defs>'''


def blob(cx, cy, rx, ry, rot, rnd, n=9, j=.14):
    pts = []
    for i in range(n):
        a = 2 * math.pi * i / n; k = 1 + rnd.uniform(-j, j)
        x, y = rx * k * math.cos(a), ry * k * math.sin(a)
        c, s = math.cos(rot), math.sin(rot)
        pts.append((cx + x * c - y * s, cy + x * s + y * c))
    mid = lambda p, q: ((p[0] + q[0]) / 2, (p[1] + q[1]) / 2)
    m = mid(pts[-1], pts[0]); d = 'M%.1f %.1f' % m
    for i in range(n):
        q = mid(pts[i], pts[(i + 1) % n]); d += 'Q%.1f %.1f %.1f %.1f' % (pts[i] + q)
    return d + 'Z'


def flower(cx, cy, r, rnd, tone=0):
    o = []; a0 = rnd.uniform(0, 6.28)
    if r > 34: o.append('<path d="%s" fill="#fbfaf6" opacity=".93" filter="url(#wc)"/>' % blob(cx, cy, r * .8, r * .8, 0, rnd))  # paper underlay hides stems behind a bloom
    rings = [(7, 1.0, .72, BLUE[0 + tone], .5), (6, .72, .56, BLUE[1 + tone], .5), (5, .46, .4, BLUE[min(3, 2 + tone)], .55)]
    for n, ln, wd, col, op in rings:
        a0 += rnd.uniform(.3, .6)
        for i in range(n):
            a = a0 + 2 * math.pi * i / n + rnd.uniform(-.12, .12); L = r * ln * rnd.uniform(.9, 1.08)
            o.append('<path d="%s" fill="%s" opacity="%.2f" filter="url(#wc)"/>' % (
                blob(cx + math.cos(a) * L * .5, cy + math.sin(a) * L * .5, L * .56, r * wd * .5 * rnd.uniform(.9, 1.1), a, rnd), col, op * rnd.uniform(.85, 1.1)))
    o.append('<path d="%s" fill="%s" opacity=".6" filter="url(#wc)"/>' % (blob(cx, cy, r * .17, r * .17, 0, rnd), BLUE[3]))
    for i in range(7):
        a = rnd.uniform(0, 6.28); d = r * rnd.uniform(.03, .16)
        o.append('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>' % (cx + math.cos(a) * d, cy + math.sin(a) * d, max(1.1, r * rnd.uniform(.022, .04)), GOLD))
    return ''.join(o)


def leaf(x, y, deg, L, w, col, op=.62, gold=False):
    d = 'M0 0C%.1f %.1f %.1f %.1f %.1f 0C%.1f %.1f %.1f %.1f 0 0Z' % (L * .3, -w, L * .72, -w * .75, L, L * .72, w * .75, L * .3, w)
    if gold:
        return '<g transform="translate(%.1f %.1f) rotate(%.1f)" filter="url(#foil)"><path d="%s" fill="%s"/><path d="M0 0L%.1f 0" stroke="#8f6c2c" stroke-width=".6" opacity=".55"/></g>' % (x, y, deg, d, GOLD, L * .92)
    return '<g transform="translate(%.1f %.1f) rotate(%.1f)" filter="url(#wc)"><path d="%s" fill="%s" opacity="%.2f"/><path d="M2 0L%.1f 0" stroke="#3f5d58" stroke-width=".9" opacity=".35"/></g>' % (x, y, deg, d, col, op, L * .9)


def stem(pts, col='#6f8f86', w=1.8, gold=False):
    d = 'M%.1f %.1f' % pts[0] + ''.join('Q%.1f %.1f %.1f %.1f' % (pts[i] + pts[i + 1]) for i in range(1, len(pts) - 1, 2))
    return '<path d="%s" fill="none" stroke="%s" stroke-width="%.1f" stroke-linecap="round" opacity="%s"%s/>' % (d, GOLD if gold else col, w, 1 if gold else .75, ' filter="url(#foil)"' if gold else '')


def dots(rnd, box, n, gold=True):
    x0, y0, x1, y1 = box
    return ''.join('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s" opacity="%.2f"/>' % (rnd.uniform(x0, x1), rnd.uniform(y0, y1), rnd.uniform(.9, 2.6),
                   GOLD if gold else BLUE[1], 1 if gold else .45) for _ in range(n))


def gold_sprig(x, y, deg, L, rnd, n=5):
    o = ['<g transform="translate(%.1f %.1f) rotate(%.1f)">' % (x, y, deg), stem([(0, 0), (L * .5, -4), (L, 0)], w=1.3, gold=True)]
    for i in range(n):
        t = (i + 1) / (n + .6); s = 1 if i % 2 else -1
        o.append(leaf(L * t, -3 * math.sin(t * 3.14), s * rnd.uniform(38, 55), L * .3 * (1.1 - t * .45), L * .075, None, gold=True))
    o.append(leaf(L, 0, 0, L * .2, L * .06, None, gold=True)); o.append('</g>')
    return ''.join(o)


def cluster():
    r = random.Random(7); o = []
    o += [stem([(196, 400), (168, 250), (150, 62)]), stem([(214, 400), (250, 260), (262, 112)]), stem([(180, 410), (120, 320), (84, 236)], col='#7c98a6')]
    for (x, y, a, L, c) in [(160, 150, -150, 46, 0), (166, 205, -25, 52, 1), (176, 262, -160, 56, 3), (256, 180, -30, 44, 2), (246, 236, -155, 48, 0), (100, 262, -170, 40, 2), (112, 300, -60, 38, 1)]:
        o.append(leaf(x, y, a, L, L * .26, LEAF[c]))
    for (a, L, c) in [(-168, 128, 0), (-140, 110, 2), (-20, 120, 1), (8, 112, 3), (172, 100, 1), (-48, 96, 0), (150, 86, 3), (35, 92, 2)]:
        o.append(leaf(200 + math.cos(math.radians(a)) * 30, 370 + math.sin(math.radians(a)) * 30, a, L, L * .24, LEAF[c]))
    o += [gold_sprig(150, 350, -128, 150, r, 6), gold_sprig(262, 340, -52, 128, r, 5), gold_sprig(250, 420, 22, 104, r, 4), gold_sprig(140, 420, 160, 96, r, 4)]
    o += [flower(150, 46, 21, r, 1), flower(264, 98, 18, r, 0), flower(80, 226, 15, r, 1)]
    o += [flower(152, 336, 76, r), flower(272, 366, 58, r, 1), flower(196, 428, 44, r)]
    o.append(dots(r, (30, 120, 370, 470), 26)); o.append(dots(r, (40, 200, 360, 470), 10, False))
    return 400, 480, ''.join(o)


def garland():
    r = random.Random(21); o = []
    for sx in (-1, 1):
        cx = 320
        o.append(stem([(cx + sx * 60, 96), (cx + sx * 170, 84), (cx + sx * 292, 104)], col='#7c98a6'))
        for (dx, y, a, L, c) in [(120, 92, 160, 70, 0), (150, 96, -165, 82, 2), (190, 94, 170, 78, 1), (226, 98, -160, 70, 3), (252, 100, 178, 56, 0), (88, 60, -120, 54, 1), (92, 128, 122, 54, 3), (168, 120, 140, 50, 2), (178, 66, -140, 48, 0)]:
            ang = a if sx < 0 else 180 - a
            o.append(leaf(cx + sx * dx, y, ang, L, L * .25, LEAF[c]))
        o.append(gold_sprig(cx + sx * 150, 74, -150 if sx < 0 else -30, 96, r, 5)); o.append(gold_sprig(cx + sx * 130, 122, 152 if sx < 0 else 28, 84, r, 4))
        o.append(flower(cx + sx * 252, 102, 20, r, 1)); o.append(flower(cx + sx * 184, 94, 30, r, 0)); o.append(flower(cx + sx * 104, 98, 44, r, 1 if sx < 0 else 0))
    o.append(flower(320, 92, 62, r)); o.append(dots(r, (30, 20, 610, 165), 30)); o.append(dots(r, (60, 30, 580, 160), 10, False))
    return 640, 180, ''.join(o)


def sprig():
    r = random.Random(3); o = [stem([(58, 396), (66, 230), (60, 52)])]
    for i, y in enumerate(range(340, 90, -52)):
        s = 1 if i % 2 else -1; x = 62 + 3 * math.sin(y / 60)
        o.append(leaf(x, y, -90 + s * 52, 46, 12, LEAF[i % 4]))
        if i in (1, 3): o.append(leaf(x, y + 22, -90 - s * 60, 30, 7, None, gold=True))
    o += [flower(60, 40, 26, r, 1), dots(r, (20, 60, 100, 380), 8)]
    return 120, 400, ''.join(o)


def strand():
    r = random.Random(13); o = [stem([(62, 0), (52, 130), (60, 250), (64, 320), (58, 372)], col='#7c98a6')]
    for i, y in enumerate(range(24, 350, 30)):
        k = 1 - i * .055; x = 58 + 5 * math.sin(y / 70)
        o.append(leaf(x, y, 62, 40 * k, 11 * k, LEAF[i % 4])); o.append(leaf(x, y + 6, 118, 38 * k, 10 * k, LEAF[(i + 2) % 4]))
        if i % 3 == 1:
            o.append(stem([(x, y + 12), (x + 14, y + 20), (x + 20, y + 30)], w=1, gold=True)); o.append('<circle cx="%.1f" cy="%.1f" r="3.4" fill="%s"/>' % (x + 20, y + 32, GOLD))
            o.append(stem([(x, y + 12), (x - 13, y + 22), (x - 17, y + 34)], w=1, gold=True)); o.append('<circle cx="%.1f" cy="%.1f" r="2.8" fill="%s"/>' % (x - 17, y + 36, GOLD))
    o += [flower(58, 378, 15, r, 1), dots(r, (20, 30, 100, 380), 6)]
    return 120, 400, ''.join(o)


def render(name, w, h, body):
    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d" viewBox="0 0 %d %d">%s%s</svg>' % (w * SCALE, h * SCALE, w, h, DEFS, body)
    tmp = tempfile.mkdtemp(); page = os.path.join(tmp, name + '.html'); png = os.path.join(tmp, name + '.png')
    open(page, 'w', encoding='utf-8').write('<!doctype html><html><body style="margin:0;background:transparent;overflow:hidden">' + svg + '</body></html>')
    subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--default-background-color=00000000',
                    '--user-data-dir=' + os.path.join(tmp, 'profile'), '--window-size=%d,%d' % (w * SCALE, h * SCALE), '--screenshot=' + png, 'file:///' + page.replace('\\', '/')],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    im = Image.open(png).convert('RGBA').crop((0, 0, w * SCALE, h * SCALE))
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88, method=6)
    print(name, im.size, os.path.getsize(os.path.join(OUT, name + '.webp')))


if __name__ == '__main__':
    for name, fn in (('wc-cluster', cluster), ('wc-garland', garland), ('wc-sprig', sprig), ('wc-strand', strand)):
        render(name, *fn())
