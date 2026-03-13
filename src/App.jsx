import { useState, useEffect, useRef, useCallback, memo } from "react";

/* ═══════════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════════ */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap');

    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

    :root{
      --bg:#f4f7fe;
      --bg2:#ecf0fc;
      --bg3:#e2e9f8;
      --s:rgba(79,109,195,0.06);
      --b:rgba(79,109,195,0.12);
      --b2:rgba(79,109,195,0.22);
      --blue:#1d4ed8;
      --blue2:#3b82f6;
      --cyan:#0e7490;
      --purple:#6d28d9;
      --pink:#be185d;
      --amber:#b45309;
      --green:#047857;
      --text:#0a0f1e;
      --text2:#1a2035;
      --muted:#4b5a7a;
      --muted2:#8492b0;
      --card:rgba(255,255,255,0.95);
      --white:#ffffff;
      --nh:72px;
      --shadow:0 2px 20px rgba(29,78,216,0.07);
      --shadow2:0 16px 56px rgba(29,78,216,0.13);
      --r:18px;
    }
    html.dm{
      --bg:#060b1a; --bg2:#08102a; --bg3:#0c1633;
      --s:rgba(255,255,255,0.03); --b:rgba(255,255,255,0.07); --b2:rgba(255,255,255,0.13);
      --blue:#60a5fa; --blue2:#93c5fd; --cyan:#22d3ee; --purple:#a78bfa;
      --pink:#f472b6; --amber:#fbbf24; --green:#34d399;
      --text:#eef2ff; --text2:#c7d2fe; --muted:#546080; --muted2:#7888a8;
      --card:rgba(8,16,42,0.9); --white:#0d1530;
      --shadow:0 2px 20px rgba(0,0,0,0.4); --shadow2:0 16px 56px rgba(96,165,250,0.1);
    }
    html{ scroll-behavior:smooth }
    body{
      font-family:'DM Sans',sans-serif;
      background:var(--bg); color:var(--text);
      overflow-x:hidden; transition:background .4s,color .4s;
    }
    h1,h2,h3,h4,h5{font-family:'Bricolage Grotesque',sans-serif;font-optical-sizing:auto}
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-track{background:var(--bg)}
    ::-webkit-scrollbar-thumb{background:linear-gradient(var(--blue),var(--cyan));border-radius:99px}

    /* ── Gradients ── */
    .g1{background:linear-gradient(120deg,var(--blue),var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .g2{background:linear-gradient(120deg,var(--purple),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .g3{background:linear-gradient(120deg,var(--pink),var(--purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

    /* ── Keyframes ── */
    @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}
    @keyframes fadeDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:none}}
    @keyframes scaleIn{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    @keyframes floatR{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-8px) rotate(2deg)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes spinR{to{transform:rotate(-360deg)}}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.9)}}
    @keyframes pulseRing{0%{transform:scale(1);opacity:.5}100%{transform:scale(2.4);opacity:0}}
    @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
    @keyframes borderGlow{0%,100%{opacity:.35}50%{opacity:1}}
    @keyframes slideUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
    @keyframes countIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
    @keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes orbitSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes orbitSpinR{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
    @keyframes gradShift{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(30deg)}}
    @keyframes slideInRight{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:none}}
    @keyframes togglePop{0%{transform:scale(1)}50%{transform:scale(1.15)}100%{transform:scale(1)}}

    /* ── Section-specific animations ── */
    @keyframes cardReveal{from{opacity:0;transform:translateY(36px) scale(.97)}to{opacity:1;transform:none}}
    @keyframes iconBounce{0%{transform:scale(1)}30%{transform:scale(1.22) rotate(-6deg)}60%{transform:scale(.95) rotate(2deg)}100%{transform:scale(1) rotate(0deg)}}
    @keyframes shimmerLine{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
    @keyframes techPop{0%{opacity:0;transform:scale(.6) translateY(18px)}60%{transform:scale(1.08) translateY(-3px)}100%{opacity:1;transform:scale(1) translateY(0)}}
    @keyframes techFloat{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-5px) rotate(3deg)}}
    @keyframes progressDraw{from{transform:scaleX(0)}to{transform:scaleX(1)}}
    @keyframes dotPulse{0%{box-shadow:0 0 0 0 currentColor}70%{box-shadow:0 0 0 8px transparent}100%{box-shadow:0 0 0 0 transparent}}
    @keyframes formSlideIn{from{opacity:0;transform:translateY(20px) scale(.98)}to{opacity:1;transform:none}}
    @keyframes labelFloat{from{transform:translateY(0);font-size:.68rem}to{transform:translateY(-20px);font-size:.6rem}}
    @keyframes inputFocusGlow{0%{box-shadow:0 0 0 0 rgba(29,78,216,.3)}100%{box-shadow:0 0 0 4px rgba(29,78,216,.1)}}
    @keyframes sendPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.02)}}
    @keyframes tiltIn{from{opacity:0;transform:rotateY(-12deg) translateX(-20px)}to{opacity:1;transform:rotateY(0deg) translateX(0)}}
    @keyframes overlayReveal{from{clip-path:inset(0 100% 0 0);opacity:0}to{clip-path:inset(0 0% 0 0);opacity:1}}
    @keyframes glowPulse{0%,100%{opacity:.3}50%{opacity:.7}}
    @keyframes badgePop{0%{transform:scale(0) rotate(-10deg)}70%{transform:scale(1.1) rotate(2deg)}100%{transform:scale(1) rotate(0deg)}}
    @keyframes tagSlide{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:none}}
    @keyframes processLine{from{height:0}to{height:100%}}
    @keyframes dotRing{0%{transform:scale(1);opacity:.6}100%{transform:scale(2);opacity:0}}
    @keyframes formFieldIn{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:none}}

    /* ── SERVICE CARD: racing beam border (conic rotation) ── */
    @property --svc-angle{syntax:'<angle>';initial-value:0deg;inherits:false}
    @keyframes svcRace{to{--svc-angle:360deg}}

    .svc-card{position:relative;border-radius:var(--r)}
    /* Spinning conic beam — hidden at rest, shown on hover */
    .svc-card::before{
      content:'';pointer-events:none;
      position:absolute;inset:-1.5px;
      border-radius:calc(var(--r) + 1.5px);
      background:conic-gradient(
        from var(--svc-angle),
        transparent 0deg,
        transparent 290deg,
        var(--beam, #1d4ed8) 320deg,
        #fff 340deg,
        var(--beam, #1d4ed8) 360deg
      );
      opacity:0;
      transition:opacity .35s;
      z-index:0;
      --svc-angle:0deg;
    }
    .svc-card:hover::before{
      opacity:1;
      animation:svcRace 1.6s linear infinite;
    }
    /* Mask: inner rectangle covers the fill, revealing only the thin border */
    .svc-card::after{
      content:'';pointer-events:none;
      position:absolute;inset:1.5px;
      border-radius:calc(var(--r) - 1px);
      background:var(--card);
      z-index:0;
    }
    .svc-card > *{position:relative;z-index:1}

    /* ── CONTACT FORM BOX: spinning conic spotlight border ── */
    @property --gb-angle{syntax:'<angle>';initial-value:0deg;inherits:false}
    @keyframes gbSpin{to{--gb-angle:360deg}}

    .gb-spin{
      position:relative;
      border-radius:calc(var(--r) + 2px);
    }
    .gb-spin::before{
      content:'';pointer-events:none;
      position:absolute;inset:-1.5px;
      border-radius:calc(var(--r) + 3px);
      background:conic-gradient(
        from var(--gb-angle),
        transparent 0deg,
        var(--blue) 60deg,
        var(--cyan) 90deg,
        rgba(255,255,255,.7) 105deg,
        var(--purple) 120deg,
        transparent 150deg,
        transparent 360deg
      );
      animation:gbSpin 3.5s linear infinite;
      z-index:0;
      --gb-angle:0deg;
    }
    .gb-spin::after{
      content:'';pointer-events:none;
      position:absolute;inset:1.5px;
      border-radius:var(--r);
      background:var(--card);
      z-index:0;
    }
    .gb-spin > *{position:relative;z-index:1}

    /* ── Nav ── */
    .nav{
      position:fixed;top:0;left:0;right:0;z-index:300;
      padding:0 clamp(16px,5vw,80px); height:var(--nh);
      display:flex;align-items:center;justify-content:space-between;
      transition:background .35s,box-shadow .35s;
    }
    .nav.stuck{
      background:var(--nav-bg, rgba(244,247,254,.93));
      backdrop-filter:blur(28px) saturate(1.8);
      box-shadow:0 1px 0 var(--b), var(--shadow);
    }
    html.dm .nav.stuck{--nav-bg:rgba(6,11,26,.93)}

    /* ── Nav link ── */
    .nl{
      position:relative;background:none;border:none;cursor:pointer;
      color:var(--muted);font-family:'DM Sans',sans-serif;font-weight:500;
      font-size:.87rem;letter-spacing:.025em;padding:6px 0;transition:color .2s;
    }
    .nl::after{
      content:'';position:absolute;bottom:0;left:0;width:0;height:1.5px;
      background:linear-gradient(to right,var(--blue),var(--cyan));
      border-radius:99px;transition:width .28s cubic-bezier(.4,0,.2,1);
    }
    .nl:hover{color:var(--blue)}
    .nl:hover::after{width:100%}

    /* ── Buttons ── */
    .bp{
      position:relative;display:inline-flex;align-items:center;gap:8px;
      padding:12px 26px;border-radius:12px;border:none;cursor:pointer;
      font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:.87rem;
      color:#fff;letter-spacing:.02em;overflow:hidden;
      background:linear-gradient(130deg,var(--blue),#0ea5e9);
      transition:transform .18s,box-shadow .18s;
      box-shadow:0 4px 18px rgba(29,78,216,.3);
    }
    .bp::before{
      content:'';position:absolute;inset:0;
      background:linear-gradient(130deg,rgba(255,255,255,.15),transparent);
      opacity:0;transition:opacity .22s;
    }
    .bp:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(29,78,216,.42)}
    .bp:hover::before{opacity:1}
    .bp:active{transform:translateY(0) scale(.98)}
    html.dm .bp{color:#030818}

    .bg{
      display:inline-flex;align-items:center;gap:8px;
      padding:11px 26px;border-radius:12px;cursor:pointer;
      font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:.87rem;
      color:var(--blue);letter-spacing:.02em;
      background:rgba(29,78,216,.06);border:1.5px solid rgba(29,78,216,.2);
      transition:all .22s;
    }
    .bg:hover{background:rgba(29,78,216,.12);border-color:var(--blue);transform:translateY(-2px)}
    .bg:active{transform:translateY(0) scale(.98)}

    /* ── Cards ── */
    .gc{
      position:relative;border-radius:var(--r);
      background:var(--card);border:1px solid var(--b);
      backdrop-filter:blur(16px);
      transition:transform .3s cubic-bezier(.2,.8,.2,1),border-color .25s,box-shadow .3s;
    }
    .gc:hover{transform:translateY(-5px);box-shadow:var(--shadow2);border-color:rgba(29,78,216,.2)}

    /* ── Section tag ── */
    .st{
      display:inline-flex;align-items:center;gap:7px;
      padding:5px 14px;border-radius:99px;
      background:rgba(29,78,216,.07);border:1px solid rgba(29,78,216,.16);
      color:var(--blue);font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
      font-family:'DM Sans',sans-serif;
    }

    /* ── Filter pill ── */
    .fp{
      padding:7px 18px;border-radius:99px;border:1px solid var(--b);
      background:transparent;color:var(--muted);cursor:pointer;
      font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:500;transition:all .2s;
    }
    .fp.on{
      background:linear-gradient(130deg,var(--blue),#0ea5e9);
      color:#fff;border-color:transparent;font-weight:600;
    }
    .fp:hover:not(.on){border-color:var(--blue);color:var(--blue);background:rgba(29,78,216,.05)}

    /* ── Tech badge ── */
    .tb{
      display:flex;flex-direction:column;align-items:center;gap:8px;
      padding:18px 16px;border-radius:14px;
      background:var(--white);border:1px solid var(--b);cursor:default;min-width:80px;
      box-shadow:var(--shadow);
      transition:all .28s cubic-bezier(.2,.8,.2,1);
    }
    .tb:hover{border-color:var(--blue);transform:translateY(-5px) scale(1.04);box-shadow:0 14px 32px rgba(29,78,216,.13)}
    .tb span{font-size:.68rem;color:var(--muted);font-weight:600;letter-spacing:.04em;font-family:'DM Sans',sans-serif}

    /* ── Input ── */
    .inp{
      width:100%;padding:12px 15px;border-radius:11px;
      background:var(--bg2);border:1.5px solid var(--b);
      color:var(--text);font-family:'DM Sans',sans-serif;font-size:.9rem;
      outline:none;transition:border-color .25s,box-shadow .25s,background .25s;
    }
    .inp:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(29,78,216,.09);background:var(--white)}
    .inp::placeholder{color:var(--muted2)}

    /* ── Mode toggle ── */
    .mt{
      width:52px;height:28px;border-radius:99px;
      border:1.5px solid var(--b);
      background:var(--bg2);
      cursor:pointer;display:flex;align-items:center;padding:3px;
      transition:background .35s, border-color .35s;
      position:relative;
    }
    html.dm .mt{background:var(--bg3);border-color:var(--b2)}
    .mk{
      width:20px;height:20px;border-radius:50%;
      background:linear-gradient(135deg,#f59e0b,#fbbf24);
      transition:transform .35s cubic-bezier(.4,0,.2,1), background .35s;
      box-shadow:0 1px 4px rgba(0,0,0,.18);
      display:flex;align-items:center;justify-content:center;
      font-size:11px;line-height:1;
    }
    html.dm .mk{
      transform:translateX(24px);
      background:linear-gradient(135deg,#1e3a5f,#2d4a7a);
    }

    /* ── Project card ── */
    .pc{position:relative;overflow:hidden;border-radius:var(--r)}
    .pc-f{transition:opacity .3s,transform .3s}
    .pc:hover .pc-f{opacity:0;transform:scale(.97)}
    .pc-ov{
      position:absolute;inset:0;border-radius:var(--r);
      display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:28px;
      opacity:0;transform:translateY(10px);
      transition:opacity .32s,transform .32s;
    }
    .pc:hover .pc-ov{opacity:1;transform:none}

    /* ── Timeline ── */
    .tl{opacity:0;transform:translateX(-20px);transition:opacity .55s ease,transform .55s ease}
    .tl.v{opacity:1;transform:none}

    /* ── Marquee ── */
    .mq-wrap{overflow:hidden;white-space:nowrap}
    .mq-inner{display:inline-flex;animation:marquee 32s linear infinite}
    .mq-inner:hover{animation-play-state:paused}

    /* ── Stagger reveal ── */
    .sr{opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s ease}
    .sr.v{opacity:1;transform:none}

    /* ── Gradient border ── */
    .gb{position:relative;border-radius:calc(var(--r) + 2px);padding:1.5px}
    .gb::before{
      content:'';position:absolute;inset:0;border-radius:calc(var(--r) + 2px);
      background:linear-gradient(135deg,var(--blue),var(--cyan),var(--purple),var(--blue));
      background-size:300%;animation:shimmer 5s linear infinite;
    }
    .gb-in{background:var(--card);border-radius:var(--r);position:relative;z-index:1}

    /* ── Hero blob ── */
    .blob{
      position:absolute;border-radius:50%;pointer-events:none;
      filter:blur(80px);
    }

    /* ── Stat card ── */
    .stat-card{
      background:var(--white);border:1px solid var(--b);border-radius:16px;
      padding:22px 26px;text-align:center;
      box-shadow:var(--shadow);
      transition:transform .28s,box-shadow .28s;
    }
    .stat-card:hover{transform:translateY(-4px);box-shadow:var(--shadow2)}

    /* ── Service icon box ── */
    .svc-icon{
      width:50px;height:50px;border-radius:14px;
      display:flex;align-items:center;justify-content:center;
      font-size:1.4rem;margin-bottom:16px;
      transition:transform .28s;
    }
    .gc:hover .svc-icon{transform:scale(1.1) rotate(-4deg)}
    .pc:hover .proj-icon{transform:scale(1.18) rotate(-5deg) translateY(-2px)}

    /* ── WhatsApp ── */
    .wa{
      position:fixed;bottom:28px;right:28px;z-index:600;
      width:56px;height:56px;border-radius:50%;background:#25d366;
      display:flex;align-items:center;justify-content:center;
      cursor:pointer;box-shadow:0 6px 26px rgba(37,211,102,.38);
      transition:transform .18s;animation:float 3.5s ease-in-out infinite;
    }
    .wa:hover{transform:scale(1.12)!important;animation:none}
    .war{position:absolute;inset:-7px;border-radius:50%;border:2px solid #25d366;animation:pulseRing 2.2s ease-out infinite}

    /* ── TYPER FIX: stable container ── */
    .typer-line{
      display:block;
      min-height:1.15em;
      /* Reserve space so nothing jumps on word change */
    }
    .typer-word{
      display:inline-block;
      min-width:0;
    }
    .typer-cursor{
      display:inline-block;
      width:3px;height:.8em;
      background:var(--blue);
      border-radius:2px;
      vertical-align:middle;
      margin-left:3px;
      animation:cursorBlink .9s step-end infinite;
    }

    /* ── Counter ── */
    .cval{
      font-family:'Bricolage Grotesque',sans-serif;
      font-size:clamp(2rem,3.5vw,2.8rem);
      font-weight:800;line-height:1;
      display:inline-block;
    }

    /* ── Service card shimmer ── */
    .svc-shimmer{
      position:absolute;inset:0;border-radius:inherit;overflow:hidden;pointer-events:none;
    }
    .svc-shimmer::after{
      content:'';position:absolute;top:0;left:0;width:40%;height:100%;
      background:linear-gradient(105deg,transparent,rgba(255,255,255,.14),transparent);
      transform:translateX(-100%);
      transition:none;
    }
    .gc:hover .svc-shimmer::after{
      animation:shimmerLine .7s ease forwards;
    }

    /* ── Tech badge float on hover ── */
    .tb:hover .tb-icon{animation:techFloat 1.8s ease-in-out infinite}
    .tb-icon{display:inline-block;transition:transform .2s}

    /* ── Process dot ring ripple ── */
    .proc-dot{position:relative}
    .proc-dot::after{
      content:'';position:absolute;inset:-5px;border-radius:50%;
      border:2px solid currentColor;opacity:0;
      pointer-events:none;
    }
    .gc:hover .proc-dot::after{animation:dotRing .7s ease forwards}

    /* ── Form field animated underline ── */
    .inp-wrap{position:relative}
    .inp-wrap::after{
      content:'';position:absolute;bottom:0;left:8px;right:8px;height:2px;
      background:linear-gradient(to right,var(--blue),var(--cyan));
      border-radius:99px;transform:scaleX(0);transform-origin:left;
      transition:transform .3s cubic-bezier(.4,0,.2,1);
      pointer-events:none;
    }
    .inp-wrap:focus-within::after{transform:scaleX(1)}

    /* ── Send button shimmer ── */
    .send-btn{position:relative;overflow:hidden}
    .send-btn::after{
      content:'';position:absolute;top:0;left:-60%;width:40%;height:100%;
      background:linear-gradient(105deg,transparent,rgba(255,255,255,.25),transparent);
      animation:shimmerLine 2.2s ease-in-out infinite 1s;
    }

    /* ── Project card tilt perspective ── */
    .pc-wrap{
      perspective:900px;
    }
    .pc-inner{
      transform-style:preserve-3d;
      transition:transform .04s linear;
    }

    /* ── Responsive ── */
    @media(max-width:768px){.dm-el{display:none!important}}
    @media(min-width:769px){.mm-el{display:none!important}}
    @media(max-width:580px){.sm-1{grid-template-columns:1fr!important}}
  `}</style>
);

/* ═══════════════════════════════════════════════════════════════
   CANVAS PARTICLES
═══════════════════════════════════════════════════════════════ */
const Particles = memo(({ dark }) => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const pts = Array.from({ length: 48 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
      r: Math.random() * 1.8 + .4, a: Math.random() * .2 + .05,
      hue: [212, 222, 198, 260, 188][Math.floor(Math.random() * 5)],
    }));
    let af;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach(p => {
        p.x = (p.x + p.vx + c.width) % c.width;
        p.y = (p.y + p.vy + c.height) % c.height;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `hsla(${p.hue},75%,65%,${p.a})`
          : `hsla(${p.hue},70%,48%,${p.a})`;
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 100) {
          ctx.beginPath(); ctx.lineWidth = .4;
          ctx.strokeStyle = dark
            ? `rgba(96,165,250,${.09 * (1 - d / 100)})`
            : `rgba(29,78,216,${.09 * (1 - d / 100)})`;
          ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
      af = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(af); window.removeEventListener("resize", resize); };
  }, [dark]);
  return <canvas ref={ref} style={{ position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0 }} />;
});

/* ═══════════════════════════════════════════════════════════════
   TYPING EFFECT — FIXED (no layout shift, no blur)
   Key fix: the parent line has a stable height; only the text content
   changes, never the container dimensions.
═══════════════════════════════════════════════════════════════ */
const Typer = memo(({ words }) => {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentWord = words[idx];
    const speed = isDeleting ? 35 : 80;

    timeoutRef.current = setTimeout(() => {
      if (!isDeleting) {
        const next = currentWord.slice(0, txt.length + 1);
        setTxt(next);
        if (next === currentWord) {
          // Pause then start deleting
          timeoutRef.current = setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        const next = currentWord.slice(0, txt.length - 1);
        setTxt(next);
        if (next === "") {
          setIsDeleting(false);
          setIdx(i => (i + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeoutRef.current);
  }, [txt, isDeleting, idx, words]);

  return (
    <span className="typer-line">
      <span className="typer-word g1">{txt}</span>
      <span className="typer-cursor" />
    </span>
  );
});

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER — FIXED (stable, no re-trigger on parent render)
   Key fix: IntersectionObserver only fires once; value is stored in ref
   during animation so parent re-renders don't reset it.
═══════════════════════════════════════════════════════════════ */
const Counter = memo(({ to, suf = "" }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const dur = 1800;
        let startTime = null;

        const tick = (ts) => {
          if (!startTime) startTime = ts;
          const elapsed = ts - startTime;
          const progress = Math.min(elapsed / dur, 1);
          // Ease-out quart
          const eased = 1 - Math.pow(1 - progress, 4);
          const val = Math.round(eased * to);
          setDisplay(val);
          if (progress < 1) {
            rafRef.current = requestAnimationFrame(tick);
          }
        };

        rafRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [to]);

  return (
    <span
      ref={ref}
      className="cval g1"
      style={{ animation: started.current ? "none" : "countIn .6s ease both" }}
    >
      {display}{suf}
    </span>
  );
});

/* ═══════════════════════════════════════════════════════════════
   STAGGER WRAPPER
═══════════════════════════════════════════════════════════════ */
const Stagger = ({ children, gap = .1, style = {}, className = "" }) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: .07 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const arr = Array.isArray(children) ? children : [children];
  return (
    <div ref={ref} className={className} style={style}>
      {arr.map((child, i) => (
        <div key={i} style={{
          opacity: v ? 1 : 0,
          transform: v ? "none" : "translateY(20px)",
          transition: `opacity .6s ease ${i * gap}s, transform .6s ease ${i * gap}s`
        }}>
          {child}
        </div>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL HOOK
═══════════════════════════════════════════════════════════════ */
const useRev = (th = .1) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: th });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [th]);
  return [ref, v];
};

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL CARD — individual card entrance
═══════════════════════════════════════════════════════════════ */
const RevealCard = ({ children, delay = 0, style = {}, className = "" }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: .08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(36px) scale(.97)",
        transition: `opacity .6s ease ${delay}s, transform .6s cubic-bezier(.2,.8,.2,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   TILT CARD — 3D mouse-tracking tilt for project cards
═══════════════════════════════════════════════════════════════ */
const TiltCard = ({ children, style = {}, className = "" }) => {
  const ref = useRef(null);
  const handleMove = useCallback(e => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - .5) * 14;
    const y = ((e.clientY - rect.top)  / rect.height - .5) * -14;
    el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) scale(1.03)`;
    el.style.boxShadow = `${-x * .8}px ${y * .8}px 40px rgba(29,78,216,.18)`;
  }, []);
  const handleLeave = useCallback(() => {
    const el = ref.current; if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    el.style.boxShadow = "";
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transition:"transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ANIMATED TECH BADGE
═══════════════════════════════════════════════════════════════ */
const TechBadge = memo(({ label, emoji, delay = 0 }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: .1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="tb"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "scale(.6) translateY(18px)",
        transition: `opacity .5s ease ${delay}s, transform .5s cubic-bezier(.34,1.56,.64,1) ${delay}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="tb-icon"
        style={{
          fontSize:"1.9rem",display:"inline-block",
          animation: hovered ? "techFloat 1.8s ease-in-out infinite" : "none",
          transition:"transform .2s",
        }}
      >{emoji}</span>
      <span>{label}</span>
    </div>
  );
});


const SERVICES = [
  { icon:"📱", t:"Flutter App Dev",   a:"#1d4ed8", bg:"#dbeafe", desc:"Cross-platform mobile apps with silky 60 fps animations, native device APIs, and pixel-perfect UI for iOS & Android.", tags:["Dart","Flutter","Firebase"] },
  { icon:"🌐", t:"MERN Stack Web",    a:"#0e7490", bg:"#cffafe", desc:"End-to-end web applications — MongoDB, Express, React and Node.js architected to scale from MVP to millions of users.", tags:["React","Node.js","MongoDB"] },
  { icon:"🐍", t:"Python & AI / ML",  a:"#6d28d9", bg:"#ede9fe", desc:"Machine learning pipelines, automation bots, Django / FastAPI backends and data science dashboards that surface real insight.", tags:["Python","FastAPI","TensorFlow"] },
  { icon:"⚙️", t:"APIs & Services",   a:"#be185d", bg:"#fce7f3", desc:"RESTful and GraphQL APIs, microservice meshes, event-driven architectures, and DB designs built for reliability.", tags:["Node.js","GraphQL","Docker"] },
  { icon:"🎨", t:"UI / UX Design",    a:"#b45309", bg:"#fef3c7", desc:"Wireframes, interactive Figma prototypes and polished design systems that guide users and convert browsers to buyers.", tags:["Figma","Tailwind","Framer"] },
  { icon:"☁️", t:"Cloud & DevOps",    a:"#047857", bg:"#d1fae5", desc:"CI/CD pipelines, Kubernetes orchestration, AWS / GCP infrastructure and proactive monitoring for 99.9% uptime.", tags:["AWS","Docker","K8s","CI/CD"] },
];

const PROJECTS = [
  { title:"ShopFlow",    cat:"MERN",    emoji:"🛒", a:"#1d4ed8", bg:"#dbeafe", desc:"E-commerce platform with real-time inventory & AI recommendations.", tech:"React · Node.js · MongoDB · Redux" },
  { title:"MedTrack",   cat:"Flutter", emoji:"💊", a:"#0e7490", bg:"#cffafe", desc:"Health tracking app with wearable sync and ML health insights.",     tech:"Flutter · Firebase · TFLite" },
  { title:"DataLens",   cat:"Python",  emoji:"📊", a:"#6d28d9", bg:"#ede9fe", desc:"BI dashboard with predictive analytics and live drill-down charts.", tech:"Python · FastAPI · D3.js" },
  { title:"ChatSphere", cat:"MERN",    emoji:"💬", a:"#be185d", bg:"#fce7f3", desc:"Real-time collaboration with video, voice & threaded messaging.",     tech:"React · Socket.io · WebRTC" },
  { title:"LearnPilot", cat:"Flutter", emoji:"🎓", a:"#b45309", bg:"#fef3c7", desc:"EdTech app with adaptive quizzes and progress analytics.",             tech:"Flutter · Dart · Firebase" },
  { title:"NeuralBot",  cat:"Python",  emoji:"🤖", a:"#6d28d9", bg:"#ede9fe", desc:"AI support chatbot with sentiment analysis & CRM integration.",       tech:"Python · OpenAI · FastAPI" },
];

const STACK = [
  {l:"React",e:"⚛️"},{l:"Node.js",e:"🟢"},{l:"MongoDB",e:"🍃"},
  {l:"Flutter",e:"🐦"},{l:"Python",e:"🐍"},{l:"TypeScript",e:"🔷"},
  {l:"Docker",e:"🐳"},{l:"AWS",e:"☁️"},{l:"GraphQL",e:"◈"},
  {l:"Firebase",e:"🔥"},{l:"Redis",e:"🔴"},{l:"PostgreSQL",e:"🐘"},
];

const PROCESS = [
  {n:"01",icon:"🔍",t:"Discovery",   d:"We deep-dive into your goals, users and market to produce a crystal-clear project brief and scope.",               c:"#1d4ed8",bg:"#dbeafe"},
  {n:"02",icon:"🎨",t:"Design",      d:"Figma wireframes and interactive prototypes built to your brand — you see it before we write a single line of code.", c:"#6d28d9",bg:"#ede9fe"},
  {n:"03",icon:"💻",t:"Development", d:"Agile two-week sprints with live demos. Clean, tested, version-controlled code shipped continuously.",                c:"#0e7490",bg:"#cffafe"},
  {n:"04",icon:"🚀",t:"Launch",      d:"CI/CD deployment, Lighthouse-optimised, SEO-ready and actively monitored from day one.",                             c:"#be185d",bg:"#fce7f3"},
  {n:"05",icon:"📈",t:"Scale",       d:"Post-launch analytics, A/B testing, performance tuning and feature additions as your business grows.",                c:"#047857",bg:"#d1fae5"},
];

const TESTIMONIALS = [
  {name:"Sarah Mitchell",role:"CEO — HealthFirst",  av:"SM",c:"#1d4ed8",stars:5, txt:"NovaTech delivered our Flutter app two weeks early and under budget. The quality genuinely impressed every investor in the room."},
  {name:"James Okafor",  role:"CTO — FinSync",      av:"JO",c:"#0e7490",stars:5, txt:"Their MERN expertise is next-level. The real-time dashboard handles 50k concurrent users without breaking a sweat."},
  {name:"Priya Nair",    role:"Founder — EduPilot", av:"PN",c:"#6d28d9",stars:5, txt:"From idea to App Store in three months. NovaTech felt like a true extension of our own team, not just contractors."},
];

const STATS = [
  {label:"Projects Shipped",to:120,suf:"+",icon:"🚀",c:"#1d4ed8",bg:"#dbeafe"},
  {label:"Happy Clients",   to:85, suf:"+",icon:"😊",c:"#0e7490",bg:"#cffafe"},
  {label:"Technologies",    to:20, suf:"+",icon:"⚙️",c:"#6d28d9",bg:"#ede9fe"},
  {label:"Uptime SLA",      to:99, suf:"%",icon:"✅",c:"#047857",bg:"#d1fae5"},
];

const MARQUEE = ["React","Node.js","Flutter","Python","TypeScript","MongoDB","AWS","Docker","Firebase","GraphQL","Redis","Figma","TensorFlow","Kubernetes","PostgreSQL","FastAPI"];

/* ═══════════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════════ */
export default function NovaTech() {
  const [dark, setDark]         = useState(false);
  const [filter, setFilter]     = useState("All");
  const [tIdx, setTIdx]         = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu]         = useState(false);
  const [form, setForm]         = useState({ name:"",email:"",project:"",msg:"" });
  const [sent, setSent]         = useState(false);
  const [hoverStep, setHoverStep] = useState(null);

  const [tlRef, tlVis] = useRev(.07);

  // ── DARK MODE FIX: apply class to <html> so body + ALL elements get vars ──
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dm");
    } else {
      root.classList.remove("dm");
    }
  }, [dark]);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 5200);
    return () => clearInterval(id);
  }, []);

  const cats = ["All","MERN","Flutter","Python"];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === filter);
  const goto = useCallback(id => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
    setMenu(false);
  }, []);

  // Typing words — memoized to prevent re-render reference change
  const typerWords = ["Scale Globally","Drive Revenue","Wow Every User","Perform Flawlessly","Win Markets"];

  return (
    <div style={{ minHeight:"100vh" }}>
      <Styles />

      {/* ══════════════  NAV  ══════════════════════════════════════ */}
      <nav className={`nav${scrolled?" stuck":""}`}>
        <div
          style={{ display:"flex",alignItems:"center",gap:10,cursor:"pointer" }}
          onClick={() => window.scrollTo({top:0,behavior:"smooth"})}
        >
          <div style={{
            width:36,height:36,borderRadius:10,
            background:"linear-gradient(135deg,var(--blue),#0ea5e9)",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,color:"#fff",fontSize:"1rem",
            boxShadow:"0 3px 14px rgba(29,78,216,.32)",
          }}>N</div>
          <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:"1.15rem",color:"var(--text)" }}>
            Nova<span className="g1">Tech</span>
          </span>
        </div>

        <div className="dm-el" style={{ display:"flex",gap:34 }}>
          {["services","projects","stack","process","contact"].map(s => (
            <button key={s} className="nl" onClick={() => goto(s)} style={{ textTransform:"capitalize" }}>{s}</button>
          ))}
        </div>

        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <button className="mt" onClick={() => setDark(d => !d)} aria-label="Toggle dark mode">
            <div className="mk">{dark ? "🌙" : "☀️"}</div>
          </button>
          <button className="bp dm-el" style={{ padding:"9px 20px",fontSize:".82rem" }} onClick={() => goto("contact")}>
            Hire Us ↗
          </button>
          <button
            className="mm-el"
            onClick={() => setMenu(m => !m)}
            style={{ background:"none",border:"none",cursor:"pointer",color:"var(--text)",fontSize:"1.3rem",lineHeight:1,padding:"4px" }}
          >
            {menu ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menu && (
        <div style={{
          position:"fixed",top:"var(--nh)",left:0,right:0,zIndex:299,
          background:"var(--bg)",
          backdropFilter:"blur(24px)",
          borderBottom:"1px solid var(--b)",padding:"24px 28px 32px",
          display:"flex",flexDirection:"column",gap:22,
          boxShadow:"0 20px 60px rgba(29,78,216,.1)",
          animation:"fadeDown .28s ease",
        }}>
          {["services","projects","stack","process","contact"].map(s => (
            <button key={s} className="nl" onClick={() => goto(s)}
              style={{ textTransform:"capitalize",fontSize:"1.02rem",textAlign:"left" }}>{s}</button>
          ))}
          <button className="bp" style={{ alignSelf:"flex-start" }} onClick={() => goto("contact")}>Hire Us ↗</button>
        </div>
      )}

      {/* ══════════════  HERO  ═════════════════════════════════════ */}
      <section id="hero" style={{
        position:"relative",minHeight:"100vh",
        display:"flex",alignItems:"center",justifyContent:"center",
        overflow:"hidden",paddingTop:"var(--nh)",
        background:"radial-gradient(ellipse 90% 70% at 50% 0%,var(--bg3) 0%,var(--bg) 70%)",
      }}>
        {/* Blobs — always rendered, opacity controlled by CSS vars */}
        <div className="blob" style={{ width:"44vw",height:"44vw",top:"-8%",left:"58%",background:"radial-gradient(circle,var(--bg3),transparent)",animation:"float 14s ease-in-out infinite" }}/>
        <div className="blob" style={{ width:"32vw",height:"32vw",top:"28%",left:"-4%",background:"radial-gradient(circle,var(--bg2),transparent)",animation:"float 18s ease-in-out infinite reverse" }}/>
        <div className="blob" style={{ width:"26vw",height:"26vw",bottom:"8%",right:"4%",background:"radial-gradient(circle,var(--bg3),transparent)",animation:"float 22s ease-in-out infinite" }}/>

        <Particles dark={dark} />

        {/* Orbit rings — decorative */}
        <div className="dm-el" style={{ position:"absolute",right:"-60px",top:"50%",transform:"translateY(-50%)",width:320,height:320,pointerEvents:"none",zIndex:0 }}>
          <div style={{
            position:"absolute",inset:0,border:"1px solid var(--b)",
            borderRadius:"50%",animation:"orbitSpin 22s linear infinite",transformOrigin:"center",
          }}>
            <div style={{ position:"absolute",top:-4,left:"50%",width:8,height:8,borderRadius:"50%",background:"var(--blue)",transform:"translateX(-50%)",boxShadow:"0 0 12px var(--blue)" }}/>
          </div>
          <div style={{
            position:"absolute",inset:"18%",border:"1px solid var(--b)",
            borderRadius:"50%",animation:"orbitSpinR 30s linear infinite",transformOrigin:"center",
          }}>
            <div style={{ position:"absolute",bottom:-3,right:"12%",width:6,height:6,borderRadius:"50%",background:"var(--purple)",boxShadow:"0 0 8px var(--purple)" }}/>
          </div>
        </div>

        {/* Floating code snippet */}
        <div className="dm-el" style={{
          position:"absolute",left:"3%",bottom:"18%",
          background:"var(--card)",
          border:"1px solid var(--b)",borderRadius:14,
          padding:"14px 18px",backdropFilter:"blur(20px)",
          boxShadow:"var(--shadow)",
          animation:"floatR 7s ease-in-out infinite",pointerEvents:"none",
          zIndex:1,
        }}>
          <div style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:".7rem",lineHeight:2 }}>
            <div><span style={{color:"var(--purple)"}}>const</span> <span style={{color:"var(--blue)"}}>app</span> = <span style={{color:"var(--cyan)"}}>NovaTech</span>()</div>
            <div><span style={{color:"var(--pink)"}}>app</span>.<span style={{color:"var(--amber)"}}>build</span>(<span style={{color:"var(--cyan)"}}>'your-dream'</span>)</div>
            <div style={{color:"var(--green)"}}>{"// 🚀 shipped in record time ✓"}</div>
          </div>
        </div>

        {/* Hero content */}
        <div style={{
          position:"relative",zIndex:1,textAlign:"center",
          maxWidth:900,padding:"0 22px",
          animation:"fadeUp 1s ease both",
        }}>
          {/* Live badge */}
          <div style={{ marginBottom:26,display:"flex",justifyContent:"center" }}>
            <span className="st" style={{ animation:"scaleIn .7s ease .15s both" }}>
              <span style={{ width:6,height:6,borderRadius:"50%",background:"var(--blue)",display:"inline-block",animation:"pulse 2s ease-in-out infinite",boxShadow:"0 0 7px var(--blue)" }}/>
              Building the Digital Future
            </span>
          </div>

          {/* ── FIXED HERO HEADLINE ──
              The entire two-line heading is in ONE block. The second line
              uses a stable min-height wrapper so no layout shift occurs when
              the typed word changes length. */}
          <div style={{ animation:"fadeUp 1s ease .08s both" }}>
            <h1 style={{
              fontSize:"clamp(2.4rem,6vw,4.8rem)",fontWeight:800,
              lineHeight:1.08,color:"var(--text)",
            }}>
              We Craft Apps That
            </h1>
            {/* ── Typer line: fixed height prevents layout shift ── */}
            <h1 style={{
              fontSize:"clamp(2.4rem,6vw,4.8rem)",fontWeight:800,
              lineHeight:1.12,marginBottom:28,
              /* min-height = 1 line of this font size, prevents collapse */
              minHeight:"1.15em",
              display:"block",
            }}>
              <Typer words={typerWords} />
            </h1>
          </div>

          <p style={{
            fontSize:"clamp(.93rem,1.7vw,1.08rem)",color:"var(--muted)",
            maxWidth:540,margin:"0 auto 44px",lineHeight:1.85,
            animation:"fadeUp 1s ease .22s both",
          }}>
            NovaTech builds high-performance web & mobile products using MERN, Flutter and Python — from early MVP all the way to enterprise scale.
          </p>

          <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",animation:"fadeUp 1s ease .3s both" }}>
            <button className="bp" onClick={() => goto("projects")}>View Our Work →</button>
            <button className="bg" onClick={() => goto("contact")}>Start a Project</button>
          </div>

          {/* Stat cards — counters are memoized, won't reset on dark toggle or other state changes */}
          <div style={{
            display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",
            marginTop:68,animation:"fadeUp 1s ease .42s both",
          }}>
            {STATS.map(s => (
              <div key={s.label} className="stat-card" style={{ minWidth:136 }}>
                <div style={{ fontSize:"1.3rem",marginBottom:6 }}>{s.icon}</div>
                <Counter to={s.to} suf={s.suf} />
                <div style={{ fontSize:".68rem",color:"var(--muted)",marginTop:6,letterSpacing:".06em",textTransform:"uppercase",fontWeight:600 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",
          display:"flex",flexDirection:"column",alignItems:"center",gap:7,
          animation:"fadeUp 2s ease 1s both",
          pointerEvents:"none",
        }}>
          <span style={{ fontSize:".6rem",color:"var(--muted2)",letterSpacing:".14em",textTransform:"uppercase",fontWeight:600 }}>Scroll</span>
          <div style={{ width:1,height:44,background:`linear-gradient(to bottom,var(--blue),transparent)` }}/>
        </div>
      </section>

      {/* ══════════════  MARQUEE STRIP  ════════════════════════════ */}
      <div style={{
        borderTop:"1px solid var(--b)",borderBottom:"1px solid var(--b)",
        background:"var(--bg2)",
        padding:"12px 0",overflow:"hidden",
      }}>
        <div className="mq-wrap">
          <div className="mq-inner">
            {[...MARQUEE,...MARQUEE].map((item,i) => (
              <span key={i} style={{
                display:"inline-flex",alignItems:"center",gap:10,
                padding:"0 24px",fontSize:".76rem",fontWeight:700,
                color:[SERVICES[0].a,SERVICES[1].a,SERVICES[2].a,SERVICES[3].a,SERVICES[4].a,SERVICES[5].a][i%6],
                letterSpacing:".07em",textTransform:"uppercase",
                fontFamily:"'DM Sans',sans-serif",
              }}>
                <span style={{ fontSize:".4rem",opacity:.45 }}>◆</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════  SERVICES  ═════════════════════════════════ */}
      <section id="services" style={{ padding:"100px clamp(18px,5vw,80px)" }}>
        <div style={{ textAlign:"center",marginBottom:60 }}>
          <Stagger gap={0.11} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:14 }}>
            <span className="st">✦ What We Do</span>
            <h2 style={{ fontSize:"clamp(1.75rem,3.8vw,3rem)",fontWeight:800 }}>
              Services That <span className="g2">Deliver Results</span>
            </h2>
            <p style={{ color:"var(--muted)",maxWidth:490,lineHeight:1.85,fontSize:".97rem" }}>
              Full-stack expertise across every layer of the modern tech stack — built to scale, designed to impress.
            </p>
          </Stagger>
        </div>

        <div className="sm-1" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20,maxWidth:1100,margin:"0 auto" }}>
          {SERVICES.map((s, i) => (
            <RevealCard key={s.t} delay={i * 0.08} className="gc svc-card" style={{ padding:"28px 26px",overflow:"hidden",position:"relative","--beam":s.a }}>
              {/* Animated glow orb */}
              <div style={{ position:"absolute",top:-40,right:-40,width:130,height:130,borderRadius:"50%",background:`radial-gradient(circle,${s.a}20,transparent 70%)`,pointerEvents:"none",animation:"glowPulse 3s ease-in-out infinite" }}/>
              {/* Shimmer overlay */}
              <div className="svc-shimmer"/>
              {/* Icon with bounce on card hover */}
              <div className="svc-icon" style={{ background:s.bg,border:`1px solid ${s.a}22`,cursor:"default" }}>{s.icon}</div>
              <h3 style={{ fontSize:"1.05rem",fontWeight:700,marginBottom:10,color:s.a }}>{s.t}</h3>
              <p style={{ color:"var(--muted)",fontSize:".87rem",lineHeight:1.8,marginBottom:16 }}>{s.desc}</p>
              <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
                {s.tags.map((t, ti) => (
                  <span key={t} style={{ padding:"3px 10px",borderRadius:99,fontSize:".68rem",fontWeight:700,background:s.bg,color:s.a,border:`1px solid ${s.a}22`,animation:`badgePop .4s cubic-bezier(.34,1.56,.64,1) ${0.3 + ti * 0.07}s both` }}>{t}</span>
                ))}
              </div>
            </RevealCard>
          ))}
        </div>
      </section>

      {/* ══════════════  PROJECTS  ═════════════════════════════════ */}
      <section id="projects" style={{
        padding:"80px clamp(18px,5vw,80px)",
        background:"var(--bg2)",
        position:"relative",overflow:"hidden",
      }}>
        <div style={{
          position:"absolute",inset:0,
          backgroundImage:"radial-gradient(circle at 1px 1px,var(--b) 1px,transparent 0)",
          backgroundSize:"38px 38px",pointerEvents:"none",
        }}/>

        <div style={{ position:"relative",zIndex:1 }}>
          <div style={{ textAlign:"center",marginBottom:48 }}>
            <Stagger gap={0.11} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:14 }}>
              <span className="st">✦ Our Work</span>
              <h2 style={{ fontSize:"clamp(1.75rem,3.8vw,3rem)",fontWeight:800 }}>
                Projects That <span className="g1">Speak for Us</span>
              </h2>
              <p style={{ color:"var(--muted)",maxWidth:430,lineHeight:1.8,fontSize:".97rem" }}>Hover any card to reveal the full tech stack.</p>
            </Stagger>
            <div style={{ display:"flex",gap:9,justifyContent:"center",flexWrap:"wrap",marginTop:26 }}>
              {cats.map(c => <button key={c} className={`fp${filter===c?" on":""}`} onClick={() => setFilter(c)}>{c}</button>)}
            </div>
          </div>

          <div className="sm-1" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20,maxWidth:1100,margin:"0 auto" }}>
            {filtered.map((p, i) => (
              <RevealCard key={p.title} delay={i * 0.07}>
                <TiltCard className="pc gc" style={{ height:268,cursor:"pointer" }}>
                  <div className="pc-f" style={{ padding:"28px 26px",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
                    <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(to right,${p.a},${p.a}55)`,borderRadius:"18px 18px 0 0" }}/>
                    <div>
                      <div style={{
                        width:52,height:52,borderRadius:14,background:p.bg,border:`1px solid ${p.a}1a`,
                        display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:"1.7rem",marginBottom:13,
                        transition:"transform .3s cubic-bezier(.34,1.56,.64,1)",
                      }}
                        className="proj-icon"
                      >{p.emoji}</div>
                      <h3 style={{ fontSize:"1.08rem",fontWeight:800,marginBottom:7,color:p.a }}>{p.title}</h3>
                      <p style={{ color:"var(--muted)",fontSize:".86rem",lineHeight:1.72 }}>{p.desc}</p>
                    </div>
                    <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:12 }}>
                      <span style={{ padding:"3px 10px",borderRadius:99,fontSize:".68rem",fontWeight:700,background:p.bg,color:p.a,border:`1px solid ${p.a}1a` }}>{p.cat}</span>
                      <span style={{ fontSize:".7rem",color:"var(--muted2)" }}>Hover →</span>
                    </div>
                  </div>
                  {/* Overlay slides in from left on hover */}
                  <div className="pc-ov" style={{
                    background:`linear-gradient(145deg,${p.bg},var(--card))`,
                    border:`1px solid ${p.a}2a`,backdropFilter:"blur(18px)",
                  }}>
                    <div style={{ fontSize:"2.6rem",marginBottom:12,animation:"iconBounce .5s ease both" }}>{p.emoji}</div>
                    <h3 style={{ fontWeight:800,fontSize:"1.05rem",marginBottom:7,color:p.a,animation:"fadeUp .3s ease .05s both" }}>{p.title}</h3>
                    <p style={{ color:"var(--muted)",fontSize:".82rem",marginBottom:7,lineHeight:1.65,animation:"fadeUp .3s ease .1s both" }}>{p.desc}</p>
                    <p style={{ fontSize:".72rem",color:p.a,fontWeight:700,marginBottom:16,fontFamily:"'JetBrains Mono',monospace",animation:"fadeUp .3s ease .15s both" }}>{p.tech}</p>
                    <button className="bp" style={{ padding:"9px 20px",fontSize:".8rem",animation:"scaleIn .3s ease .18s both" }}>View Case Study →</button>
                  </div>
                </TiltCard>
              </RevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════  TECH STACK  ═══════════════════════════════ */}
      <section id="stack" style={{ padding:"100px clamp(18px,5vw,80px)",textAlign:"center" }}>
        <Stagger gap={0.1} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:14,marginBottom:50 }}>
          <span className="st">✦ Our Stack</span>
          <h2 style={{ fontSize:"clamp(1.75rem,3.8vw,3rem)",fontWeight:800 }}>
            Technologies We <span className="g2">Master</span>
          </h2>
          <p style={{ color:"var(--muted)",maxWidth:440,lineHeight:1.85,fontSize:".97rem" }}>
            Every tool chosen deliberately — for performance, scalability and developer experience.
          </p>
        </Stagger>
        <div style={{ display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center",maxWidth:840,margin:"0 auto" }}>
          {STACK.map((s, i) => (
            <TechBadge key={s.l} label={s.l} emoji={s.e} delay={i * 0.045} />
          ))}
        </div>
      </section>

      {/* ══════════════  PROCESS  ══════════════════════════════════ */}
      <section id="process" style={{
        padding:"80px clamp(18px,5vw,80px)",
        background:"var(--bg2)",
        position:"relative",
      }}>
        <div style={{ textAlign:"center",marginBottom:64 }}>
          <Stagger gap={0.11} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:14 }}>
            <span className="st">✦ How We Work</span>
            <h2 style={{ fontSize:"clamp(1.75rem,3.8vw,3rem)",fontWeight:800 }}>
              Our <span className="g1">Proven Process</span>
            </h2>
            <p style={{ color:"var(--muted)",maxWidth:420,lineHeight:1.85,fontSize:".97rem" }}>
              From first call to final deployment — exactly what working with NovaTech looks like.
            </p>
          </Stagger>
        </div>

        <div ref={tlRef} style={{ maxWidth:800,margin:"0 auto",position:"relative" }}>
          <div style={{
            position:"absolute",
            left:"clamp(19px,4.5%,38px)",
            top:16,bottom:16,width:2,
            background:`linear-gradient(to bottom,var(--blue),var(--purple),var(--cyan),transparent)`,
            borderRadius:99,opacity:tlVis?1:.12,
            transition:"opacity 1.1s ease",
          }}/>

          {PROCESS.map((p, i) => (
            <div key={p.n}
              className={`tl${tlVis?" v":""}`}
              style={{ display:"flex",gap:26,marginBottom:20,paddingLeft:"clamp(52px,8%,86px)",transitionDelay:`${i*.13}s`,position:"relative" }}
            >
              {/* Timeline dot with ripple ring on hover */}
              <div style={{
                position:"absolute",left:"clamp(7px,4%,26px)",
                width:24,height:24,borderRadius:"50%",
                background:p.bg,border:`2px solid ${p.c}`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:".58rem",fontWeight:800,color:p.c,
                marginTop:10,flexShrink:0,
                boxShadow:hoverStep===i?`0 0 0 0 ${p.c}`:` 0 0 14px ${p.c}38`,
                transition:"transform .28s,box-shadow .28s",
                transform:hoverStep===i?"scale(1.25)":"scale(1)",
                animation:hoverStep===i?"dotPulse .8s ease":"none",
              }}>{p.n}
                {/* Ripple ring */}
                {hoverStep===i && (
                  <span style={{
                    position:"absolute",inset:-6,borderRadius:"50%",
                    border:`2px solid ${p.c}`,
                    animation:"dotRing .7s ease forwards",
                    pointerEvents:"none",
                  }}/>
                )}
              </div>

              <div
                className="gc"
                style={{
                  flex:1,padding:"20px 24px",cursor:"pointer",
                  borderColor:hoverStep===i?`${p.c}3a`:"var(--b)",
                  boxShadow:hoverStep===i?`0 8px 36px ${p.c}18, var(--shadow)`:"var(--shadow)",
                  background:hoverStep===i?`color-mix(in srgb, ${p.c} 8%, var(--card))`:"var(--card)",
                  transition:"all .28s cubic-bezier(.2,.8,.2,1)",
                  overflow:"hidden",
                }}
                onMouseEnter={() => setHoverStep(i)}
                onMouseLeave={() => setHoverStep(null)}
              >
                {/* Progress bar that draws across on hover */}
                <div style={{
                  position:"absolute",bottom:0,left:0,right:0,height:2,
                  background:`linear-gradient(to right,${p.c},${p.c}55)`,
                  transform:hoverStep===i?"scaleX(1)":"scaleX(0)",
                  transformOrigin:"left",
                  transition:"transform .45s cubic-bezier(.4,0,.2,1)",
                  borderRadius:"0 0 18px 18px",
                }}/>
                <div style={{ display:"flex",alignItems:"center",gap:11,marginBottom:9 }}>
                  <div style={{
                    width:38,height:38,borderRadius:11,background:p.bg,border:`1px solid ${p.c}1a`,
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",flexShrink:0,
                    transition:"transform .3s cubic-bezier(.34,1.56,.64,1)",
                    transform:hoverStep===i?"scale(1.15) rotate(-5deg)":"scale(1) rotate(0deg)",
                  }}>{p.icon}</div>
                  <h3 style={{ fontWeight:700,fontSize:"1.03rem",color:hoverStep===i?p.c:"var(--text)",transition:"color .22s" }}>{p.t}</h3>
                  <span style={{ marginLeft:"auto",fontSize:".68rem",fontFamily:"'JetBrains Mono',monospace",color:"var(--muted2)",opacity:.6 }}>{p.n}</span>
                </div>
                <p style={{ color:"var(--muted)",fontSize:".87rem",lineHeight:1.8 }}>{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════  TESTIMONIALS  ═════════════════════════════ */}
      <section style={{ padding:"100px clamp(18px,5vw,80px)",textAlign:"center",overflow:"hidden" }}>
        <Stagger gap={0.11} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:14,marginBottom:56 }}>
          <span className="st">✦ Client Love</span>
          <h2 style={{ fontSize:"clamp(1.75rem,3.8vw,3rem)",fontWeight:800 }}>
            What Our <span className="g3">Clients Say</span>
          </h2>
        </Stagger>

        <div style={{ maxWidth:660,margin:"0 auto" }}>
          {TESTIMONIALS.map((t, i) => i === tIdx && (
            <div key={t.name} style={{ animation:"slideInRight .48s ease both" }}>
              <div className="gb">
                <div className="gb-in" style={{ padding:"36px 42px",position:"relative" }}>
                  <div style={{ display:"flex",justifyContent:"center",gap:4,marginBottom:20 }}>
                    {Array(t.stars).fill(0).map((_,k) => (
                      <span key={k} style={{ color:"#f59e0b",fontSize:"1.05rem" }}>★</span>
                    ))}
                  </div>
                  <div style={{ position:"absolute",top:16,left:22,fontSize:"5rem",fontFamily:"Georgia,serif",color:t.c,opacity:.08,lineHeight:1,userSelect:"none" }}>"</div>
                  <p style={{ fontSize:"1rem",lineHeight:1.9,fontStyle:"italic",marginBottom:26,color:"var(--text)",position:"relative" }}>{t.txt}</p>
                  <div style={{ display:"flex",alignItems:"center",gap:13,justifyContent:"center" }}>
                    <div style={{
                      width:48,height:48,borderRadius:"50%",
                      background:`linear-gradient(135deg,${t.c},${t.c}80)`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontWeight:800,color:"#fff",fontSize:".84rem",
                      boxShadow:`0 4px 14px ${t.c}44`,
                    }}>{t.av}</div>
                    <div style={{ textAlign:"left" }}>
                      <div style={{ fontWeight:700,fontSize:".93rem",color:"var(--text)" }}>{t.name}</div>
                      <div style={{ color:"var(--muted)",fontSize:".76rem" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div style={{ display:"flex",gap:9,justifyContent:"center",marginTop:22 }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTIdx(i)} style={{
                width:i===tIdx?26:6,height:6,borderRadius:99,border:"none",cursor:"pointer",
                background:i===tIdx?"linear-gradient(to right,var(--blue),var(--cyan))":"var(--b2)",
                transition:"all .32s cubic-bezier(.4,0,.2,1)",
              }}/>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════  CONTACT  ══════════════════════════════════ */}
      <section id="contact" style={{
        padding:"80px clamp(18px,5vw,80px)",
        background:"var(--bg2)",
        position:"relative",
      }}>
        <div style={{
          position:"absolute",inset:0,
          backgroundImage:"radial-gradient(circle at 1px 1px,var(--b) 1px,transparent 0)",
          backgroundSize:"38px 38px",pointerEvents:"none",
        }}/>

        <div style={{ position:"relative",zIndex:1,maxWidth:1060,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:56,alignItems:"start" }}>

          <Stagger gap={0.11}>
            <span className="st">✦ Let's Build</span>
            <div>
              <h2 style={{ fontSize:"clamp(1.75rem,3.8vw,2.8rem)",fontWeight:800,marginBottom:16,lineHeight:1.12 }}>
                Ready to <span className="g1">Start Your Project?</span>
              </h2>
              <p style={{ color:"var(--muted)",lineHeight:1.9,marginBottom:38,fontSize:".96rem" }}>
                Describe your idea and we'll reply within 24 hours with a tailored proposal, timeline estimate and no-obligation quote.
              </p>
            </div>
            <div>
              {[
                {i:"📧",l:"Email",    v:"hello@novatech.dev",c:"#1d4ed8",bg:"#dbeafe"},
                {i:"📱",l:"WhatsApp", v:"+1 (555) 123-4567", c:"#047857",bg:"#d1fae5"},
                {i:"📍",l:"Location", v:"Remote · Worldwide", c:"#6d28d9",bg:"#ede9fe"},
              ].map(ct => (
                <div key={ct.l} style={{ display:"flex",alignItems:"center",gap:15,marginBottom:20 }}>
                  <div style={{ width:44,height:44,borderRadius:13,background:ct.bg,border:`1px solid ${ct.c}1a`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.05rem",flexShrink:0,boxShadow:`0 3px 10px ${ct.c}16` }}>{ct.i}</div>
                  <div>
                    <div style={{ fontSize:".68rem",color:"var(--muted)",marginBottom:2,letterSpacing:".07em",textTransform:"uppercase",fontWeight:700 }}>{ct.l}</div>
                    <div style={{ fontWeight:600,fontSize:".9rem",color:"var(--text)" }}>{ct.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </Stagger>

          <div className="gb-spin" style={{ animation:"formSlideIn .7s cubic-bezier(.2,.8,.2,1) .2s both" }}>
            <div className="gb-in" style={{ padding:"32px 28px" }}>
              {sent ? (
                <div style={{ textAlign:"center",padding:"46px 0",animation:"fadeUp .45s ease" }}>
                  <div style={{ fontSize:"3.2rem",marginBottom:14,animation:"float 2s ease-in-out infinite" }}>🚀</div>
                  <h3 style={{ fontWeight:800,fontSize:"1.35rem",marginBottom:10 }} className="g1">Message Sent!</h3>
                  <p style={{ color:"var(--muted)" }}>We'll be in touch within 24 hours.</p>
                </div>
              ) : (
                <form
                  onSubmit={e => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4200); }}
                  style={{ display:"flex",flexDirection:"column",gap:15 }}
                >
                  <div className="sm-1" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                    <div style={{ animation:"formFieldIn .5s ease .1s both" }}>
                      <label style={{ fontSize:".68rem",color:"var(--muted)",display:"block",marginBottom:5,letterSpacing:".06em",textTransform:"uppercase",fontWeight:700 }}>Name</label>
                      <div className="inp-wrap">
                        <input required className="inp" placeholder="Alex Chen" value={form.name} onChange={e => setForm(f => ({...f,name:e.target.value}))}/>
                      </div>
                    </div>
                    <div style={{ animation:"formFieldIn .5s ease .18s both" }}>
                      <label style={{ fontSize:".68rem",color:"var(--muted)",display:"block",marginBottom:5,letterSpacing:".06em",textTransform:"uppercase",fontWeight:700 }}>Email</label>
                      <div className="inp-wrap">
                        <input required type="email" className="inp" placeholder="alex@co.com" value={form.email} onChange={e => setForm(f => ({...f,email:e.target.value}))}/>
                      </div>
                    </div>
                  </div>
                  <div style={{ animation:"formFieldIn .5s ease .26s both" }}>
                    <label style={{ fontSize:".68rem",color:"var(--muted)",display:"block",marginBottom:5,letterSpacing:".06em",textTransform:"uppercase",fontWeight:700 }}>Project Type</label>
                    <div className="inp-wrap">
                      <select className="inp" value={form.project} onChange={e => setForm(f => ({...f,project:e.target.value}))}>
                        <option value="">Select a service…</option>
                        <option>Flutter Mobile App</option>
                        <option>MERN Web Application</option>
                        <option>Python / AI Solution</option>
                        <option>Full-Stack Product</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ animation:"formFieldIn .5s ease .34s both" }}>
                    <label style={{ fontSize:".68rem",color:"var(--muted)",display:"block",marginBottom:5,letterSpacing:".06em",textTransform:"uppercase",fontWeight:700 }}>Tell us about your idea</label>
                    <div className="inp-wrap">
                      <textarea required className="inp" rows={4} placeholder="Goals, timeline, budget range…" value={form.msg} onChange={e => setForm(f => ({...f,msg:e.target.value}))} style={{ resize:"vertical" }}/>
                    </div>
                  </div>
                  <div style={{ animation:"formFieldIn .5s ease .42s both" }}>
                    <button
                      type="submit"
                      className="bp send-btn"
                      style={{ width:"100%",justifyContent:"center",padding:13,fontSize:".9rem" }}
                    >
                      Send Message →
                    </button>
                  </div>
                  <p style={{ textAlign:"center",fontSize:".71rem",color:"var(--muted2)",animation:"formFieldIn .5s ease .5s both" }}>
                    🔒 Your info is never shared. Response within 24 h.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════  FOOTER  ═══════════════════════════════════ */}
      <footer style={{
        borderTop:"1px solid var(--b)",
        padding:"34px clamp(18px,5vw,80px)",
        display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14,
        background:"var(--bg)",
      }}>
        <div style={{ display:"flex",alignItems:"center",gap:9 }}>
          <div style={{ width:30,height:30,borderRadius:9,background:"linear-gradient(135deg,var(--blue),#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:"#fff",fontSize:".82rem" }}>N</div>
          <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:800,fontSize:".97rem",color:"var(--text)" }}>Nova<span className="g1">Tech</span></span>
        </div>
        <p style={{ color:"var(--muted)",fontSize:".76rem",fontFamily:"'JetBrains Mono',monospace" }}>
          © 2025 NovaTech · Crafting the future, one commit at a time.
        </p>
        <div style={{ display:"flex",gap:18 }}>
          {["Twitter","GitHub","LinkedIn","Dribbble"].map(s => (
            <a key={s} href="#" style={{ color:"var(--muted)",fontSize:".76rem",textDecoration:"none",transition:"color .2s",fontWeight:500 }}
              onMouseEnter={e => e.target.style.color="var(--blue)"}
              onMouseLeave={e => e.target.style.color=""}>
              {s}
            </a>
          ))}
        </div>
      </footer>

      {/* ══════════════  WHATSAPP  ════════════════════════════════ */}
      <div
        className="wa"
        onClick={() => window.open("https://wa.me/15551234567","_blank")}
        title="Chat on WhatsApp"
      >
        <div className="war"/>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.559 4.14 1.535 5.874L.057 23.7a.75.75 0 0 0 .93.918l5.98-1.437A11.937 11.937 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.93 9.93 0 0 1-5.12-1.414l-.367-.218-3.8.913.942-3.716-.239-.38A9.945 9.945 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </div>
    </div>
  );
}