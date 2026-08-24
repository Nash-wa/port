import { useState, useEffect, useRef } from "react";

const IMPACT_STATS = [
  { value: "AIR 07", label: "EDD'25 · IIT Madras" },
  { value: "AIR 09", label: "NEC'24 · IIT Bombay" },
  { value: "GHCI'25", label: "Scholar · AnitaB.org" },
  { value: "50+", label: "Community Members" },
  { value: "20+", label: "Production Screens" },
  { value: "2×", label: "Degrees in Progress" },
];

const PROJECTS = [
  { id:"fabrisense", index:"01", title:"FabriSense", status:"CURRENTLY BUILDING", accentColor:"#E9A83A",
    tagline:"AI quality inspection for handloom fabrics.",
    problem:"Kerala's handloom industry loses significant value to undetected fabric defects — a problem too granular for human inspection at scale.",
    built:"A smartphone-based AI system that captures fabric images, runs YOLOv8 defect detection, and generates a quality grade + inspection report with VLM-powered natural-language explanation.",
    stack:["React","Python FastAPI","ASP.NET Core","YOLOv8","OpenCV","Gemini API","SQL Server"],
    outcome:"In active development — defect detection pipeline functional, grading engine in progress.", github:"https://github.com/Nash-wa" },
  { id:"ambulance", index:"02", title:"Emergency Ambulance Platform", status:"PRODUCTION · DOCWO", accentColor:"#5B9BD5",
    tagline:"Real-time ambulance dispatch — production Flutter internship at Docwo.",
    problem:"Emergency ambulance coordination lacks reliable real-time patient-driver communication and live tracking at scale.",
    built:"Production-grade Flutter Patient + Driver apps with live map tracking, Socket.IO real-time updates, clean architecture, 20+ responsive screens.",
    stack:["Flutter","Dart","Riverpod","GoRouter","Socket.IO","Node.js","Express","PostgreSQL","Prisma","OpenStreetMap"],
    outcome:"Shipped to production at Docwo. 20+ screens, improved reliability.", github:"https://github.com/Nash-wa" },
  { id:"heareyes", index:"03", title:"HearEyes", status:"AICTE YUKTI QUALIFIED", accentColor:"#8B78E6",
    tagline:"Real-time assistive technology for the sensory-impaired.",
    problem:"People with visual or hearing impairments lack affordable, real-time tools for ambient awareness.",
    built:"Integrated assistive system combining Whisper ASR speech-to-text and ambient sound recognition with a Flask REST backend.",
    stack:["Whisper ASR","Flask","Python","REST API","Speech Processing"],
    outcome:"Qualified for AICTE Yukti APF — national recognition for assistive tech innovation.", github:"https://github.com/Nash-wa" },
  { id:"her-horizon", index:"04", title:"HER Horizon", status:"HACKATHON — 2ND PRIZE", accentColor:"#E8705A",
    tagline:"AI-powered EdTech and career platform for women in tech.",
    problem:"Women entering tech face structural barriers — poor mentorship access, biased guidance, limited industry visibility.",
    built:"AI-powered platform combining personalized career guidance, curated learning paths, and mentorship matching for women in tech.",
    stack:["React","Node.js","MongoDB","Gemini API","Python","Express"],
    outcome:"Second Prize — Data Dive Hackathon.", github:"https://github.com/Nash-wa" },
  { id:"nasa", index:"05", title:"Vegetation Stress Mapping", status:"NASA SPACE APPS · GLOBAL", accentColor:"#3DAA6E",
    tagline:"Geospatial analytics for ecological stress detection from satellite data.",
    problem:"Identifying vegetation stress across large regions requires processing high-volume satellite imagery at scale.",
    built:"Geospatial analytics pipeline using MODIS NDVI, NASA AppEEARS, and QGIS to map and classify ecological stress zones.",
    stack:["QGIS","MODIS NDVI","NASA AppEEARS","Python","Geospatial Analysis"],
    outcome:"Galactic Problem Solver — NASA International Space Apps Challenge global recognition.", github:"https://github.com/Nash-wa" },
];

const EXPERIENCE = [
  { org:"Docwo", role:"Flutter Developer Intern", period:"May 2026 – Jun 2026", desc:"Built 20+ production Flutter screens for an emergency ambulance booking platform using Riverpod, GoRouter, REST APIs, and Socket.IO." },
  { org:"Infosys Springboard", role:"AI/ML Intern", period:"Sep 2025 – Jun 2026", desc:"End-to-end ML workflows: data preprocessing, feature engineering, model training and evaluation using Python and Scikit-learn." },
  { org:"The Nexus Project", role:"Frontend Developer Intern", period:"Jun 2025 – Jul 2025", desc:"Built responsive React UI components, improved performance and scalability across web projects." },
  { org:"E-Cell IIT Bombay", role:"Campus Ambassador", period:"Jul 2024 – Jul 2025", desc:"AIR 14 among 2,500+ campus ambassadors nationwide. Led JEC to AIR 9 (NEC'24) and AIR 7 (EDD'25)." },
  { org:"Edu-versity", role:"AI Intern & Campus Ambassador", period:"Jun 2024 – Oct 2024", desc:"AI research and campus outreach initiatives." },
  { org:"Maitexa Technologies", role:"Machine Learning Intern", period:"Apr 2024", desc:"Built supervised ML models and end-to-end Python data pipelines. Hands-on NLP and ML implementation." },
];

const ACHIEVEMENTS = [
  { rank:"AIR 07", context:"EDD'25", org:"IIT Madras", full:"Entrepreneurship Development Drive" },
  { rank:"AIR 09", context:"NEC'24", org:"IIT Bombay", full:"National Entrepreneurship Challenge" },
  { rank:"GHCI'25", context:"Scholar", org:"AnitaB.org", full:"Grace Hopper Celebration India — Advancing Inclusion" },
  { rank:"1st", context:"PALS RSW 2025", org:"IIT Madras", full:"IPL Analytics System — First Prize" },
  { rank:"1st", context:"Think2Impact", org:"IT Track", full:"AI-powered travel recommendation solution" },
  { rank:"AIR 14", context:"Campus Ambassador", org:"IIT Bombay", full:"Among 2,500+ participants nationwide" },
  { rank:"Global", context:"NASA Space Apps", org:"NASA", full:"Galactic Problem Solver" },
  { rank:"APF", context:"AICTE Yukti", org:"AICTE", full:"HearEyes — Assistive Technology Qualifier" },
];

const TIMELINE = [
  { year:"2019", phase:"ORIGIN", event:"School Leader", org:"St. Francis English Medium School", desc:"First leadership role — leading people before leading code." },
  { year:"2023", phase:"BEGIN", event:"Dual Degree Journey", org:"JEC + IIT Madras", desc:"B.Tech CSE and BS Data Science simultaneously. Started exploring ML fundamentals." },
  { year:"Apr 2024", phase:"FIRST ML", event:"Machine Learning Intern", org:"Maitexa Technologies", desc:"First real ML work — supervised models, NLP, and data pipelines." },
  { year:"Jul 2024", phase:"BUILD", event:"Founded E-Cell JEC", org:"Jyothi Engineering College", desc:"Built JEC's first entrepreneurship ecosystem from scratch. 50+ member community in year one." },
  { year:"Dec 2024", phase:"COMPETE", event:"AIR 9 — NEC'24", org:"IIT Bombay", desc:"Led JEC team to All India Rank 9 at the National Entrepreneurship Challenge." },
  { year:"Jun 2025", phase:"SHIP", event:"Frontend Intern + IEDC Lead", org:"Nexus Project + IEDC JECC", desc:"Shipping React components in production while simultaneously leading student innovation programs." },
  { year:"Sep 2025", phase:"RECOGNIZE", event:"GHCI'25 Scholar + PALS 1st", org:"AnitaB.org + IIT Madras", desc:"Selected for Grace Hopper Celebration India. Won First Prize at PALS RSW 2025." },
  { year:"Dec 2025", phase:"LEAD", event:"AIR 7 — EDD'25", org:"IIT Madras", desc:"All India Rank 7 at EDD'25. Concurrent AI/ML work at Infosys Springboard." },
  { year:"May 2026", phase:"PRODUCTION", event:"Docwo Flutter Internship", org:"Docwo", desc:"Shipped 20+ production screens for emergency ambulance platform." },
  { year:"NOW", phase:"BUILDING", event:"FabriSense + TriageNet", org:"Independent", desc:"AI quality inspection for handloom and offline emergency triage system." },
];

const SKILLS = {
  "AI / ML":["Python","Machine Learning","NLP","Computer Vision","RAG Pipelines","Whisper ASR","Vertex AI","Gemini API","Scikit-learn"],
  "Mobile":["Flutter","Dart","Riverpod","GoRouter","Clean Architecture","Socket.IO"],
  "Frontend":["React","HTML","CSS","JavaScript","Tailwind CSS"],
  "Backend":["Node.js","Express.js","REST APIs","PostgreSQL","MySQL","MongoDB","Prisma"],
  "Data & Tools":["QGIS","Jupyter Notebook","Git","GitHub","Agile/Scrum","SQL"],
};

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [activeSkillCat, setActiveSkillCat] = useState("AI / ML");
  const [hoveredAch, setHoveredAch] = useState(null);
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorTrailRef = useRef(null);
  const mouseRef = useRef({ x:0, y:0 });
  const canvasAnimRef = useRef(null);

  const c = {
    bg: dark?"#0A0A0A":"#F7F4EE",
    surface: dark?"#111111":"#EDEAE2",
    surfaceAlt: dark?"#1A1A1A":"#E2DFD7",
    text: dark?"#F0EDE6":"#0A0A0A",
    muted: dark?"#6A6764":"#7A7774",
    accent:"#E9A83A",
    accentBg: dark?"rgba(233,168,58,0.10)":"rgba(233,168,58,0.13)",
    border: dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.09)",
  };

  // Cursor
  useEffect(() => {
    const dot=cursorRef.current, trail=cursorTrailRef.current;
    if(!dot||!trail) return;
    let tx=0,ty=0,raf;
    const onMove=e=>{ mouseRef.current={x:e.clientX,y:e.clientY}; dot.style.left=e.clientX+"px"; dot.style.top=e.clientY+"px"; };
    const loop=()=>{ tx+=(mouseRef.current.x-tx)*0.09; ty+=(mouseRef.current.y-ty)*0.09; trail.style.left=tx+"px"; trail.style.top=ty+"px"; raf=requestAnimationFrame(loop); };
    window.addEventListener("mousemove",onMove); raf=requestAnimationFrame(loop);
    return()=>{ window.removeEventListener("mousemove",onMove); cancelAnimationFrame(raf); };
  },[]);

  // Canvas
  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas) return;
    const ctx=canvas.getContext("2d");
    const resize=()=>{ canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight; };
    resize(); const ro=new ResizeObserver(resize); ro.observe(canvas);
    const labels=["AI","BUILD","LEAD","CREATE","IMPACT","ML","PRODUCT","EXPLORE"];
    const nodes=labels.map((label,i)=>({ label, angle:(i/labels.length)*Math.PI*2, speed:0.0004+Math.random()*0.0003, orbitR:0, offset:Math.random()*Math.PI*2, size:2.5+Math.random()*1.5, x:0, y:0 }));
    let frame=0;
    const draw=()=>{
      const W=canvas.width,H=canvas.height; ctx.clearRect(0,0,W,H); frame++;
      const cx=W/2,cy=H/2,r=Math.min(W,H)*0.33;
      const rect=canvas.getBoundingClientRect();
      const mx=mouseRef.current.x-rect.left, my=mouseRef.current.y-rect.top;
      nodes.forEach(n=>{
        n.angle+=n.speed; const wb=Math.sin(frame*0.012+n.offset)*10;
        n.x=cx+Math.cos(n.angle)*(r+wb); n.y=cy+Math.sin(n.angle)*(r+wb);
        const dx=n.x-mx,dy=n.y-my,d=Math.hypot(dx,dy);
        if(d<90&&d>0){const f=(90-d)/90; n.x+=(dx/d)*f*14; n.y+=(dy/d)*f*14;}
      });
      nodes.forEach((a,i)=>{
        nodes.forEach((b,j)=>{ if(j<=i) return; const d=Math.hypot(a.x-b.x,a.y-b.y); if(d<170){const alpha=(1-d/170)*(dark?0.16:0.10); ctx.beginPath(); ctx.strokeStyle=`rgba(233,168,58,${alpha})`; ctx.lineWidth=0.7; ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();}});
        const dc=Math.hypot(a.x-cx,a.y-cy); const alpha=Math.max(0,(1-dc/(r*1.4))*(dark?0.09:0.06));
        ctx.beginPath(); ctx.strokeStyle=`rgba(233,168,58,${alpha})`; ctx.lineWidth=0.4; ctx.moveTo(a.x,a.y); ctx.lineTo(cx,cy); ctx.stroke();
      });
      nodes.forEach(n=>{
        const pulse=Math.sin(frame*0.02+n.offset);
        ctx.beginPath(); ctx.arc(n.x,n.y,n.size+3+pulse*1.5,0,Math.PI*2); ctx.strokeStyle=`rgba(233,168,58,${0.07+pulse*0.03})`; ctx.lineWidth=1; ctx.stroke();
        ctx.beginPath(); ctx.arc(n.x,n.y,n.size,0,Math.PI*2); ctx.fillStyle="#E9A83A"; ctx.fill();
        ctx.font="500 9px 'Sora',sans-serif"; ctx.fillStyle=dark?"rgba(240,237,230,0.42)":"rgba(10,10,10,0.38)"; ctx.textAlign="center"; ctx.fillText(n.label,n.x,n.y-n.size-6);
      });
      const g=ctx.createRadialGradient(cx,cy,0,cx,cy,38); const p=0.5+Math.sin(frame*0.018)*0.5;
      g.addColorStop(0,`rgba(233,168,58,${0.10+p*0.07})`); g.addColorStop(1,"rgba(233,168,58,0)");
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,38,0,Math.PI*2); ctx.fill();
      canvasAnimRef.current=requestAnimationFrame(draw);
    };
    canvasAnimRef.current=requestAnimationFrame(draw);
    return()=>{ cancelAnimationFrame(canvasAnimRef.current); ro.disconnect(); };
  },[dark]);

  // Reveal on scroll
  useEffect(()=>{
    const els=document.querySelectorAll(".rv");
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("vis"); }),{threshold:0.08});
    els.forEach(el=>obs.observe(el)); return()=>obs.disconnect();
  });

  const scrollTo=id=>{ document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenuOpen(false); };
  const navLinks=["about","work","journey","leadership","achievements","contact"];

  const S = (obj) => obj; // pass-through for style objects

  return (
    <div style={{fontFamily:"'Inter',system-ui,sans-serif",background:c.bg,color:c.text,minHeight:"100vh",overflowX:"hidden",transition:"background 0.45s,color 0.45s"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        .cdot{position:fixed;width:7px;height:7px;border-radius:50%;background:#E9A83A;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:difference}
        .ctr{position:fixed;width:26px;height:26px;border-radius:50%;border:1.5px solid rgba(233,168,58,0.35);pointer-events:none;z-index:9998;transform:translate(-50%,-50%)}
        .rv{opacity:0;transform:translateY(20px);transition:opacity 0.6s cubic-bezier(.4,0,.2,1),transform 0.6s cubic-bezier(.4,0,.2,1)}
        .rv.vis{opacity:1;transform:none}
        .d1{transition-delay:.08s}.d2{transition-delay:.16s}.d3{transition-delay:.24s}.d4{transition-delay:.32s}
        .nl{cursor:pointer;position:relative;transition:color 0.2s}
        .nl::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1px;background:#E9A83A;transition:width 0.28s}
        .nl:hover::after,.nl.act::after{width:100%}
        .mb{transition:transform 0.28s cubic-bezier(.4,0,.2,1),box-shadow 0.28s;cursor:pointer}
        .mb:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(233,168,58,0.22)}
        .mb:active{transform:none}
        .ac{transition:transform 0.28s cubic-bezier(.4,0,.2,1);cursor:default}
        .ac:hover{transform:translateY(-5px) scale(1.02)}
        .pl{transition:border-color 0.2s,background 0.2s}
        .sk{transition:background .18s,color .18s,transform .18s}
        .sk:hover{transform:translateY(-2px)}
        .prow{transition:background .22s}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:rgba(233,168,58,0.25);border-radius:2px}
        @media(max-width:768px){.cdot,.ctr,.hm{display:none!important}.hg{flex-direction:column!important}.hc{min-height:260px!important;margin-top:28px}.ig{flex-wrap:wrap}.pr{flex-direction:column!important}.er{flex-direction:column!important;gap:8px!important}.ag{grid-template-columns:repeat(2,1fr)!important}}
        @media(prefers-reduced-motion:reduce){.rv,.mb,.ac,.sk,.pl{transition:none!important}}
      `}</style>

      <div ref={cursorRef} className="cdot hm"/>
      <div ref={cursorTrailRef} className="ctr hm"/>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,height:"56px",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 32px",background:dark?"rgba(10,10,10,0.90)":"rgba(247,244,238,0.90)",backdropFilter:"blur(18px)",borderBottom:`1px solid ${c.border}`,transition:"background 0.45s"}}>
        <span style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:"14px",letterSpacing:"-0.02em",cursor:"pointer"}} onClick={()=>scrollTo("hero")}>
          Nashwa <span style={{color:c.accent}}>S P</span>
        </span>
        <div className="hm" style={{display:"flex",gap:"26px",alignItems:"center"}}>
          {navLinks.map(l=>(
            <span key={l} className={`nl${activeSection===l?" act":""}`} onClick={()=>scrollTo(l)}
              style={{fontSize:"10px",fontWeight:600,letterSpacing:"0.10em",textTransform:"uppercase",color:activeSection===l?c.accent:c.muted,userSelect:"none"}}>
              {l}
            </span>
          ))}
        </div>
        <button onClick={()=>setDark(!dark)} style={{background:c.surfaceAlt,border:`1px solid ${c.border}`,borderRadius:"20px",padding:"5px 13px",cursor:"pointer",color:c.text,fontSize:"10px",fontWeight:600,letterSpacing:"0.04em",transition:"background 0.2s"}}>
          {dark?"☀ Light":"◑ Dark"}
        </button>
      </nav>

      {/* HERO */}
      <section id="hero" style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"80px 32px 60px",maxWidth:"1440px",margin:"0 auto"}}>
        <div className="hg" style={{display:"flex",gap:"52px",alignItems:"center",width:"100%"}}>
          <div style={{flex:"0 0 52%",maxWidth:"580px"}}>
            <div className="rv" style={{marginBottom:"18px",display:"flex",alignItems:"center",gap:"10px"}}>
              <span style={{display:"inline-block",width:"20px",height:"1px",background:c.accent}}/>
              <span style={{fontFamily:"'Sora',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:c.accent}}>AI / PRODUCT / LEADERSHIP</span>
            </div>
            <h1 className="rv d1" style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:"clamp(36px,5.5vw,66px)",lineHeight:1.06,letterSpacing:"-0.035em",marginBottom:"24px"}}>
              I build<br/>intelligent<br/>products<span style={{color:c.accent}}>.</span><br/>
              <span style={{fontWeight:300,color:c.muted}}>I build</span><br/>
              communities<span style={{color:c.accent}}>.</span>
            </h1>
            <p className="rv d2" style={{fontSize:"clamp(14px,1.4vw,16px)",lineHeight:1.78,color:c.muted,maxWidth:"440px",marginBottom:"40px"}}>
              B.Tech CSE × IIT Madras BS — building at the intersection of AI/ML, full-stack engineering, and community leadership. From Kozhikode to national stages.
            </p>
            <div className="rv d3" style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
              <button className="mb" onClick={()=>scrollTo("work")} style={{background:c.accent,color:"#0A0A0A",border:"none",borderRadius:"7px",padding:"13px 26px",fontSize:"13px",fontWeight:700,letterSpacing:"0.03em",fontFamily:"'Sora',sans-serif"}}>
                Explore My Work ↓
              </button>
              <a href="mailto:spnashwa@gmail.com" className="mb" style={{background:"transparent",color:c.text,border:`1px solid ${c.border}`,borderRadius:"7px",padding:"13px 26px",fontSize:"13px",fontWeight:500,textDecoration:"none",display:"inline-block",fontFamily:"'Sora',sans-serif"}}>
                Let's Connect →
              </a>
            </div>
            <div className="rv d4" style={{marginTop:"40px",display:"flex",gap:"28px",flexWrap:"wrap"}}>
              {[["B.Tech CSE","Jyothi Engineering College"],["BS Data Science","IIT Madras"]].map(([d,i])=>(
                <div key={d}>
                  <div style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.05em",color:c.text}}>{d}</div>
                  <div style={{fontSize:"10px",color:c.muted,marginTop:"2px"}}>{i}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hc" style={{flex:1,minHeight:"450px",position:"relative",borderRadius:"14px",border:`1px solid ${c.border}`,overflow:"hidden",background:c.surface}}>
            <canvas ref={canvasRef} style={{width:"100%",height:"100%",display:"block"}}/>
            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center",pointerEvents:"none"}}>
              <div style={{fontFamily:"'Sora',sans-serif",fontSize:"9px",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:c.accent,marginBottom:"6px"}}>the ecosystem</div>
              <div style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:"17px",letterSpacing:"-0.02em",color:c.text}}>NASHWA S P</div>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:"10px",color:c.muted,marginTop:"4px",letterSpacing:"0.06em"}}>Kozhikode, Kerala</div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT STRIP */}
      <div style={{background:c.surface,borderTop:`1px solid ${c.border}`,borderBottom:`1px solid ${c.border}`,padding:"18px 32px"}}>
        <div className="ig" style={{maxWidth:"1200px",margin:"0 auto",display:"flex",flexWrap:"wrap"}}>
          {IMPACT_STATS.map((s,i)=>(
            <div key={i} className="rv" style={{flex:"1 1 120px",textAlign:"center",padding:"12px 14px",borderRight:i<IMPACT_STATS.length-1?`1px solid ${c.border}`:"none"}}>
              <div style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:"clamp(17px,2.2vw,24px)",color:c.accent,letterSpacing:"-0.02em",lineHeight:1.1}}>{s.value}</div>
              <div style={{fontSize:"9px",color:c.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginTop:"4px"}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{padding:"90px 32px",maxWidth:"1200px",margin:"0 auto"}}>
        <div className="rv" style={{marginBottom:"12px"}}>
          <span style={{fontFamily:"'Sora',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:c.accent}}>— about</span>
        </div>
        <h2 className="rv d1" style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:"clamp(28px,4vw,48px)",letterSpacing:"-0.03em",marginBottom:"22px",lineHeight:1.1}}>
          More than a developer<span style={{color:c.accent}}>.</span>
        </h2>
        <p className="rv d2" style={{fontSize:"clamp(14px,1.4vw,17px)",lineHeight:1.8,color:c.muted,maxWidth:"600px",marginBottom:"56px"}}>
          Curiosity drives most of what I do — whether I'm building with AI or bringing people together to learn. 
          As a dual-degree student, I work at the intersection of AI/ML, product thinking, and community leadership, 
          turning ideas into working prototypes and students into communities.
        </p>
        <div style={{display:"flex",gap:"14px",flexWrap:"wrap"}}>
          {[
            {icon:"⟡",title:"BUILD",sub:"I ship real things.",items:["AI/ML Systems","GenAI Applications","Computer Vision","Flutter Mobile","Full-Stack Products"],d:"d2"},
            {icon:"⬡",title:"LEAD",sub:"I build ecosystems.",items:["E-Cell JEC — Founder","IEDC JECC — Student Lead","PALS — Innovation Lead","Women in Tech","50+ Community"],d:"d3"},
            {icon:"◎",title:"EXPLORE",sub:"I keep asking why.",items:["Hackathons","Open Source","Research Problems","Emerging Tech","National Competitions"],d:"d4"},
          ].map(p=>(
            <div key={p.title} className={`rv ${p.d} pl`}
              style={{flex:"1 1 260px",background:c.surface,border:`1px solid ${c.border}`,borderRadius:"12px",padding:"28px 24px",cursor:"default"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=c.accent;e.currentTarget.style.background=dark?"#181818":"#E2DFD7";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=c.border;e.currentTarget.style.background=c.surface;}}>
              <div style={{fontSize:"20px",marginBottom:"12px",color:c.accent}}>{p.icon}</div>
              <div style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:"16px",letterSpacing:"0.04em",marginBottom:"4px"}}>{p.title}</div>
              <div style={{fontSize:"11px",color:c.muted,fontStyle:"italic",marginBottom:"18px"}}>{p.sub}</div>
              <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
                {p.items.map(item=>(
                  <div key={item} style={{display:"flex",alignItems:"center",gap:"8px",fontSize:"12px",color:c.muted}}>
                    <span style={{color:c.accent,fontSize:"7px"}}>●</span>{item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" style={{background:c.surface,borderTop:`1px solid ${c.border}`,borderBottom:`1px solid ${c.border}`,padding:"80px 0"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 32px",marginBottom:"48px"}}>
          <div className="rv" style={{marginBottom:"12px"}}>
            <span style={{fontFamily:"'Sora',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:c.accent}}>— selected work</span>
          </div>
          <h2 className="rv d1" style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:"clamp(28px,4vw,48px)",letterSpacing:"-0.03em",lineHeight:1.1}}>
            Things I've built<span style={{color:c.accent}}>.</span>
          </h2>
        </div>
        {PROJECTS.map((proj)=>(
          <div key={proj.id} className="prow" style={{borderTop:`1px solid ${c.border}`,padding:"0 32px"}}
            onMouseEnter={e=>e.currentTarget.style.background=dark?"rgba(233,168,58,0.025)":"rgba(233,168,58,0.035)"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <div className="rv pr" style={{maxWidth:"1200px",margin:"0 auto",padding:"34px 0",display:"flex",gap:"32px",alignItems:"flex-start"}}>
              <div style={{flex:"0 0 40px",paddingTop:"2px"}}>
                <span style={{fontFamily:"'Sora',sans-serif",fontSize:"10px",fontWeight:600,color:c.muted}}>{proj.index}</span>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap",marginBottom:"9px"}}>
                  <h3 style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:"clamp(18px,2.5vw,28px)",letterSpacing:"-0.025em"}}>{proj.title}</h3>
                  <span style={{background:`${proj.accentColor}18`,color:proj.accentColor,border:`1px solid ${proj.accentColor}40`,borderRadius:"4px",padding:"3px 9px",fontSize:"9px",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",whiteSpace:"nowrap"}}>{proj.status}</span>
                </div>
                <p style={{fontSize:"13px",color:c.muted,lineHeight:1.65,maxWidth:"500px",marginBottom:"16px"}}>{proj.tagline}</p>
                {activeProject===proj.id?(
                  <div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"18px 24px",marginBottom:"18px"}}>
                      {[["THE PROBLEM",proj.problem],["WHAT I BUILT",proj.built],["OUTCOME",proj.outcome]].map(([label,text])=>(
                        <div key={label}>
                          <div style={{fontSize:"9px",fontWeight:700,letterSpacing:"0.14em",color:c.accent,marginBottom:"6px",textTransform:"uppercase"}}>{label}</div>
                          <p style={{fontSize:"12px",color:c.muted,lineHeight:1.65}}>{text}</p>
                        </div>
                      ))}
                      <div>
                        <div style={{fontSize:"9px",fontWeight:700,letterSpacing:"0.14em",color:c.accent,marginBottom:"6px",textTransform:"uppercase"}}>STACK</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>
                          {proj.stack.map(s=><span key={s} style={{background:c.surfaceAlt,color:c.muted,borderRadius:"4px",padding:"3px 7px",fontSize:"10px"}}>{s}</span>)}
                        </div>
                      </div>
                    </div>
                    <div style={{display:"flex",gap:"14px",alignItems:"center"}}>
                      <a href={proj.github} target="_blank" rel="noreferrer" style={{color:c.accent,fontSize:"12px",fontWeight:600,textDecoration:"none"}}>GitHub →</a>
                      <button onClick={()=>setActiveProject(null)} style={{background:"none",border:"none",color:c.muted,fontSize:"11px",cursor:"pointer",textDecoration:"underline"}}>Collapse</button>
                    </div>
                  </div>
                ):(
                  <button onClick={()=>setActiveProject(proj.id)}
                    style={{background:"none",border:`1px solid ${c.border}`,borderRadius:"6px",padding:"7px 15px",fontSize:"11px",fontWeight:600,color:c.text,cursor:"pointer",transition:"border-color 0.2s"}}
                    onMouseEnter={e=>e.target.style.borderColor=c.accent}
                    onMouseLeave={e=>e.target.style.borderColor=c.border}>
                    View Case Study ↓
                  </button>
                )}
              </div>
              <div className="hm" style={{flex:"0 0 auto",display:"flex",flexDirection:"column",gap:"5px",paddingTop:"4px"}}>
                {proj.stack.slice(0,4).map(s=><span key={s} className="sk" style={{background:c.surfaceAlt,color:c.muted,borderRadius:"4px",padding:"4px 9px",fontSize:"10px",whiteSpace:"nowrap"}}>{s}</span>)}
                {proj.stack.length>4&&<span style={{fontSize:"10px",color:c.muted,padding:"4px 9px"}}>+{proj.stack.length-4}</span>}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* JOURNEY */}
      <section id="journey" style={{padding:"90px 32px",maxWidth:"1200px",margin:"0 auto"}}>
        <div className="rv" style={{marginBottom:"12px"}}>
          <span style={{fontFamily:"'Sora',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:c.accent}}>— from learning to leading</span>
        </div>
        <h2 className="rv d1" style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:"clamp(28px,4vw,48px)",letterSpacing:"-0.03em",marginBottom:"60px",lineHeight:1.1}}>
          The journey<span style={{color:c.accent}}>.</span>
        </h2>
        <div style={{position:"relative",paddingLeft:"26px"}}>
          <div style={{position:"absolute",left:"5px",top:0,bottom:0,width:"1px",background:`linear-gradient(to bottom,${c.accent},rgba(233,168,58,0.2),transparent)`}}/>
          {TIMELINE.map((item,i)=>(
            <div key={i} className={`rv ${["d1","d2","d3","d4"][i%4]}`} style={{position:"relative",marginBottom:"40px",paddingLeft:"26px"}}>
              <div style={{position:"absolute",left:"-22px",top:"4px",width:"11px",height:"11px",borderRadius:"50%",background:item.year==="NOW"?c.accent:c.surfaceAlt,border:`2px solid ${item.year==="NOW"?c.accent:c.border}`,boxShadow:item.year==="NOW"?`0 0 14px ${c.accent}`:"none"}}/>
              <div style={{display:"flex",gap:"12px",alignItems:"baseline",marginBottom:"4px",flexWrap:"wrap"}}>
                <span style={{fontFamily:"'Sora',sans-serif",fontWeight:700,fontSize:"11px",color:c.accent,letterSpacing:"0.08em"}}>{item.year}</span>
                <span style={{fontSize:"9px",color:c.muted,textTransform:"uppercase",letterSpacing:"0.12em",fontWeight:600}}>{item.phase}</span>
              </div>
              <h4 style={{fontFamily:"'Sora',sans-serif",fontWeight:700,fontSize:"14px",marginBottom:"3px",letterSpacing:"-0.01em"}}>{item.event}</h4>
              <div style={{fontSize:"10px",color:c.accent,fontWeight:600,marginBottom:"6px",letterSpacing:"0.04em"}}>{item.org}</div>
              <p style={{fontSize:"12px",color:c.muted,lineHeight:1.65,maxWidth:"440px"}}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="leadership" style={{background:c.surface,borderTop:`1px solid ${c.border}`,borderBottom:`1px solid ${c.border}`,padding:"90px 32px"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto"}}>
          <div className="rv" style={{marginBottom:"12px"}}>
            <span style={{fontFamily:"'Sora',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:c.accent}}>— leadership</span>
          </div>
          <h2 className="rv d1" style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:"clamp(26px,3.8vw,44px)",letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:"4px"}}>
            I don't just build products<span style={{color:c.accent}}>.</span>
          </h2>
          <h2 className="rv d2" style={{fontFamily:"'Sora',sans-serif",fontWeight:300,fontSize:"clamp(26px,3.8vw,44px)",letterSpacing:"-0.03em",lineHeight:1.1,color:c.muted,marginBottom:"52px"}}>
            I build ecosystems.
          </h2>
          <div className="rv d2" style={{background:c.bg,border:`1px solid ${c.border}`,borderRadius:"14px",padding:"32px",marginBottom:"18px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"14px",marginBottom:"18px"}}>
              <div>
                <div style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:"clamp(18px,2.3vw,26px)",marginBottom:"5px"}}>E-Cell JEC</div>
                <div style={{fontSize:"11px",color:c.accent,fontWeight:600}}>Founder & President · Jul 2024 – Present</div>
              </div>
              <span style={{background:c.accentBg,color:c.accent,border:`1px solid rgba(233,168,58,0.28)`,borderRadius:"4px",padding:"5px 11px",fontSize:"9px",fontWeight:700,letterSpacing:"0.12em"}}>50+ MEMBERS</span>
            </div>
            <div style={{display:"flex",gap:"4px",marginBottom:"20px",flexWrap:"wrap"}}>
              {["FOUNDED","BUILT","LED","COMPETED","RECOGNIZED"].map((s,i,arr)=>(
                <div key={s} style={{display:"flex",alignItems:"center"}}>
                  <span style={{background:i===arr.length-1?c.accent:c.surfaceAlt,color:i===arr.length-1?"#0A0A0A":c.muted,padding:"5px 12px",borderRadius:"4px",fontSize:"9px",fontWeight:700,letterSpacing:"0.10em"}}>{s}</span>
                  {i<arr.length-1&&<span style={{color:c.muted,margin:"0 3px",fontSize:"10px"}}>→</span>}
                </div>
              ))}
            </div>
            <p style={{fontSize:"13px",color:c.muted,lineHeight:1.7,maxWidth:"560px"}}>
              Built JEC's first entrepreneurship ecosystem from zero. 50+ member community. Led the team to <strong style={{color:c.text}}>AIR 9 at NEC'24</strong> and <strong style={{color:c.text}}>AIR 7 at EDD'25</strong> on national stages against thousands of participants.
            </p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"12px"}}>
            {[
              {org:"IEDC JECC",role:"Student Lead",period:"Feb 2025 – Present",desc:"Leading the student innovation wing under Kerala Startup Mission. Executing programs that connect students to the startup ecosystem."},
              {org:"PALS · IIT Alumni Initiative",role:"Innovation Tower Student Lead",period:"Sep 2025 – Present",desc:"Coordinating innovation programs and inter-institute collaborations across the IIT alumni network."},
              {org:"Women in Tech",role:"Sponsorship & Outreach Lead",period:"Jul 2025 – Present",desc:"Driving outreach and sponsorship for initiatives that empower women and allies in STEM."},
            ].map((item,i)=>(
              <div key={i} className={`rv d${i+2}`} style={{background:c.bg,border:`1px solid ${c.border}`,borderRadius:"12px",padding:"22px"}}>
                <div style={{fontFamily:"'Sora',sans-serif",fontWeight:700,fontSize:"14px",marginBottom:"4px"}}>{item.org}</div>
                <div style={{fontSize:"10px",color:c.accent,fontWeight:600,marginBottom:"10px"}}>{item.role} · {item.period}</div>
                <p style={{fontSize:"12px",color:c.muted,lineHeight:1.65}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" style={{padding:"90px 32px",maxWidth:"1200px",margin:"0 auto"}}>
        <div className="rv" style={{marginBottom:"12px"}}>
          <span style={{fontFamily:"'Sora',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:c.accent}}>— recognition</span>
        </div>
        <h2 className="rv d1" style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:"clamp(28px,4vw,48px)",letterSpacing:"-0.03em",marginBottom:"52px",lineHeight:1.1}}>
          Proof of work<span style={{color:c.accent}}>.</span>
        </h2>
        <div className="ag" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"12px"}}>
          {ACHIEVEMENTS.map((a,i)=>(
            <div key={i} className={`rv d${(i%4)+1} ac`}
              style={{background:hoveredAch===i?c.accentBg:c.surface,border:`1px solid ${hoveredAch===i?"rgba(233,168,58,0.4)":c.border}`,borderRadius:"12px",padding:"24px 20px",transition:"all 0.25s"}}
              onMouseEnter={()=>setHoveredAch(i)} onMouseLeave={()=>setHoveredAch(null)}>
              <div style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:"clamp(26px,3.2vw,38px)",letterSpacing:"-0.03em",color:c.accent,lineHeight:1,marginBottom:"6px"}}>{a.rank}</div>
              <div style={{fontFamily:"'Sora',sans-serif",fontWeight:700,fontSize:"12px",marginBottom:"3px"}}>{a.context}</div>
              <div style={{fontSize:"9px",color:c.muted,letterSpacing:"0.04em",marginBottom:"10px"}}>{a.org}</div>
              <div style={{fontSize:"11px",color:c.muted,lineHeight:1.5,borderTop:`1px solid ${c.border}`,paddingTop:"10px"}}>{a.full}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <div style={{background:c.surface,borderTop:`1px solid ${c.border}`,borderBottom:`1px solid ${c.border}`,padding:"56px 32px"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto"}}>
          <div className="rv" style={{marginBottom:"12px"}}>
            <span style={{fontFamily:"'Sora',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:c.accent}}>— capabilities</span>
          </div>
          <h2 className="rv d1" style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:"clamp(24px,3.2vw,36px)",letterSpacing:"-0.03em",marginBottom:"32px"}}>
            What I work with<span style={{color:c.accent}}>.</span>
          </h2>
          <div style={{display:"flex",gap:"7px",marginBottom:"22px",flexWrap:"wrap"}}>
            {Object.keys(SKILLS).map(cat=>(
              <button key={cat} onClick={()=>setActiveSkillCat(cat)}
                style={{background:activeSkillCat===cat?c.accent:c.surfaceAlt,color:activeSkillCat===cat?"#0A0A0A":c.muted,border:"none",borderRadius:"6px",padding:"7px 16px",fontSize:"11px",fontWeight:600,cursor:"pointer",letterSpacing:"0.04em",transition:"all 0.2s"}}>
                {cat}
              </button>
            ))}
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
            {SKILLS[activeSkillCat].map(skill=>(
              <span key={skill} className="sk" style={{background:c.bg,border:`1px solid ${c.border}`,color:c.text,borderRadius:"6px",padding:"7px 14px",fontSize:"12px",fontWeight:500}}>{skill}</span>
            ))}
          </div>
        </div>
      </div>

      {/* EXPERIENCE */}
      <section style={{padding:"76px 32px",maxWidth:"1200px",margin:"0 auto"}}>
        <div className="rv" style={{marginBottom:"12px"}}>
          <span style={{fontFamily:"'Sora',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:c.accent}}>— experience</span>
        </div>
        <h2 className="rv d1" style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:"clamp(24px,3.2vw,36px)",letterSpacing:"-0.03em",marginBottom:"40px"}}>
          Where I've worked<span style={{color:c.accent}}>.</span>
        </h2>
        {EXPERIENCE.map((exp,i)=>(
          <div key={i} className={`rv d${(i%3)+1} er`} style={{display:"flex",gap:"24px",padding:"20px 0",borderBottom:`1px solid ${c.border}`,flexWrap:"wrap"}}>
            <div style={{flex:"0 0 150px"}}>
              <div style={{fontFamily:"'Sora',sans-serif",fontWeight:700,fontSize:"13px",marginBottom:"4px"}}>{exp.org}</div>
              <div style={{fontSize:"10px",color:c.muted}}>{exp.period}</div>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:"9px",color:c.accent,fontWeight:700,letterSpacing:"0.11em",marginBottom:"6px",textTransform:"uppercase"}}>{exp.role}</div>
              <p style={{fontSize:"12px",color:c.muted,lineHeight:1.65}}>{exp.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* CONTACT */}
      <section id="contact" style={{background:c.surface,borderTop:`1px solid ${c.border}`,padding:"120px 32px",textAlign:"center"}}>
        <div className="rv" style={{marginBottom:"14px"}}>
          <span style={{fontFamily:"'Sora',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:c.accent}}>— let's talk</span>
        </div>
        <h2 className="rv d1" style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:"clamp(36px,6vw,78px)",letterSpacing:"-0.04em",lineHeight:1.04,marginBottom:"20px"}}>
          Have an idea<br/>worth building<span style={{color:c.accent}}>?</span>
        </h2>
        <p className="rv d2" style={{fontSize:"16px",color:c.muted,lineHeight:1.75,maxWidth:"380px",margin:"0 auto 44px"}}>
          Let's turn it into something real.
        </p>
        <div className="rv d3" style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"}}>
          <a href="mailto:spnashwa@gmail.com" className="mb" style={{background:c.accent,color:"#0A0A0A",borderRadius:"8px",padding:"14px 28px",fontSize:"13px",fontWeight:700,textDecoration:"none",display:"inline-block",fontFamily:"'Sora',sans-serif"}}>
            spnashwa@gmail.com →
          </a>
          <a href="https://linkedin.com/in/nashwa-sp" target="_blank" rel="noreferrer" className="mb" style={{background:"transparent",color:c.text,border:`1px solid ${c.border}`,borderRadius:"8px",padding:"14px 28px",fontSize:"13px",fontWeight:500,textDecoration:"none",display:"inline-block",fontFamily:"'Sora',sans-serif"}}>
            LinkedIn ↗
          </a>
          <a href="https://github.com/Nash-wa" target="_blank" rel="noreferrer" className="mb" style={{background:"transparent",color:c.text,border:`1px solid ${c.border}`,borderRadius:"8px",padding:"14px 28px",fontSize:"13px",fontWeight:500,textDecoration:"none",display:"inline-block",fontFamily:"'Sora',sans-serif"}}>
            GitHub ↗
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:"20px 32px",borderTop:`1px solid ${c.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"8px"}}>
        <span style={{fontFamily:"'Sora',sans-serif",fontWeight:800,fontSize:"13px"}}>Nashwa <span style={{color:c.accent}}>S P</span></span>
        <span style={{fontSize:"10px",color:c.muted}}>B.Tech CSE × IIT Madras BS · Kozhikode, Kerala</span>
        <span style={{fontSize:"10px",color:c.muted,fontStyle:"italic"}}>Built with intent.</span>
      </footer>
    </div>
  );
}
