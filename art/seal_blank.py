#!/usr/bin/env python3
"""Make art/out/seal-blank.webp: the wedding wax seal with the pressed letters smoothed away and a clean
double ring pressed back in, so the page can stamp each couple's own initials on it.
Usage: python art/seal_blank.py      (needs Pillow)"""
import os
from PIL import Image, ImageDraw, ImageFilter, ImageChops

HERE = os.path.dirname(os.path.abspath(__file__))
S = 4                                    # work at 4x for smooth edges
CX, CY = 304, 300                        # centre of the pressed ring, in 4x pixels
R_CLEAR = 204                            # everything inside this is smoothed (letters and their swashes over the ring)

src = Image.open(os.path.join(HERE, 'out', 'seal.webp')).convert('RGBA')
big = src.resize((src.width * S, src.height * S), Image.LANCZOS)
rgb = big.convert('RGB')

# 1. a smooth disc: the letters vanish under a wide blur, the light falling across the wax stays
smooth = rgb.filter(ImageFilter.GaussianBlur(70))
mask = Image.new('L', big.size, 0)
ImageDraw.Draw(mask).ellipse((CX - R_CLEAR, CY - R_CLEAR, CX + R_CLEAR, CY + R_CLEAR), fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(10))
base = Image.composite(smooth, rgb, mask)

# 2. press a clean double ring back in: each ring is a dark groove with a bright lip below-right
def ring(r, w, dark, light):
    shade = Image.new('L', big.size, 0); lit = Image.new('L', big.size, 0)
    ImageDraw.Draw(shade).ellipse((CX - r, CY - r, CX + r, CY + r), outline=255, width=w)
    ImageDraw.Draw(lit).ellipse((CX - r + 2, CY - r + 3, CX + r + 2, CY + r + 3), outline=255, width=w)
    lit = ImageChops.subtract(lit, shade)
    return shade.filter(ImageFilter.GaussianBlur(1.2)).point(lambda v: v * dark // 255), lit.filter(ImageFilter.GaussianBlur(1.2)).point(lambda v: v * light // 255)

out_rgb = base
for r, w in ((178, 4), (164, 3)):
    sh, li = ring(r, w, 120, 170)
    out_rgb = Image.composite(Image.new('RGB', big.size, (92, 64, 22)), out_rgb, sh)
    out_rgb = Image.composite(Image.new('RGB', big.size, (255, 238, 180)), out_rgb, li)

out = Image.merge('RGBA', (*out_rgb.split(), big.getchannel('A')))
out = out.resize((src.width * 2, src.height * 2), Image.LANCZOS)
out.save(os.path.join(HERE, 'out', 'seal-blank.webp'), 'WEBP', quality=90, method=6)
print('seal-blank', out.size)
