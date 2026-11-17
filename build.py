#!/usr/bin/env python3
"""Shared page pieces read by build_site.py: the web font list and the SVG definitions the page needs."""
FONTS = ('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Allura&family=Marcellus'
  '&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400'
  '&family=Parisienne&family=Jost:wght@300;400;500&family=Quicksand:wght@400;500;600&family=Dancing+Script:wght@500;600'
  '&family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Great+Vibes&family=Cinzel:wght@400;500;600&family=Zilla+Slab:wght@500;600'
  '&family=Pacifico&family=Bitter:wght@400;500;600&family=Caveat:wght@500;600&display=swap')
DEFS = '''<svg class="defs" aria-hidden="true" focusable="false"><defs>
<filter id="torn" x="-4%" y="-4%" width="108%" height="108%"><feTurbulence type="fractalNoise" baseFrequency="0.035 0.06" numOctaves="4" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="11" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="torn2" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.05 0.09" numOctaves="5" seed="19" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="16" xChannelSelector="R" yChannelSelector="G"/></filter>
<linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f4f2"/><stop offset=".35" stop-color="#9c9c98"/><stop offset=".55" stop-color="#e9e9e6"/><stop offset=".8" stop-color="#8a8a86"/><stop offset="1" stop-color="#d6d6d2"/></linearGradient>
</defs></svg>'''
