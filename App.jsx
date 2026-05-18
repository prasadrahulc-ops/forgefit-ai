import { useState } from "react";

const accent = "#C6F135";

const S = {
  root: { fontFamily: "'Barlow', 'DM Sans', sans-serif", background: "#0d0d0d", minHeight: "100vh", color: "#f0f0f0" },
  inner: { maxWidth: 560, margin: "0 auto", padding: "36px 24px 60px" },
  logo: { display: "flex", alignItems: "center", gap: 10, marginBottom: 36 },
  logoIcon: { width: 30, height: 30, background: accent, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 },
  logoText: { fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#fff" },
  stepBar: { display: "flex", gap: 6, marginBottom: 36 },
  stepDot: (a, d) => ({ height: 3, flex: 1, borderRadius: 2, background: d ? accent : a ? "rgba(198,241,53,0.4)" : "rgba(255,255,255,0.1)" }),
  eyebrow: { fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: accent, fontWeight: 700, marginBottom: 8 },
  heading: { fontSize: 28, fontWeight: 800, lineHeight: 1.15, marginBottom: 6, color: "#fff" },
  sub: { fontSize: 13, color: "rgba(240,240,240,0.4)", marginBottom: 32 },
  fg: { display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 },
  label: { fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(240,240,240,0.45)", marginBottom: 7, display: "block" },
  input: { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "13px 15px", fontSize: 14, color: "#fff", outline: "none", boxSizing: "border-box" },
  unitToggle: { display: "flex", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, overflow: "hidden", marginBottom: 10 },
  unitBtn: (a) => ({ flex: 1, padding: "10px", fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer", background: a ? accent : "transparent", color: a ? "#0d0d0d" : "rgba(240,240,240,0.4)", letterSpacing: 1, transition: "all 0.15s" }),
  opt: (s) => ({ padding: "12px 16px", border: `1px solid ${s ? accent : "rgba(255,255,255,0.08)"}`, borderRadius: 10, background: s ? "rgba(198,241,53,0.07)" : "rgba(255,255,255,0.02)", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, userSelect: "none" }),
  optEmoji: { fontSize: 16, width: 22, textAlign: "center" },
  optLabel: (s) => ({ fontSize: 13, fontWeight: s ? 600 : 400, color: s ? accent : "#ddd", flex: 1 }),
  optCheck: (s, multi) => ({ width: 16, height: 16, borderRadius: multi ? 4 : "50%", border: `2px solid ${s ? accent : "rgba(255,255,255,0.2)"}`, background: s ? accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#0d0d0d", fontWeight: 800, flexShrink: 0 }),
  btn: (dis) => ({ width: "100%", background: dis ? "rgba(198,241,53,0.25)" : accent, color: "#0d0d0d", border: "none", borderRadius: 10, padding: "15px", fontSize: 14, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", cursor: dis ? "not-allowed" : "pointer" }),
  btnOut: { width: "100%", background: "transparent", color: "rgba(240,240,240,0.35)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "13px", fontSize: 12, fontWeight: 600, cursor: "pointer", marginBottom: 10 },
  loadWrap: { textAlign: "center", padding: "70px 0" },
  sCard: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px", marginBottom: 14 },
  sHead: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 },
  sIcon: { fontSize: 17, width: 34, height: 34, background: "rgba(198,241,53,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  sTitle: { fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: accent },
  sBody: { fontSize: 13, lineHeight: 1.75, color: "rgba(240,240,240,0.7)", whiteSpace: "pre-wrap" },
  restartBtn: { marginTop: 28, background: "transparent", border: `1px solid ${accent}`, color: accent, borderRadius: 10, padding: "13px", width: "100%", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer" },
  disc: { fontSize: 11, color: "rgba(240,240,240,0.22)", textAlign: "center", marginTop: 18, lineHeight: 1.6 },
  hint: { fontSize: 11, color: "rgba(198,241,53,0.5)", marginTop: 6, letterSpacing: 0.5 },
  tagRow: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 },
  tag: { background: "rgba(198,241,53,0.12)", border: "1px solid rgba(198,241,53,0.3)", borderRadius: 20, padding: "4px 10px", fontSize: 11, color: accent, fontWeight: 600 },
  tagMuted: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "4px 10px", fontSize: 11, color: "rgba(240,240,240,0.5)", fontWeight: 600 },
};

const goalOpts = [
  { val: "lose fat", label: "Lose Fat", emoji: "🔥" },
  { val: "build muscle", label: "Build Muscle", emoji: "💪" },
  { val: "body recomposition", label: "Body Recomposition", emoji: "⚖️" },
  { val: "improve endurance", label: "Improve Endurance", emoji: "🏃" },
  { val: "increase strength", label: "Increase Strength", emoji: "🏋️" },
  { val: "improve flexibility", label: "Improve Flexibility", emoji: "🧘" },
  { val: "improve sports performance", label: "Sports Performance", emoji: "⚡" },
];

const levelOpts = [
  { val: "beginner", label: "Beginner (0–6 months)", emoji: "🌱" },
  { val: "intermediate", label: "Intermediate (6mo–2yr)", emoji: "🔶" },
  { val: "advanced", label: "Advanced (2+ years)", emoji: "🎯" },
];

const equipOpts = [
  { val: "full gym", label: "Full Gym Access", emoji: "🏟️" },
  { val: "home with dumbbells", label: "Home + Dumbbells", emoji: "🏠" },
  { val: "bodyweight only", label: "Bodyweight Only", emoji: "🤸" },
];

const dietOpts = [
  { val: "no restrictions", label: "No Restrictions", emoji: "🍽️" },
  { val: "vegetarian", label: "Vegetarian", emoji: "🥦" },
  { val: "vegan", label: "Vegan", emoji: "🌱" },
  { val: "keto / low carb", label: "Keto / Low Carb", emoji: "🥑" },
  { val: "intermittent fasting", label: "Intermittent Fasting", emoji: "⏱️" },
  { val: "gluten free", label: "Gluten Free", emoji: "🌾" },
  { val: "dairy free", label: "Dairy Free", emoji: "🥛" },
  { val: "halal", label: "Halal", emoji: "☪️" },
  { val: "kosher", label: "Kosher", emoji: "✡️" },
];

const foodCultureOpts = [
  { val: "South Asian (Indian / Sri Lankan / Bangladeshi)", label: "South Asian", emoji: "🍛" },
  { val: "East Asian (Chinese / Japanese / Korean)", label: "East Asian", emoji: "🍜" },
  { val: "Southeast Asian (Thai / Vietnamese / Filipino)", label: "Southeast Asian", emoji: "🍲" },
  { val: "Middle Eastern / Mediterranean", label: "Middle Eastern / Mediterranean", emoji: "🧆" },
  { val: "West African / East African", label: "African", emoji: "🫙" },
  { val: "Latin American", label: "Latin American", emoji: "🌮" },
  { val: "Western / European", label: "Western / European", emoji: "🥩" },
  { val: "no preference", label: "No Preference", emoji: "🌍" },
];

const dayOpts = [
  { val: "3", label: "3 days/week", emoji: "📅" },
  { val: "4", label: "4 days/week", emoji: "📅" },
  { val: "5", label: "5 days/week", emoji: "📅" },
  { val: "6", label: "6 days/week", emoji: "📅" },
];

const genderOpts = [
  { val: "male", label: "Male", emoji: "♂️" },
  { val: "female", label: "Female", emoji: "♀️" },
  { val: "other", label: "Other / Prefer not to say", emoji: "—" },
];

function SingleOpt({ options, value, onChange, cols = 1 }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols === 2 ? "1fr 1fr" : "1fr", gap: 8 }}>
      {options.map(o => {
        const sel = value === o.val;
        return (
          <div key={o.val} style={S.opt(sel)} onClick={() => onChange(o.val)}>
            <span style={S.optEmoji}>{o.emoji}</span>
            <span style={S.optLabel(sel)}>{o.label}</span>
            <span style={S.optCheck(sel, false)}>{sel ? "✓" : ""}</span>
          </div>
        );
      })}
    </div>
  );
}

function MultiOpt({ options, value, onChange, cols = 1 }) {
  const toggle = (v) => {
    if (value.includes(v)) onChange(value.filter(x => x !== v));
    else onChange([...value, v]);
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols === 2 ? "1fr 1fr" : "1fr", gap: 8 }}>
      {options.map(o => {
        const sel = value.includes(o.val);
        return (
          <div key={o.val} style={S.opt(sel)} onClick={() => toggle(o.val)}>
            <span style={S.optEmoji}>{o.emoji}</span>
            <span style={S.optLabel(sel)}>{o.label}</span>
            <span style={S.optCheck(sel, true)}>{sel ? "✓" : ""}</span>
          </div>
        );
      })}
    </div>
  );
}

function parseSection(text, marker) {
  const re = new RegExp(`###\\s*${marker}[\\s\\S]*?(?=###|$)`, "i");
  const m = text.match(re);
  if (!m) return "";
  return m[0].replace(/###\s*[^\n]+\n?/, "").trim();
}

const ftToCm = (ft, inches) => Math.round((parseFloat(ft) * 30.48) + (parseFloat(inches || 0) * 2.54));
const lbsToKg = (lbs) => (parseFloat(lbs) * 0.453592).toFixed(1);

export default function App() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", age: "", gender: "",
    heightUnit: "cm", heightCm: "", heightFt: "", heightIn: "",
    weightUnit: "kg", weightVal: "",
    goals: [], level: "",
    equipment: "", diets: [], foodCulture: "", days: ""
  });
  const [loading, setLoading] = useState(false);
  const [loadMsg, setLoadMsg] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const msgs = [
    "Analysing your profile…",
    "Designing your workout split…",
    "Calibrating your nutrition targets…",
    "Selecting your supplement stack…",
    "Finalising your personalised plan…"
  ];

  const heightCmVal = form.heightUnit === "cm"
    ? parseFloat(form.heightCm)
    : (form.heightFt ? ftToCm(form.heightFt, form.heightIn) : 0);

  const weightKgVal = form.weightUnit === "kg"
    ? parseFloat(form.weightVal)
    : (form.weightVal ? parseFloat(lbsToKg(form.weightVal)) : 0);

  const canNext = [
    form.name && form.age && form.gender,
    heightCmVal > 50 && weightKgVal > 20,
    form.goals.length > 0 && form.level,
    form.equipment && form.diets.length > 0 && form.foodCulture && form.days,
  ];

  async function generate() {
    setLoading(true);
    setError("");
    const iv = setInterval(() => setLoadMsg(m => (m + 1) % msgs.length), 1400);

    const goalsStr = form.goals.join(", ");
    const dietsStr = form.diets.join(", ");

    const prompt = `You are an expert fitness coach and nutritionist. Create a comprehensive, personalised fitness and wellness plan for this individual.

PROFILE:
- Name: ${form.name}
- Age: ${form.age} years old
- Gender: ${form.gender}
- Height: ${heightCmVal} cm
- Weight: ${weightKgVal} kg
- Combined Goals: ${goalsStr}
- Fitness Level: ${form.level}
- Equipment: ${form.equipment}
- Dietary Restrictions/Preferences: ${dietsStr}
- Food Culture / Regional Cuisine: ${form.foodCulture}
- Training Days Available: ${form.days} per week

IMPORTANT: The user has MULTIPLE goals (${goalsStr}). Design the workout plan and everything to simultaneously address all these goals in a balanced, intelligent way. Explain how the plan serves each goal.

For nutrition: use ${form.foodCulture} food culture as the basis for all meal suggestions. Use ingredients, dishes, and eating patterns typical to this cuisine. Do NOT suggest generic Western meals unless the food culture is Western/European.

Use these EXACT section headers (### before each):

### WORKOUT PLAN
Full weekly split for ${form.days} days/week that addresses ALL goals (${goalsStr}). Name each day, list exercises with sets/reps/rest. Explain how the structure serves each goal.

### NUTRITION GUIDE
Daily calorie target and macros (protein/carbs/fat in grams). Meal timing. 3 full sample meals using ${form.foodCulture} cuisine respecting ${dietsStr} preferences. Include local ingredient examples.

### SUPPLEMENT STACK
4–5 evidence-based supplements with dosage, timing, and how each one supports the combined goals.

### RECOVERY & LIFESTYLE
Sleep targets, stress management, active recovery, mobility work. Tailor to the combined training demands.

### FIRST WEEK ACTION PLAN
5 specific, numbered actions for ${form.name} to take this week. Use their name. Be motivating and direct.

Be specific, use ${form.name}'s name throughout, and make every recommendation feel personal.`;

    try {
      // Calls our secure serverless function — API key never exposed to browser
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Server error ${res.status}`);
      }

      const data = await res.json();
      const text = data.content?.map(c => c.text || "").join("\n") || "";
      if (!text) throw new Error("Empty response");
      setResult(text);
      setStep(4);
    } catch (e) {
      setError(`Something went wrong: ${e.message}. Please try again.`);
    } finally {
      clearInterval(iv);
      setLoading(false);
    }
  }

  function restart() {
    setForm({ name:"",age:"",gender:"",heightUnit:"cm",heightCm:"",heightFt:"",heightIn:"",weightUnit:"kg",weightVal:"",goals:[],level:"",equipment:"",diets:[],foodCulture:"",days:"" });
    setResult(null);
    setStep(0);
  }

  const sections = [
    { key: "WORKOUT PLAN", icon: "🏋️", title: "Workout Plan" },
    { key: "NUTRITION GUIDE", icon: "🥗", title: "Nutrition Guide" },
    { key: "SUPPLEMENT STACK", icon: "💊", title: "Supplement Stack" },
    { key: "RECOVERY & LIFESTYLE", icon: "🌙", title: "Recovery & Lifestyle" },
    { key: "FIRST WEEK ACTION PLAN", icon: "✅", title: "First Week Action Plan" },
  ];

  return (
    <div style={S.root}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <div style={S.inner}>

        <div style={S.logo}>
          <div style={S.logoIcon}>⚡</div>
          <span style={S.logoText}>ForgeFit AI</span>
        </div>

        {step < 4 && !loading && (
          <div style={S.stepBar}>
            {[0,1,2,3].map(i => <div key={i} style={S.stepDot(i === step, i < step)} />)}
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div style={S.loadWrap}>
            <div style={{ fontSize: 44, marginBottom: 20 }}>⚡</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 10 }}>
              Building your plan, {form.name}…
            </p>
            <p style={{ fontSize: 13, color: "rgba(240,240,240,0.4)", marginBottom: 28 }}>
              {msgs[loadMsg]}
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
              {[0,1,2,3,4].map(i => (
                <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i === loadMsg % 5 ? accent : "rgba(255,255,255,0.12)", transition: "background 0.3s" }} />
              ))}
            </div>
          </div>
        )}

        {/* STEP 0 */}
        {!loading && step === 0 && (
          <>
            <p style={S.eyebrow}>Step 1 of 4</p>
            <h1 style={S.heading}>Who are you?</h1>
            <p style={S.sub}>Let's personalise everything for you</p>
            <div style={S.fg}>
              <div>
                <label style={S.label}>First name</label>
                <input style={S.input} placeholder="e.g. Arjun" value={form.name}
                  onChange={e => set("name", e.target.value)} />
              </div>
              <div>
                <label style={S.label}>Age</label>
                <input style={S.input} type="number" placeholder="e.g. 27" value={form.age}
                  onChange={e => set("age", e.target.value)} />
              </div>
              <div>
                <label style={S.label}>Gender</label>
                <SingleOpt options={genderOpts} value={form.gender} onChange={v => set("gender", v)} />
              </div>
            </div>
            <button style={S.btn(!canNext[0])} disabled={!canNext[0]} onClick={() => setStep(1)}>
              Continue →
            </button>
          </>
        )}

        {/* STEP 1 */}
        {!loading && step === 1 && (
          <>
            <p style={S.eyebrow}>Step 2 of 4</p>
            <h1 style={S.heading}>Your body today</h1>
            <p style={S.sub}>Be honest — this helps us calibrate accurately</p>
            <div style={S.fg}>
              <div>
                <label style={S.label}>Height</label>
                <div style={S.unitToggle}>
                  <button style={S.unitBtn(form.heightUnit === "cm")} onClick={() => set("heightUnit", "cm")}>CM</button>
                  <button style={S.unitBtn(form.heightUnit === "ft")} onClick={() => set("heightUnit", "ft")}>FT / IN</button>
                </div>
                {form.heightUnit === "cm" ? (
                  <input style={S.input} type="number" placeholder="e.g. 175" value={form.heightCm}
                    onChange={e => set("heightCm", e.target.value)} />
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <input style={S.input} type="number" placeholder="Feet e.g. 5" value={form.heightFt}
                      onChange={e => set("heightFt", e.target.value)} />
                    <input style={S.input} type="number" placeholder="Inches e.g. 9" value={form.heightIn}
                      onChange={e => set("heightIn", e.target.value)} />
                  </div>
                )}
                {heightCmVal > 50 && form.heightUnit === "ft" && (
                  <p style={S.hint}>≈ {heightCmVal} cm</p>
                )}
              </div>
              <div>
                <label style={S.label}>Weight</label>
                <div style={S.unitToggle}>
                  <button style={S.unitBtn(form.weightUnit === "kg")} onClick={() => set("weightUnit", "kg")}>KG</button>
                  <button style={S.unitBtn(form.weightUnit === "lbs")} onClick={() => set("weightUnit", "lbs")}>LBS</button>
                </div>
                <input style={S.input} type="number"
                  placeholder={form.weightUnit === "kg" ? "e.g. 78" : "e.g. 172"}
                  value={form.weightVal} onChange={e => set("weightVal", e.target.value)} />
                {weightKgVal > 20 && form.weightUnit === "lbs" && (
                  <p style={S.hint}>≈ {weightKgVal} kg</p>
                )}
              </div>
            </div>
            <button style={S.btnOut} onClick={() => setStep(0)}>← Back</button>
            <button style={S.btn(!canNext[1])} disabled={!canNext[1]} onClick={() => setStep(2)}>
              Continue →
            </button>
          </>
        )}

        {/* STEP 2 */}
        {!loading && step === 2 && (
          <>
            <p style={S.eyebrow}>Step 3 of 4</p>
            <h1 style={S.heading}>Your targets</h1>
            <p style={S.sub}>Choose all goals that matter to you</p>
            <div style={S.fg}>
              <div>
                <label style={S.label}>
                  Goals{" "}
                  <span style={{ color: "rgba(198,241,53,0.5)", fontWeight: 400, letterSpacing: 0, textTransform: "none" }}>
                    — pick one or more
                  </span>
                </label>
                <MultiOpt options={goalOpts} value={form.goals} onChange={v => set("goals", v)} />
                {form.goals.length > 0 && (
                  <div style={S.tagRow}>
                    {form.goals.map(g => <span key={g} style={S.tag}>{g}</span>)}
                  </div>
                )}
              </div>
              <div>
                <label style={S.label}>Experience level</label>
                <SingleOpt options={levelOpts} value={form.level} onChange={v => set("level", v)} />
              </div>
            </div>
            <button style={S.btnOut} onClick={() => setStep(1)}>← Back</button>
            <button style={S.btn(!canNext[2])} disabled={!canNext[2]} onClick={() => setStep(3)}>
              Continue →
            </button>
          </>
        )}

        {/* STEP 3 */}
        {!loading && step === 3 && (
          <>
            <p style={S.eyebrow}>Step 4 of 4</p>
            <h1 style={S.heading}>Your lifestyle</h1>
            <p style={S.sub}>Your schedule, diet, and food culture</p>
            <div style={S.fg}>
              <div>
                <label style={S.label}>Equipment access</label>
                <SingleOpt options={equipOpts} value={form.equipment} onChange={v => set("equipment", v)} />
              </div>
              <div>
                <label style={S.label}>
                  Dietary preferences{" "}
                  <span style={{ color: "rgba(198,241,53,0.5)", fontWeight: 400, letterSpacing: 0, textTransform: "none" }}>
                    — pick all that apply
                  </span>
                </label>
                <MultiOpt options={dietOpts} value={form.diets} onChange={v => set("diets", v)} cols={2} />
                {form.diets.length > 0 && (
                  <div style={S.tagRow}>
                    {form.diets.map(d => <span key={d} style={S.tag}>{d}</span>)}
                  </div>
                )}
              </div>
              <div>
                <label style={S.label}>Food culture / regional cuisine</label>
                <p style={{ fontSize: 12, color: "rgba(240,240,240,0.35)", marginBottom: 10 }}>
                  All meal suggestions will use ingredients and dishes from your cuisine
                </p>
                <SingleOpt options={foodCultureOpts} value={form.foodCulture}
                  onChange={v => set("foodCulture", v)} cols={2} />
              </div>
              <div>
                <label style={S.label}>Training days per week</label>
                <SingleOpt options={dayOpts} value={form.days} onChange={v => set("days", v)} cols={2} />
              </div>
            </div>
            {error && <p style={{ color: "#ff6b6b", fontSize: 12, marginBottom: 10 }}>{error}</p>}
            <button style={S.btnOut} onClick={() => setStep(2)}>← Back</button>
            <button style={S.btn(!canNext[3])} disabled={!canNext[3]} onClick={generate}>
              ⚡ Generate My Plan
            </button>
          </>
        )}

        {/* STEP 4: RESULTS */}
        {!loading && step === 4 && result && (
          <>
            <p style={S.eyebrow}>Your personalised plan</p>
            <h1 style={S.heading}>Your blueprint,<br />{form.name}.</h1>
            <div style={S.tagRow}>
              {form.goals.map(g => <span key={g} style={S.tag}>{g}</span>)}
              <span style={S.tagMuted}>{form.days} days/week</span>
              <span style={S.tagMuted}>{form.foodCulture.split("(")[0].trim()}</span>
            </div>
            <div style={{ marginBottom: 28 }} />
            {sections.map(s => {
              const content = parseSection(result, s.key);
              if (!content) return null;
              return (
                <div key={s.key} style={S.sCard}>
                  <div style={S.sHead}>
                    <div style={S.sIcon}>{s.icon}</div>
                    <span style={S.sTitle}>{s.title}</span>
                  </div>
                  <div style={S.sBody}>{content}</div>
                </div>
              );
            })}
            <p style={S.disc}>
              AI-generated for educational purposes only. Consult a qualified fitness
              professional before starting any new exercise or supplement programme.
            </p>
            <button style={S.restartBtn} onClick={restart}>↺ Start a new plan</button>
          </>
        )}

      </div>
    </div>
  );
}
