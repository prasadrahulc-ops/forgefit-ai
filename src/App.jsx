import { useState, useEffect } from "react";

const accent = "#C6F135";

const store = {
  get: (key) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; } },
  set: (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },
  del: (key) => { try { localStorage.removeItem(key); } catch {} },
};

const S = {
  root:{fontFamily:"'Barlow','DM Sans',sans-serif",background:"#0d0d0d",minHeight:"100vh",color:"#f0f0f0"},
  inner:{maxWidth:560,margin:"0 auto",padding:"36px 24px 60px"},
  // Gate screen
  gateWrap:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px"},
  gateBox:{width:"100%",maxWidth:400,textAlign:"center"},
  gateLogo:{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:40},
  gateLogoIcon:{width:44,height:44,background:accent,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22},
  gateLogoText:{fontSize:18,fontWeight:800,letterSpacing:2,textTransform:"uppercase",color:"#fff"},
  gateHeading:{fontSize:26,fontWeight:800,color:"#fff",marginBottom:8,lineHeight:1.2},
  gateSub:{fontSize:14,color:"rgba(240,240,240,0.45)",marginBottom:36,lineHeight:1.6},
  gateInput:{width:"100%",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:12,padding:"16px 18px",fontSize:16,color:"#fff",outline:"none",boxSizing:"border-box",textAlign:"center",letterSpacing:3,fontFamily:"'Barlow',monospace",textTransform:"uppercase",marginBottom:12},
  gateInputFocus:{border:"1px solid rgba(198,241,53,0.6)"},
  gateBtn:(loading)=>({width:"100%",background:loading?"rgba(198,241,53,0.3)":accent,color:"#0d0d0d",border:"none",borderRadius:12,padding:"16px",fontSize:15,fontWeight:800,letterSpacing:1,textTransform:"uppercase",cursor:loading?"not-allowed":"pointer",marginBottom:16}),
  gateError:{fontSize:13,color:"#FF6B6B",marginBottom:16,lineHeight:1.5},
  gateBuyLink:{fontSize:13,color:"rgba(240,240,240,0.4)",lineHeight:1.6},
  gateBuyA:{color:accent,textDecoration:"none",fontWeight:600},
  gateDivider:{display:"flex",alignItems:"center",gap:12,margin:"24px 0"},
  gateDividerLine:{flex:1,height:"0.5px",background:"rgba(255,255,255,0.1)"},
  gateDividerText:{fontSize:11,color:"rgba(240,240,240,0.3)",letterSpacing:1,textTransform:"uppercase"},
  // App styles
  logoRow:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24},
  logo:{display:"flex",alignItems:"center",gap:10,cursor:"pointer"},
  logoIcon:{width:30,height:30,background:accent,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15},
  logoText:{fontSize:14,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"#fff"},
  homeBtn:{display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:600,color:"rgba(240,240,240,0.5)",cursor:"pointer"},
  tabs:{display:"flex",background:"rgba(255,255,255,0.04)",borderRadius:10,padding:4,marginBottom:32,gap:4},
  tab:(a)=>({flex:1,padding:"10px",fontSize:12,fontWeight:700,border:"none",cursor:"pointer",borderRadius:8,background:a?"rgba(198,241,53,0.12)":"transparent",color:a?accent:"rgba(240,240,240,0.4)",letterSpacing:1,textTransform:"uppercase"}),
  stepDot:(a,d)=>({height:3,flex:1,borderRadius:2,background:d?accent:a?"rgba(198,241,53,0.4)":"rgba(255,255,255,0.1)"}),
  eyebrow:{fontSize:11,letterSpacing:3,textTransform:"uppercase",color:accent,fontWeight:700,marginBottom:8},
  heading:{fontSize:28,fontWeight:800,lineHeight:1.15,marginBottom:6,color:"#fff"},
  sub:{fontSize:13,color:"rgba(240,240,240,0.4)",marginBottom:32},
  fg:{display:"flex",flexDirection:"column",gap:14,marginBottom:28},
  label:{fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:"rgba(240,240,240,0.45)",marginBottom:7,display:"block"},
  input:{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"13px 15px",fontSize:14,color:"#fff",outline:"none",boxSizing:"border-box"},
  unitToggle:{display:"flex",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,overflow:"hidden",marginBottom:10},
  unitBtn:(a)=>({flex:1,padding:"10px",fontSize:12,fontWeight:700,border:"none",cursor:"pointer",background:a?accent:"transparent",color:a?"#0d0d0d":"rgba(240,240,240,0.4)"}),
  opt:(s)=>({padding:"12px 16px",border:`1px solid ${s?accent:"rgba(255,255,255,0.08)"}`,borderRadius:10,background:s?"rgba(198,241,53,0.07)":"rgba(255,255,255,0.02)",cursor:"pointer",display:"flex",alignItems:"center",gap:10,userSelect:"none"}),
  optEmoji:{fontSize:16,width:22,textAlign:"center"},
  optLabel:(s)=>({fontSize:13,fontWeight:s?600:400,color:s?accent:"#ddd",flex:1}),
  optCheck:(s,m)=>({width:16,height:16,borderRadius:m?4:"50%",border:`2px solid ${s?accent:"rgba(255,255,255,0.2)"}`,background:s?accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#0d0d0d",fontWeight:800,flexShrink:0}),
  btn:(d)=>({width:"100%",background:d?"rgba(198,241,53,0.25)":accent,color:"#0d0d0d",border:"none",borderRadius:10,padding:"15px",fontSize:14,fontWeight:800,letterSpacing:1,textTransform:"uppercase",cursor:d?"not-allowed":"pointer"}),
  btnOut:{width:"100%",background:"transparent",color:"rgba(240,240,240,0.35)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"13px",fontSize:12,fontWeight:600,cursor:"pointer",marginBottom:10},
  loadWrap:{textAlign:"center",padding:"70px 0"},
  sCard:{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"20px",marginBottom:14},
  sHead:{display:"flex",alignItems:"center",gap:10,marginBottom:14},
  sIcon:{fontSize:17,width:34,height:34,background:"rgba(198,241,53,0.1)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  sTitle:{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:accent},
  sBody:{fontSize:13,lineHeight:1.75,color:"rgba(240,240,240,0.7)",whiteSpace:"pre-wrap"},
  hint:{fontSize:11,color:"rgba(198,241,53,0.5)",marginTop:6},
  tagRow:{display:"flex",flexWrap:"wrap",gap:6,marginTop:8},
  tag:{background:"rgba(198,241,53,0.12)",border:"1px solid rgba(198,241,53,0.3)",borderRadius:20,padding:"4px 10px",fontSize:11,color:accent,fontWeight:600},
  tagMuted:{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:"4px 10px",fontSize:11,color:"rgba(240,240,240,0.5)",fontWeight:600},
  saveBtn:{width:"100%",background:"rgba(198,241,53,0.1)",border:`1px solid ${accent}`,color:accent,borderRadius:10,padding:"14px",fontSize:13,fontWeight:700,letterSpacing:1,textTransform:"uppercase",cursor:"pointer",marginBottom:12},
  savedBtnStyle:{width:"100%",background:"rgba(198,241,53,0.05)",border:"1px solid rgba(198,241,53,0.3)",color:"rgba(198,241,53,0.5)",borderRadius:10,padding:"14px",fontSize:13,fontWeight:700,cursor:"default",marginBottom:12},
  disc:{fontSize:11,color:"rgba(240,240,240,0.22)",textAlign:"center",marginTop:18,lineHeight:1.6},
  planCard:{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,padding:"18px 20px",marginBottom:12,cursor:"pointer"},
  planCardTop:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10},
  planCardName:{fontSize:16,fontWeight:700,color:"#fff"},
  planCardDate:{fontSize:11,color:"rgba(240,240,240,0.35)"},
  delBtn:{background:"transparent",border:"none",color:"rgba(240,240,240,0.25)",cursor:"pointer",fontSize:16,padding:"0 0 0 8px"},
  emptyState:{textAlign:"center",padding:"60px 0",color:"rgba(240,240,240,0.3)"},
  exGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(160px, 1fr))",gap:12,marginTop:14},
  exCard:{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,overflow:"hidden"},
  exGif:{width:"100%",aspectRatio:"1",objectFit:"cover",display:"block",background:"#111"},
  exPlaceholder:{width:"100%",aspectRatio:"1",background:"rgba(255,255,255,0.04)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,textDecoration:"none"},
  exName:{fontSize:12,padding:"8px 10px",color:"rgba(240,240,240,0.7)",lineHeight:1.3,fontWeight:500},
};

// ── Option data ──────────────────────────────────────────────────────────────
const goalOpts=[{val:"lose fat",label:"Lose Fat",emoji:"🔥"},{val:"build muscle",label:"Build Muscle",emoji:"💪"},{val:"body recomposition",label:"Body Recomposition",emoji:"⚖️"},{val:"improve endurance",label:"Improve Endurance",emoji:"🏃"},{val:"increase strength",label:"Increase Strength",emoji:"🏋️"},{val:"improve flexibility",label:"Improve Flexibility",emoji:"🧘"},{val:"improve sports performance",label:"Sports Performance",emoji:"⚡"}];
const levelOpts=[{val:"beginner",label:"Beginner (0–6 months)",emoji:"🌱"},{val:"intermediate",label:"Intermediate (6mo–2yr)",emoji:"🔶"},{val:"advanced",label:"Advanced (2+ years)",emoji:"🎯"}];
const equipOpts=[{val:"full gym",label:"Full Gym Access",emoji:"🏟️"},{val:"home with dumbbells",label:"Home + Dumbbells",emoji:"🏠"},{val:"bodyweight only",label:"Bodyweight Only",emoji:"🤸"}];
const dietOpts=[{val:"no restrictions",label:"No Restrictions",emoji:"🍽️"},{val:"vegetarian",label:"Vegetarian",emoji:"🥦"},{val:"indian vegetarian",label:"Indian Vegetarian",emoji:"🫙"},{val:"jain diet",label:"Jain Diet (no root veg)",emoji:"🕉️"},{val:"vegan",label:"Vegan",emoji:"🌱"},{val:"keto / low carb",label:"Keto / Low Carb",emoji:"🥑"},{val:"intermittent fasting",label:"Intermittent Fasting",emoji:"⏱️"},{val:"gluten free",label:"Gluten Free",emoji:"🌾"},{val:"dairy free",label:"Dairy Free",emoji:"🥛"},{val:"halal",label:"Halal",emoji:"☪️"},{val:"kosher",label:"Kosher",emoji:"✡️"}];
const foodCultureOpts=[{val:"South Asian (Indian / Sri Lankan / Bangladeshi)",label:"South Asian",emoji:"🍛"},{val:"North Indian (Punjab, Delhi, UP cuisine)",label:"North Indian",emoji:"🫓"},{val:"South Indian (Tamil, Kerala, Karnataka)",label:"South Indian",emoji:"🥥"},{val:"East Asian (Chinese / Japanese / Korean)",label:"East Asian",emoji:"🍜"},{val:"Southeast Asian (Thai / Vietnamese / Filipino)",label:"Southeast Asian",emoji:"🍲"},{val:"Middle Eastern / Mediterranean",label:"Middle Eastern / Med",emoji:"🧆"},{val:"West African / East African",label:"African",emoji:"🫙"},{val:"Latin American",label:"Latin American",emoji:"🌮"},{val:"Western / European",label:"Western / European",emoji:"🥩"},{val:"no preference",label:"No Preference",emoji:"🌍"}];
const dayOpts=[{val:"3",label:"3 days/week",emoji:"📅"},{val:"4",label:"4 days/week",emoji:"📅"},{val:"5",label:"5 days/week",emoji:"📅"},{val:"6",label:"6 days/week",emoji:"📅"}];
const genderOpts=[{val:"male",label:"Male",emoji:"♂️"},{val:"female",label:"Female",emoji:"♀️"},{val:"other",label:"Other / Prefer not to say",emoji:"—"}];

// ── Sub-components ────────────────────────────────────────────────────────────
function SingleOpt({options,value,onChange,cols=1}){return(<div style={{display:"grid",gridTemplateColumns:cols===2?"1fr 1fr":"1fr",gap:8}}>{options.map(o=>{const s=value===o.val;return(<div key={o.val} style={S.opt(s)} onClick={()=>onChange(o.val)}><span style={S.optEmoji}>{o.emoji}</span><span style={S.optLabel(s)}>{o.label}</span><span style={S.optCheck(s,false)}>{s?"✓":""}</span></div>);})}</div>);}
function MultiOpt({options,value,onChange,cols=1}){const toggle=v=>value.includes(v)?onChange(value.filter(x=>x!==v)):onChange([...value,v]);return(<div style={{display:"grid",gridTemplateColumns:cols===2?"1fr 1fr":"1fr",gap:8}}>{options.map(o=>{const s=value.includes(o.val);return(<div key={o.val} style={S.opt(s)} onClick={()=>toggle(o.val)}><span style={S.optEmoji}>{o.emoji}</span><span style={S.optLabel(s)}>{o.label}</span><span style={S.optCheck(s,true)}>{s?"✓":""}</span></div>);})}</div>);}

function parseSection(text,marker){const re=new RegExp(`###\\s*${marker}[\\s\\S]*?(?=###|$)`,"i");const m=text.match(re);if(!m)return"";return m[0].replace(/###\s*[^\n]+\n?/,"").trim();}
function parseExerciseList(text){const section=parseSection(text,"EXERCISE LIST");if(!section)return[];return section.split("\n").map(l=>l.replace(/^[-*•\d.]+\s*/,"").trim()).filter(l=>l.length>2&&l.length<50).slice(0,9);}
const ftToCm=(ft,i)=>Math.round((parseFloat(ft)*30.48)+(parseFloat(i||0)*2.54));
const lbsToKg=lbs=>(parseFloat(lbs)*0.453592).toFixed(1);
const emptyForm={name:"",age:"",gender:"",heightUnit:"cm",heightCm:"",heightFt:"",heightIn:"",weightUnit:"kg",weightVal:"",goals:[],level:"",equipment:"",diets:[],foodCulture:"",days:""};

async function getExerciseGif(name){
  const variants=[name.toLowerCase(),name.toLowerCase().replace(/-/g," ")];
  for(const v of variants){try{const r=await fetch(`https://exercisedb-api.vercel.app/api/v1/exercises/name/${encodeURIComponent(v)}?limit=1`);if(!r.ok)continue;const d=await r.json();const gif=d?.data?.exercises?.[0]?.gifUrl??d?.data?.[0]?.gifUrl??d?.exercises?.[0]?.gifUrl??d?.[0]?.gifUrl;if(gif)return gif;}catch{}}
  return null;
}

// ── Gate Screen ───────────────────────────────────────────────────────────────
function GateScreen({ onUnlock }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  async function handleUnlock() {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) { setError("Please enter your access code."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmed }),
      });
      const data = await res.json();
      if (data.valid) {
        store.set("forgefit:access", trimmed);
        onUnlock();
      } else {
        setError("Invalid code. Please check your code or purchase access below.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ ...S.root, ...S.gateWrap }}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      <div style={S.gateBox}>
        <div style={S.gateLogo}>
          <div style={S.gateLogoIcon}>⚡</div>
          <span style={S.gateLogoText}>ForgeFit AI</span>
        </div>

        <h1 style={S.gateHeading}>Enter your<br/>access code</h1>
        <p style={S.gateSub}>
          ForgeFit AI is a premium tool.<br/>
          Enter the code you received after purchase.
        </p>

        <input
          style={{ ...S.gateInput, ...(inputFocused ? S.gateInputFocus : {}) }}
          placeholder="FORGE-XXXXXX"
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onKeyDown={e => e.key === "Enter" && handleUnlock()}
          maxLength={12}
          autoComplete="off"
          spellCheck={false}
        />

        {error && <p style={S.gateError}>{error}</p>}

        <button style={S.gateBtn(loading)} onClick={handleUnlock} disabled={loading}>
          {loading ? "Verifying…" : "⚡ Unlock ForgeFit"}
        </button>

        <div style={S.gateDivider}>
          <div style={S.gateDividerLine}/>
          <span style={S.gateDividerText}>don't have a code?</span>
          <div style={S.gateDividerLine}/>
        </div>

        <p style={S.gateBuyLink}>
          Get lifetime access for ₹799 →{" "}
          {/* Replace this href with your actual Ko-fi or Gumroad link */}
          <a href="https://ko-fi.com" target="_blank" rel="noreferrer" style={S.gateBuyA}>
            Buy on Ko-fi
          </a>
          {" "}or{" "}
          <a href="https://gumroad.com" target="_blank" rel="noreferrer" style={S.gateBuyA}>
            Gumroad
          </a>
        </p>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  // "checking" | "locked" | "unlocked"
  const [accessState, setAccessState] = useState("checking");
  const [activeTab, setActiveTab] = useState("new");
  const [savedPlans, setSavedPlans] = useState([]);
  const [viewingPlan, setViewingPlan] = useState(null);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [loadMsg, setLoadMsg] = useState(0);
  const [result, setResult] = useState(null);
  const [exerciseImages, setExerciseImages] = useState({});
  const [planSaved, setPlanSaved] = useState(false);

  // Check for existing valid access on mount
  useEffect(() => {
    const saved = store.get("forgefit:access");
    setAccessState(saved ? "unlocked" : "locked");
    const plans = store.get("forgefit:plans");
    if (plans) setSavedPlans(plans);
  }, []);

  // Show nothing while checking localStorage (avoids flash of gate screen)
  if (accessState === "checking") {
    return (
      <div style={{ ...S.root, display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh" }}>
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@700;800&display=swap" rel="stylesheet"/>
        <div style={{ fontSize:36 }}>⚡</div>
      </div>
    );
  }

  // Show gate if not unlocked
  if (accessState === "locked") {
    return <GateScreen onUnlock={() => setAccessState("unlocked")} />;
  }

  // ── Full app (unlocked) ───────────────────────────────────────────────────
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const msgs=["Analysing your profile…","Designing your workout split…","Calibrating nutrition targets…","Selecting supplements…","Finalising your plan…"];
  const heightCmVal=form.heightUnit==="cm"?parseFloat(form.heightCm):(form.heightFt?ftToCm(form.heightFt,form.heightIn):0);
  const weightKgVal=form.weightUnit==="kg"?parseFloat(form.weightVal):(form.weightVal?parseFloat(lbsToKg(form.weightVal)):0);
  const canNext=[form.name&&form.age&&form.gender,heightCmVal>50&&weightKgVal>20,form.goals.length>0&&form.level,form.equipment&&form.diets.length>0&&form.foodCulture&&form.days];

  function goHome(){setStep(0);setResult(null);setPlanSaved(false);setExerciseImages({});setViewingPlan(null);setActiveTab("new");}

  async function fetchExerciseImages(exercises){
    const imgs={};
    await Promise.all(exercises.map(async name=>{const gif=await getExerciseGif(name);if(gif)imgs[name]=gif;}));
    setExerciseImages(imgs);
  }

  async function generate(){
    setLoading(true);setResult(null);setPlanSaved(false);setExerciseImages({});
    const iv=setInterval(()=>setLoadMsg(m=>(m+1)%msgs.length),1400);
    const prompt=`You are an expert fitness coach and nutritionist. Create a comprehensive personalised fitness and wellness plan.

PROFILE: Name: ${form.name} | Age: ${form.age} | Gender: ${form.gender} | Height: ${heightCmVal}cm | Weight: ${weightKgVal}kg | Goals: ${form.goals.join(", ")} | Level: ${form.level} | Equipment: ${form.equipment} | Diet: ${form.diets.join(", ")} | Food Culture: ${form.foodCulture} | Training days: ${form.days}/week

IMPORTANT: Address ALL goals. Use ${form.foodCulture} cuisine for meals.

Use EXACT headers (### before each):

### WORKOUT PLAN
Full weekly split for ${form.days} days/week. Name each day. List exercises with sets/reps/rest.

### NUTRITION GUIDE
Daily calories and macros. 3 sample meals using ${form.foodCulture} cuisine and ${form.diets.join(", ")} preferences.

### SUPPLEMENT STACK
4–5 evidence-based supplements with dosage and timing.

### RECOVERY & LIFESTYLE
Sleep, stress management, active recovery, mobility.

### FIRST WEEK ACTION PLAN
5 numbered actions for ${form.name}.

### EXERCISE LIST
ONLY exercise names, one per line, no sets/reps. Max 9:
Barbell Squat
Push-up`;

    try{
      const res=await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:2200,messages:[{role:"user",content:prompt}]})});
      if(!res.ok){const e=await res.json().catch(()=>({}));throw new Error(e.error||`Error ${res.status}`);}
      const data=await res.json();
      const text=data.content?.map(c=>c.text||"").join("\n")||"";
      if(!text)throw new Error("Empty response");
      setResult(text);setStep(4);
      const exs=parseExerciseList(text);
      if(exs.length)fetchExerciseImages(exs);
    }catch(e){alert(`Something went wrong: ${e.message}`);}
    finally{clearInterval(iv);setLoading(false);}
  }

  function savePlan(){
    const plan={id:Date.now(),date:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}),name:form.name,goals:form.goals,foodCulture:form.foodCulture,form,result,exerciseImages};
    const updated=[plan,...savedPlans];setSavedPlans(updated);store.set("forgefit:plans",updated);setPlanSaved(true);
  }

  function deletePlan(id,e){
    e.stopPropagation();
    const updated=savedPlans.filter(p=>p.id!==id);setSavedPlans(updated);store.set("forgefit:plans",updated);
    if(viewingPlan?.id===id)setViewingPlan(null);
  }

  const displayResult=viewingPlan?viewingPlan.result:result;
  const displayForm=viewingPlan?viewingPlan.form:form;
  const displayImages=viewingPlan?(viewingPlan.exerciseImages||{}):exerciseImages;
  const showResults=(!loading&&step===4&&result)||viewingPlan;
  const isDeepInApp=loading||showResults||(activeTab==="saved"&&viewingPlan);

  const sections=[{key:"WORKOUT PLAN",icon:"🏋️",title:"Workout Plan"},{key:"NUTRITION GUIDE",icon:"🥗",title:"Nutrition Guide"},{key:"SUPPLEMENT STACK",icon:"💊",title:"Supplement Stack"},{key:"RECOVERY & LIFESTYLE",icon:"🌙",title:"Recovery & Lifestyle"},{key:"FIRST WEEK ACTION PLAN",icon:"✅",title:"First Week Action Plan"}];

  return(
    <div style={S.root}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      <div style={S.inner}>
        <div style={S.logoRow}>
          <div style={S.logo} onClick={goHome}>
            <div style={S.logoIcon}>⚡</div>
            <span style={S.logoText}>ForgeFit AI</span>
          </div>
          {isDeepInApp&&<button style={S.homeBtn} onClick={goHome}>⌂ Home</button>}
        </div>

        {!showResults&&!loading&&(
          <div style={S.tabs}>
            <button style={S.tab(activeTab==="new")} onClick={()=>{setActiveTab("new");setViewingPlan(null);}}>New Plan</button>
            <button style={S.tab(activeTab==="saved")} onClick={()=>{setActiveTab("saved");setViewingPlan(null);}}>Saved Plans {savedPlans.length>0&&`(${savedPlans.length})`}</button>
          </div>
        )}

        {loading&&(<div style={S.loadWrap}><div style={{fontSize:44,marginBottom:20}}>⚡</div><p style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:10}}>Building your plan, {form.name}…</p><p style={{fontSize:13,color:"rgba(240,240,240,0.4)",marginBottom:28}}>{msgs[loadMsg]}</p><div style={{display:"flex",justifyContent:"center",gap:6}}>{[0,1,2,3,4].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:i===loadMsg%5?accent:"rgba(255,255,255,0.12)",transition:"background 0.3s"}}/>)}</div></div>)}

        {!loading&&activeTab==="saved"&&!viewingPlan&&(<><p style={S.eyebrow}>Your Library</p><h1 style={S.heading}>Saved Plans</h1><p style={S.sub}>Tap a plan to view it in full</p>{savedPlans.length===0?(<div style={S.emptyState}><div style={{fontSize:40,marginBottom:12}}>📋</div><p style={{fontSize:14}}>No saved plans yet</p></div>):savedPlans.map(p=>(<div key={p.id} style={S.planCard} onClick={()=>setViewingPlan(p)}><div style={S.planCardTop}><div><div style={S.planCardName}>{p.name}'s Plan</div><div style={S.planCardDate}>{p.date}</div></div><button style={S.delBtn} onClick={e=>deletePlan(p.id,e)}>✕</button></div><div style={S.tagRow}>{p.goals.map(g=><span key={g} style={S.tag}>{g}</span>)}<span style={S.tagMuted}>{p.foodCulture?.split("(")[0].trim()}</span></div></div>))}</>)}

        {!loading&&activeTab==="new"&&step===0&&(<><p style={S.eyebrow}>Step 1 of 4</p><h1 style={S.heading}>Who are you?</h1><p style={S.sub}>Let's personalise everything for you</p><div style={S.fg}><div><label style={S.label}>First name</label><input style={S.input} placeholder="e.g. Arjun" value={form.name} onChange={e=>set("name",e.target.value)}/></div><div><label style={S.label}>Age</label><input style={S.input} type="number" placeholder="e.g. 27" value={form.age} onChange={e=>set("age",e.target.value)}/></div><div><label style={S.label}>Gender</label><SingleOpt options={genderOpts} value={form.gender} onChange={v=>set("gender",v)}/></div></div><button style={S.btn(!canNext[0])} disabled={!canNext[0]} onClick={()=>setStep(1)}>Continue →</button></>)}

        {!loading&&activeTab==="new"&&step===1&&(<><p style={S.eyebrow}>Step 2 of 4</p><h1 style={S.heading}>Your body today</h1><p style={S.sub}>Be honest — this helps calibrate accurately</p><div style={S.fg}><div><label style={S.label}>Height</label><div style={S.unitToggle}><button style={S.unitBtn(form.heightUnit==="cm")} onClick={()=>set("heightUnit","cm")}>CM</button><button style={S.unitBtn(form.heightUnit==="ft")} onClick={()=>set("heightUnit","ft")}>FT / IN</button></div>{form.heightUnit==="cm"?(<input style={S.input} type="number" placeholder="e.g. 175" value={form.heightCm} onChange={e=>set("heightCm",e.target.value)}/>):(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><input style={S.input} type="number" placeholder="Feet e.g. 5" value={form.heightFt} onChange={e=>set("heightFt",e.target.value)}/><input style={S.input} type="number" placeholder="Inches e.g. 9" value={form.heightIn} onChange={e=>set("heightIn",e.target.value)}/></div>)}{heightCmVal>50&&form.heightUnit==="ft"&&<p style={S.hint}>≈ {heightCmVal} cm</p>}</div><div><label style={S.label}>Weight</label><div style={S.unitToggle}><button style={S.unitBtn(form.weightUnit==="kg")} onClick={()=>set("weightUnit","kg")}>KG</button><button style={S.unitBtn(form.weightUnit==="lbs")} onClick={()=>set("weightUnit","lbs")}>LBS</button></div><input style={S.input} type="number" placeholder={form.weightUnit==="kg"?"e.g. 78":"e.g. 172"} value={form.weightVal} onChange={e=>set("weightVal",e.target.value)}/>{weightKgVal>20&&form.weightUnit==="lbs"&&<p style={S.hint}>≈ {weightKgVal} kg</p>}</div></div><button style={S.btnOut} onClick={()=>setStep(0)}>← Back</button><button style={S.btn(!canNext[1])} disabled={!canNext[1]} onClick={()=>setStep(2)}>Continue →</button></>)}

        {!loading&&activeTab==="new"&&step===2&&(<><p style={S.eyebrow}>Step 3 of 4</p><h1 style={S.heading}>Your targets</h1><p style={S.sub}>Choose all goals that matter to you</p><div style={S.fg}><div><label style={S.label}>Goals <span style={{color:"rgba(198,241,53,0.5)",fontWeight:400,letterSpacing:0,textTransform:"none"}}>— pick one or more</span></label><MultiOpt options={goalOpts} value={form.goals} onChange={v=>set("goals",v)}/>{form.goals.length>0&&<div style={S.tagRow}>{form.goals.map(g=><span key={g} style={S.tag}>{g}</span>)}</div>}</div><div><label style={S.label}>Experience level</label><SingleOpt options={levelOpts} value={form.level} onChange={v=>set("level",v)}/></div></div><button style={S.btnOut} onClick={()=>setStep(1)}>← Back</button><button style={S.btn(!canNext[2])} disabled={!canNext[2]} onClick={()=>setStep(3)}>Continue →</button></>)}

        {!loading&&activeTab==="new"&&step===3&&(<><p style={S.eyebrow}>Step 4 of 4</p><h1 style={S.heading}>Your lifestyle</h1><p style={S.sub}>Your schedule, diet, and food culture</p><div style={S.fg}><div><label style={S.label}>Equipment access</label><SingleOpt options={equipOpts} value={form.equipment} onChange={v=>set("equipment",v)}/></div><div><label style={S.label}>Dietary preferences <span style={{color:"rgba(198,241,53,0.5)",fontWeight:400,letterSpacing:0,textTransform:"none"}}>— pick all that apply</span></label><MultiOpt options={dietOpts} value={form.diets} onChange={v=>set("diets",v)} cols={2}/>{form.diets.length>0&&<div style={S.tagRow}>{form.diets.map(d=><span key={d} style={S.tag}>{d}</span>)}</div>}</div><div><label style={S.label}>Food culture / regional cuisine</label><SingleOpt options={foodCultureOpts} value={form.foodCulture} onChange={v=>set("foodCulture",v)} cols={2}/></div><div><label style={S.label}>Training days per week</label><SingleOpt options={dayOpts} value={form.days} onChange={v=>set("days",v)} cols={2}/></div></div><button style={S.btnOut} onClick={()=>setStep(2)}>← Back</button><button style={S.btn(!canNext[3])} disabled={!canNext[3]} onClick={generate}>⚡ Generate My Plan</button></>)}

        {showResults&&(<>
          {viewingPlan&&<button style={{...S.btnOut,marginBottom:24}} onClick={()=>setViewingPlan(null)}>← Back to saved plans</button>}
          <p style={S.eyebrow}>Personalised Plan</p>
          <h1 style={S.heading}>Your blueprint,<br/>{displayForm.name}.</h1>
          <div style={S.tagRow}>{displayForm.goals?.map(g=><span key={g} style={S.tag}>{g}</span>)}<span style={S.tagMuted}>{displayForm.days} days/week</span><span style={S.tagMuted}>{displayForm.foodCulture?.split("(")[0].trim()}</span></div>
          <div style={{marginBottom:28}}/>
          {sections.map(s=>{
            const content=parseSection(displayResult,s.key);
            if(!content)return null;
            return(<div key={s.key} style={S.sCard}><div style={S.sHead}><div style={S.sIcon}>{s.icon}</div><span style={S.sTitle}>{s.title}</span></div><div style={S.sBody}>{content}</div>
              {s.key==="WORKOUT PLAN"&&(()=>{const exercises=parseExerciseList(displayResult);if(!exercises.length)return null;return(<div style={{marginTop:16,paddingTop:16,borderTop:"1px solid rgba(255,255,255,0.06)"}}><div style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:"rgba(198,241,53,0.6)",fontWeight:700,marginBottom:12}}>Exercise Reference {Object.keys(displayImages).length===0&&<span style={{color:"rgba(255,255,255,0.2)",letterSpacing:0,textTransform:"none",fontSize:10}}>— loading demos…</span>}</div><div style={S.exGrid}>{exercises.map(name=>{const gif=displayImages[name];const ytUrl=`https://www.youtube.com/results?search_query=${encodeURIComponent(name+" exercise tutorial")}`;return(<div key={name} style={S.exCard}>{gif?(<img src={gif} alt={name} style={S.exGif} loading="lazy"/>):(<a href={ytUrl} target="_blank" rel="noreferrer" style={S.exPlaceholder}><span style={{fontSize:28}}>▶</span><span style={{fontSize:10,color:"rgba(240,240,240,0.35)"}}>Watch demo</span></a>)}<div style={S.exName}>{name}</div></div>);})}</div></div>);})()}
            </div>);
          })}
          {!viewingPlan&&(planSaved?<div style={S.savedBtnStyle}>✓ Plan saved to your library</div>:<button style={S.saveBtn} onClick={savePlan}>📋 Save this plan</button>)}
          <p style={S.disc}>AI-generated for educational purposes only. Consult a qualified fitness professional before starting any exercise or supplement programme.</p>
        </>)}
      </div>
    </div>
  );
}
