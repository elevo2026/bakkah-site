#!/usr/bin/env python3
"""Genere les illustrations ORIGINALES (SVG, or sur noir) des articles hors parfums dans ../assets/img/articles/.
Usage : cd clients/bakkah/contenu && python3 generer_images.py   (aucune image telechargee, aucune dependance)"""
import os, math
out = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets", "img", "articles")
os.makedirs(out, exist_ok=True)
W, H = 900, 1260

def defs(extra=""):
    return f'''<defs>
<linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a6a1f"/><stop offset=".3" stop-color="#f6e27a"/><stop offset=".6" stop-color="#c9a227"/><stop offset="1" stop-color="#6e5010"/></linearGradient>
<linearGradient id="silver" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6d6f73"/><stop offset=".3" stop-color="#f4f5f7"/><stop offset=".6" stop-color="#a9acb2"/><stop offset="1" stop-color="#5a5c60"/></linearGradient>
<radialGradient id="bg" cx=".5" cy=".38" r=".85"><stop offset="0" stop-color="#2b2010"/><stop offset=".55" stop-color="#0f0b05"/><stop offset="1" stop-color="#030201"/></radialGradient>
<radialGradient id="halo" cx=".5" cy=".42" r=".5"><stop offset="0" stop-color="#ffe9b0" stop-opacity=".30"/><stop offset="1" stop-color="#ffe9b0" stop-opacity="0"/></radialGradient>
<filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14"/></filter>
<filter id="bl" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6"/></filter>
{extra}</defs>'''

def frame(body, extra_defs=""):
    arch = "M70 1190 V470 C70 220 260 70 450 70 C640 70 830 220 830 470 V1190 Z"
    dots = "".join(f'<circle cx="{450+math.cos(a/12*6.283)*330:.0f}" cy="{470+math.sin(a/12*6.283)*330*0.92:.0f}" r="3" fill="#c9a227" opacity=".35"/>' for a in range(12))
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">{defs(extra_defs)}
<rect width="{W}" height="{H}" fill="#050403"/><path d="{arch}" fill="url(#bg)"/><path d="{arch}" fill="url(#halo)"/>
<path d="{arch}" fill="none" stroke="url(#gold)" stroke-width="6"/><path d="M92 1170 V470 C92 236 272 92 450 92 C628 92 808 236 808 470 V1170 Z" fill="none" stroke="#c9a227" stroke-opacity=".4" stroke-width="2"/>
{dots}<ellipse cx="450" cy="1105" rx="250" ry="26" fill="#000" opacity=".7" filter="url(#sh)"/>
{body}
<path d="M70 1190 H830" stroke="url(#gold)" stroke-width="8"/></svg>'''

G = 'fill="url(#gold)"'; GS = 'fill="none" stroke="url(#gold)" stroke-linecap="round" stroke-linejoin="round"'

def lin(i, c1, c2, vertical=True):
    return f'<linearGradient id="{i}" x1="0" y1="0" x2="{0 if vertical else 1}" y2="{1 if vertical else 0}"><stop offset="0" stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/></linearGradient>'
def rad(i, c1, c2):
    return f'<radialGradient id="{i}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/></radialGradient>'

def vine(x, y, n=6, dx=34, up=1):
    p = ""
    for i in range(n):
        p += f'<path d="M{x+i*dx} {y} q{dx/2} {-26*up} {dx} 0" {GS} stroke-width="3"/><circle cx="{x+i*dx+dx/2}" cy="{y-15*up}" r="4" {G}/>'
    return p

def smoke(x, y, h=260):
    return "".join(f'<path d="M{x+dx} {y} c-40 -{h*.25} 40 -{h*.5} 0 -{h*.75} c-30 -{h*.2} 20 -{h*.2} {dx/3} -{h*.25}" fill="none" stroke="#f6e9c0" stroke-opacity="{o}" stroke-width="7" stroke-linecap="round" filter="url(#bl)"/>' for dx, o in ((-40, .35), (0, .5), (40, .3)))

def abaya(c1, c2, name):
    d = lin("body", c1, c2)
    b = f'''<path d="M450 250V215a22 22 0 1 0-22-22" {GS} stroke-width="7"/>
<path d="M450 250C400 250 370 280 355 330L250 560 170 1000C160 1060 200 1090 270 1095H630C700 1090 740 1060 730 1000L650 560 545 330C530 280 500 250 450 250Z" fill="url(#body)" stroke="url(#gold)" stroke-width="4"/>
<path d="M355 330L250 560 110 900 225 950 305 650Z" fill="#000" opacity=".28"/><path d="M545 330L650 560 790 900 675 950 595 650Z" fill="#000" opacity=".28"/>
<path d="M355 330L250 560 110 900 225 950 305 650Z M545 330L650 560 790 900 675 950 595 650Z" fill="none" stroke="url(#gold)" stroke-width="3"/>
<path d="M408 262Q450 330 492 262" {GS} stroke-width="5"/><path d="M450 318V1095" {GS} stroke-width="3" stroke-dasharray="4 14"/>
<path d="M200 880Q240 910 280 880T360 880" {GS} stroke-width="3"/><path d="M540 880Q580 910 620 880T700 880" {GS} stroke-width="3"/>
{vine(285,1040,10,33)}{vine(285,1065,10,33,-1)}
<path d="M450 520l26 40-26 40-26-40z M450 700l22 34-22 34-22-34z M450 860l18 28-18 28-18-28z" {G}/>
<path d="M120 880l105 50M780 880l-105 50" {GS} stroke-width="5"/>'''
    return frame(b, d)

def veil(c1, c2):
    d = lin("v1", c1, c2) + lin("v2", c2, c1)
    layers = ""
    for i in range(5):
        y = 360 + i * 120
        c = "v1" if i % 2 == 0 else "v2"
        layers += f'<path d="M190 {y} C300 {y-50} 380 {y+40} 450 {y} S600 {y-50} 710 {y} V{y+150} C600 {y+110} 530 {y+190} 450 {y+150} S300 {y+110} 190 {y+150}Z" fill="url(#{c})" stroke="url(#gold)" stroke-width="2.5" opacity="{1-i*0.03}"/>'
        layers += f'<path d="M190 {y+30} C300 {y-20} 380 {y+70} 450 {y+30} S600 {y-20} 710 {y+30}" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="3"/>'
    fringe = "".join(f'<path d="M{200+i*20} 1000v40" {GS} stroke-width="3"/>' for i in range(26))
    return frame(layers + fringe + f'<path d="M190 990H710" {GS} stroke-width="5"/>', d)

def qamis(c1, c2, trim):
    d = lin("body", c1, c2)
    t = "url(#gold)" if trim == "gold" else "#bfb59a"
    b = f'''<path d="M360 290L450 262 540 290 700 380 790 900 700 925 655 560V1100H245V560L200 925 110 900 200 380Z" fill="url(#body)" stroke="url(#gold)" stroke-width="4"/>
<path d="M655 560V1100M245 560V1100" stroke="#000" stroke-opacity=".12" stroke-width="2"/>
<path d="M395 270L450 360 505 270" fill="none" stroke="{t}" stroke-width="12" stroke-linejoin="round"/><path d="M450 360V640" stroke="{t}" stroke-width="8"/>
{"".join(f'<circle cx="450" cy="{400+i*70}" r="9" {G}/>' for i in range(4))}
<path d="M280 640h110v110H280z" fill="none" stroke="{t}" stroke-width="3"/><path d="M285 700h100" stroke="{t}" stroke-width="2"/>
<path d="M135 880L205 905M765 880L695 905" stroke="{t}" stroke-width="10" stroke-linecap="round"/>
<path d="M245 1060H655" stroke="{t}" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round"/>'''
    if trim == "gold":
        b += f'<path d="M420 430q30 24 60 0" {GS} stroke-width="3"/>' + vine(240, 1030, 12, 35)
    return frame(b, d)

def watch(case, dial, strap):
    cf = "url(#gold)" if case == "gold" else "url(#silver)"
    d = lin("strap", "#1b1b1b", "#0a0a0a")
    if strap == "steel":
        links = "".join(f'<rect x="372" y="{y}" width="156" height="30" rx="8" fill="url(#silver)" stroke="#555" stroke-width="2"/>' for y in list(range(170, 400, 36)) + list(range(780, 1010, 36)))
        s = links
    else:
        s = f'<path d="M370 190H530L520 420H380Z M380 780H520L535 1010H365Z" fill="url(#strap)" stroke="url(#gold)" stroke-width="3"/>' + "".join(f'<circle cx="450" cy="{y}" r="6" {G}/>' for y in (250, 300, 350, 860, 910, 960))
    ticks = "".join(f'<path d="M450 450v{30 if i%3==0 else 16}" transform="rotate({i*30} 450 600)" stroke="{ "#f6e27a" if case=="gold" else "#eee"}" stroke-width="{7 if i%3==0 else 3}"/>' for i in range(12))
    hc = "#f6e27a" if case == "gold" else "#f4f5f7"
    b = f'''{s}
<circle cx="450" cy="600" r="215" fill="{cf}"/><circle cx="450" cy="600" r="190" fill="none" stroke="#000" stroke-opacity=".4" stroke-width="3"/>
<circle cx="450" cy="600" r="176" fill="{dial}"/><circle cx="450" cy="600" r="176" fill="url(#halo)"/>
<rect x="662" y="585" width="26" height="30" rx="5" {G if case=="gold" else 'fill="url(#silver)"'}/>
{ticks}<circle cx="450" cy="690" r="36" fill="none" stroke="{hc}" stroke-opacity=".6" stroke-width="2"/><path d="M450 690l14-14" stroke="{hc}" stroke-width="3"/>
<path d="M450 600L450 480" stroke="{hc}" stroke-width="9" stroke-linecap="round"/><path d="M450 600L540 640" stroke="{hc}" stroke-width="9" stroke-linecap="round"/><path d="M450 620L400 540" stroke="#c0392b" stroke-width="3" stroke-linecap="round"/><circle cx="450" cy="600" r="12" {G}/>
<path d="M300 480A190 190 0 0 1 450 410" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="6" stroke-linecap="round"/>'''
    return frame(b, d)

def rug(c1, c2, small=False):
    d = lin("rg", c1, c2)
    fr = "".join(f'<path d="M{250+i*28} 1000v50" {GS} stroke-width="3"/><path d="M{250+i*28} 230v-50" {GS} stroke-width="3"/>' for i in range(0, 17))
    border = "".join(f'<path d="M{262+i*40} 262l14 14-14 14-14-14z" {G}/>' for i in range(0, 14)) if False else ""
    star = "".join(f'<path d="M450 560 L{450+math.cos(a)*90:.0f} {560+math.sin(a)*90:.0f}" {GS} stroke-width="3" transform="rotate({a*57.3:.0f} 450 560)" opacity="0"/>' for a in [0])
    b = f'''{fr}
<rect x="230" y="230" width="440" height="770" rx="10" fill="url(#rg)" stroke="url(#gold)" stroke-width="5"/>
<rect x="258" y="258" width="384" height="714" rx="6" fill="none" stroke="url(#gold)" stroke-width="3"/>
<rect x="272" y="272" width="356" height="686" rx="4" fill="none" stroke="#c9a227" stroke-opacity=".5" stroke-width="2" stroke-dasharray="3 9"/>
<path d="M320 900V560C320 420 580 420 580 560V900Z" fill="#000" fill-opacity=".38" stroke="url(#gold)" stroke-width="4"/>
<path d="M345 880V565C345 455 555 455 555 565V880Z" fill="none" stroke="#c9a227" stroke-opacity=".6" stroke-width="2"/>
<path d="M450 470l12 30h-24z" {G}/><circle cx="450" cy="520" r="6" {G}/>
<g transform="translate(450 700)">{"".join(f'<path d="M0 -70L16 -16 70 0 16 16 0 70 -16 16 -70 0 -16 -16Z" transform="rotate({r})" {GS} stroke-width="3"/>' for r in (0, 45))}<circle r="14" {G}/></g>
{vine(300,940,6,50,-1)}{vine(300,300,6,50)}
<path d="M290 330l16 16-16 16-16-16zM610 330l16 16-16 16-16-16zM290 900l16 16-16 16-16-16zM610 900l16 16-16 16-16-16z" {G}/>'''
    return frame(b, d)

def beads(n, cx, cy, rx, ry, r, fid):
    return "".join(f'<circle cx="{cx+rx*math.cos(a/n*6.283-1.5708):.1f}" cy="{cy+ry*math.sin(a/n*6.283-1.5708):.1f}" r="{r}" fill="url(#{fid})" stroke="#000" stroke-opacity=".35" stroke-width="1.5"/><circle cx="{cx+rx*math.cos(a/n*6.283-1.5708)-r*.3:.1f}" cy="{cy+ry*math.sin(a/n*6.283-1.5708)-r*.3:.1f}" r="{r*.25:.1f}" fill="#fff" fill-opacity=".45"/>' for a in range(1, n + 1))

def tasbih(kind):
    if kind == "bois":
        d = rad("bd", "#a8703a", "#3a1f0c")
    else:
        d = rad("bd", "#ffffff", "#7fa6d8")
    tassel = f'''<path d="M450 880V930" {GS} stroke-width="6"/><circle cx="450" cy="900" r="26" fill="url(#bd)" stroke="#000" stroke-opacity=".35"/>
<path d="M450 930 L405 1060H495Z" fill="url(#gold)" stroke="#6e5010" stroke-width="2"/>{"".join(f'<path d="M{415+i*14} 1060v30" {GS} stroke-width="3"/>' for i in range(7))}<rect x="438" y="926" width="24" height="18" rx="4" {G}/>'''
    b = beads(33, 450, 540, 235, 305, 25, "bd") + tassel + f'<circle cx="450" cy="235" r="14" {G}/>'
    return frame(b, d)

def oud(c1, c2):
    d = lin("wd", c1, c2) + lin("wd2", c2, c1)
    pieces = [
        ("M250 760L360 640 520 660 560 780 450 860 300 840Z", "wd"),
        ("M420 600L520 470 640 520 650 650 560 700 470 680Z", "wd2"),
        ("M520 840L620 740 740 780 730 900 620 940Z", "wd"),
        ("M200 620L270 520 360 560 340 650 260 680Z", "wd2")]
    p = "".join(f'<path d="{s}" fill="url(#{c})" stroke="url(#gold)" stroke-width="3" stroke-linejoin="round"/>' for s, c in pieces)
    grain = "".join(f'<path d="M{x} {y}q40 -20 80 0" {GS} stroke-width="2" opacity=".6"/>' for x, y in ((300, 720), (330, 770), (470, 590), (480, 640), (580, 830), (590, 870)))
    dish = f'<path d="M180 900H720C700 1000 600 1050 450 1050S200 1000 180 900Z" fill="url(#gold)" stroke="#6e5010" stroke-width="3"/><ellipse cx="450" cy="900" rx="270" ry="30" fill="#2b2010" stroke="url(#gold)" stroke-width="3"/>'
    return frame(dish + p + grain + smoke(450, 440, 280), d)

def bakhour(c1, c2):
    d = rad("pb", c1, c2)
    import random
    rnd = random.Random(7)
    stones = ""
    pts = [(330, 800), (450, 780), (570, 800), (390, 720), (510, 720), (450, 650), (300, 740), (600, 740)]
    for x, y in pts:
        rx, ry = rnd.randint(46, 62), rnd.randint(34, 46)
        stones += f'<path d="M{x-rx} {y}Q{x-rx} {y-ry*1.4} {x} {y-ry}T{x+rx} {y}Q{x+rx} {y+ry} {x} {y+ry}T{x-rx} {y}Z" fill="url(#pb)" stroke="url(#gold)" stroke-width="2.5"/>'
    bowl = f'<path d="M200 820H700C690 940 590 1010 450 1010S210 940 200 820Z" fill="url(#gold)" stroke="#6e5010" stroke-width="3"/><path d="M360 1010h180v50H360z" {G}/><path d="M320 1060h260" {GS} stroke-width="8"/>'
    return frame(bowl + stones + smoke(450, 600, 300), d)

def mabkhara(foldable):
    d = lin("mb", "#c9a227", "#6e5010")
    holes = "".join(f'<circle cx="{450+dx}" cy="{y}" r="9" fill="#050403"/>' for y, dxs in ((600, (-60, 0, 60)), (660, (-90, -30, 30, 90)), (720, (-110, -55, 0, 55, 110))) for dx in dxs)
    b = f'''<path d="M300 1060h300v-40H300z M360 1020C360 940 350 900 330 860h240C550 900 540 940 540 1020Z" {G} stroke="#6e5010" stroke-width="3"/>
<path d="M250 860H650C650 760 560 520 450 520S250 760 250 860Z" fill="url(#gold)" stroke="#6e5010" stroke-width="4"/>
<path d="M230 860H670" stroke="url(#gold)" stroke-width="16" stroke-linecap="round"/>
{holes}{vine(280,820,6,57,1)}
<circle cx="450" cy="505" r="22" {G}/><path d="M450 483V440" {GS} stroke-width="10"/>'''
    if foldable:
        b += f'<circle cx="450" cy="415" r="30" fill="none" stroke="url(#gold)" stroke-width="10"/><path d="M520 440A90 90 0 0 0 610 370" {GS} stroke-width="5" stroke-dasharray="2 12"/><path d="M610 370l-26 4 14 18z" {G}/>'
    else:
        b += f'<circle cx="450" cy="415" r="26" {G}/>'
    return frame(b + smoke(450, 380, 240), d)

def bow(cx, cy, s=1):
    return f'<g transform="translate({cx} {cy}) scale({s})"><path d="M0 0C-70 -90 -150 -60 -110 -10 -70 30 -20 10 0 0ZM0 0C70 -90 150 -60 110 -10 70 30 20 10 0 0Z" fill="url(#gold)" stroke="#6e5010" stroke-width="3"/><path d="M0 0L-50 90M0 0L50 90" {GS} stroke-width="10"/><circle r="18" {G}/></g>'

def box(x, y, w, h, c1, c2, idn):
    return f'''<rect x="{x}" y="{y+h*0.22}" width="{w}" height="{h*0.78}" rx="6" fill="url(#{idn})" stroke="url(#gold)" stroke-width="4"/>
<rect x="{x-14}" y="{y}" width="{w+28}" height="{h*0.26}" rx="8" fill="url(#{idn})" stroke="url(#gold)" stroke-width="4"/>
<rect x="{x+w/2-22}" y="{y}" width="44" height="{h}" {G}/><rect x="{x-14}" y="{y+h*0.26/2-9}" width="{w+28}" height="18" {G} opacity=".9"/>'''

def coffret(kind):
    if kind == "prestige":
        d = lin("bx", "#2a1d0c", "#0b0804")
        b = box(215, 520, 470, 520, "", "", "bx") + bow(450, 520, 1.3) + f'<path d="M215 620H685" stroke="#c9a227" stroke-opacity=".4"/>' + vine(280, 960, 10, 34)
    elif kind == "duo":
        d = lin("bx", "#2a1d0c", "#0b0804") + lin("bx2", "#3a0f18", "#12040a")
        b = box(130, 640, 300, 400, "", "", "bx") + box(470, 600, 300, 440, "", "", "bx2") + bow(280, 640, .8) + bow(620, 600, .8)
    elif kind == "parfum-bakhour":
        d = rad("pb", "#e8a0a8", "#5a1f2e") + lin("bt", "#1c2a4a", "#0a1020")
        b = f'''<rect x="170" y="560" width="160" height="440" rx="18" fill="url(#bt)" stroke="url(#gold)" stroke-width="4"/><rect x="215" y="480" width="70" height="86" rx="8" {G}/><rect x="200" y="430" width="100" height="60" rx="10" {G}/><rect x="195" y="700" width="110" height="120" rx="6" fill="#050403" stroke="url(#gold)" stroke-width="3"/><path d="M215 760h70" {GS} stroke-width="4"/>
<path d="M410 880H760C745 970 670 1010 585 1010S425 970 410 880Z" {G} stroke="#6e5010" stroke-width="3"/>''' + "".join(f'<ellipse cx="{x}" cy="{y}" rx="48" ry="34" fill="url(#pb)" stroke="url(#gold)" stroke-width="2.5"/>' for x, y in ((480, 860), (585, 840), (690, 860), (535, 800), (640, 800))) + smoke(585, 760, 240) + f'<circle cx="710" cy="500" r="70" {G}/><text x="710" y="522" text-anchor="middle" font-size="64" font-family="Georgia,serif" font-weight="bold" fill="#0b0804">%</text>'
    else:  # tasbih-tapis
        d = lin("rg", "#0f4a3a", "#062a20") + rad("bd", "#a8703a", "#3a1f0c")
        b = f'''<rect x="210" y="300" width="480" height="760" rx="10" fill="url(#rg)" stroke="url(#gold)" stroke-width="5"/><rect x="238" y="328" width="424" height="704" rx="6" fill="none" stroke="url(#gold)" stroke-width="3"/>
<path d="M310 960V640C310 500 590 500 590 640V960Z" fill="#000" fill-opacity=".35" stroke="url(#gold)" stroke-width="4"/><path d="M450 560l12 30h-24z" {G}/>''' + beads(24, 450, 760, 95, 150, 17, "bd") + f'<path d="M450 910v30" {GS} stroke-width="5"/><path d="M450 940L420 1010H480Z" {G}/>' + f'<circle cx="710" cy="300" r="70" {G}/><text x="710" y="322" text-anchor="middle" font-size="64" font-family="Georgia,serif" font-weight="bold" fill="#0b0804">%</text>'
    return frame(b, d)

JOBS = {
 "abaya-noire": abaya("#1c1c1e", "#050505", "noire"),
 "abaya-taupe": abaya("#8b7a68", "#4a3f33", "taupe"),
 "voile-soie": veil("#f3e9d2", "#d9c48c"),
 "qamis-blanc": qamis("#fbf8f0", "#d8d1bd", "silver"),
 "qamis-noir": qamis("#222224", "#08080a", "gold"),
 "montre-or": watch("gold", "#0a0a0a", "cuir"),
 "montre-argent": watch("silver", "#1d2733", "steel"),
 "tapis-velours": rug("#6b1426", "#2a050e"),
 "tasbih-bois": tasbih("bois"),
 "tasbih-cristal": tasbih("cristal"),
 "oud-cambodge": oud("#5b3a1c", "#21130a"),
 "bakhour-rose": bakhour("#f0b8c0", "#8a3a52"),
 "bakhouriya-pliable": mabkhara(True),
 "coffret-prestige": coffret("prestige"),
 "coffret-duo": coffret("duo"),
 "offre-parfum-bakhour": coffret("parfum-bakhour"),
 "offre-tasbih-tapis": coffret("tasbih-tapis"),
}
for k, svg in JOBS.items():
    open(os.path.join(out, k + ".svg"), "w", encoding="utf-8").write(svg)
print(len(JOBS), "illustrations ->", out)
