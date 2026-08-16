
const scenarios = [
  {
    kicker: "01 / Stabilize",
    title: "Your executive dashboard misses its morning refresh twice a week.",
    text: "The team says the pipelines are fragile, but leadership is pushing for new features. What do you fund first?",
    choices: [
      {label:"Add observability, testing, and failure alerting", cost:80, r:18, g:5, v:8, note:"You improve reliability and make failures visible before executives find them."},
      {label:"Hire analysts to manually patch the dashboards", cost:60, r:2, g:0, v:10, note:"Reporting improves temporarily, but the underlying platform remains fragile."},
      {label:"Buy a new BI platform", cost:140, r:2, g:1, v:7, note:"The presentation layer changes, but unstable upstream delivery remains."}
    ]
  },
  {
    kicker: "02 / Trust",
    title: "Finance and Operations report different revenue numbers.",
    text: "Both dashboards are technically correct according to their teams. The disagreement is damaging executive confidence.",
    choices: [
      {label:"Define governed metrics, ownership, and validation", cost:90, r:6, g:20, v:16, note:"A shared definition and accountable ownership improve trust across teams."},
      {label:"Let each department keep its own definition", cost:0, r:0, g:-8, v:-10, note:"You save money now, but conflicting metrics remain institutionalized."},
      {label:"Ask executives which number they prefer", cost:10, r:0, g:-4, v:-5, note:"A decision is made without fixing the data problem."}
    ]
  },
  {
    kicker: "03 / Protect",
    title: "Sensitive customer data is broadly accessible in the warehouse.",
    text: "There has been no incident, but access was granted over time and nobody has reviewed it recently.",
    choices: [
      {label:"Implement least privilege, masking, and access review", cost:100, r:4, g:24, v:8, note:"You reduce exposure while preserving controlled access for legitimate use."},
      {label:"Document the risk and defer remediation", cost:5, r:0, g:-12, v:0, note:"The risk is known but remains active."},
      {label:"Lock down the entire warehouse", cost:30, r:-6, g:12, v:-14, note:"Exposure drops, but legitimate teams lose access and business delivery slows."}
    ]
  },
  {
    kicker: "04 / Modernize",
    title: "A legacy ETL layer is expensive to maintain and slows every change.",
    text: "The team wants a modernization program, but a complete rewrite would consume most of the remaining budget.",
    choices: [
      {label:"Modernize incrementally around high value pipelines", cost:120, r:14, g:7, v:18, note:"You reduce risk while improving the parts of the platform that matter most."},
      {label:"Approve a complete rewrite immediately", cost:230, r:8, g:5, v:12, note:"You gain a clean target architecture but consume substantial budget and introduce migration risk."},
      {label:"Leave the platform unchanged for another year", cost:0, r:-8, g:0, v:-8, note:"You preserve budget but technical debt continues to compound."}
    ]
  },
  {
    kicker: "05 / AI Ready",
    title: "Leadership wants an AI pilot in 6 months.",
    text: "The use case is promising, but data lineage, quality ownership, and model input controls are incomplete.",
    choices: [
      {label:"Run a focused AI readiness assessment and controlled pilot", cost:80, r:6, g:15, v:20, note:"You move forward while making risks explicit and limiting exposure."},
      {label:"Launch quickly with whatever data is available", cost:50, r:-8, g:-18, v:8, note:"You demonstrate speed, but weak controls create avoidable operational and governance risk."},
      {label:"Ban AI until the entire data estate is perfect", cost:0, r:2, g:8, v:-18, note:"Risk is minimized, but the organization loses learning and business momentum."}
    ]
  }
];

let state;
const els = {
  r:document.getElementById("reliabilityScore"),
  g:document.getElementById("governanceScore"),
  v:document.getElementById("valueScore"),
  b:document.getElementById("budgetScore"),
  progressText:document.getElementById("progressText"),
  progressBar:document.getElementById("progressBar"),
  kicker:document.getElementById("scenarioKicker"),
  title:document.getElementById("scenarioTitle"),
  text:document.getElementById("scenarioText"),
  choices:document.getElementById("choices"),
  scenario:document.getElementById("scenarioCard"),
  result:document.getElementById("resultCard")
};

function clamp(n){ return Math.max(0, Math.min(100, n)); }

function init(){
  state={i:0,r:42,g:35,v:48,b:500};
  els.scenario.hidden=false;
  els.result.hidden=true;
  render();
}

function render(){
  els.r.textContent=clamp(state.r);
  els.g.textContent=clamp(state.g);
  els.v.textContent=clamp(state.v);
  els.b.textContent=`$${state.b}K`;
  const s=scenarios[state.i];
  els.progressText.textContent=`Decision ${state.i+1} of ${scenarios.length}`;
  els.progressBar.style.width=`${((state.i+1)/scenarios.length)*100}%`;
  els.kicker.textContent=s.kicker;
  els.title.textContent=s.title;
  els.text.textContent=s.text;
  els.choices.innerHTML="";
  s.choices.forEach((c)=>{
    const btn=document.createElement("button");
    btn.className="choice-card";
    btn.type="button";
    btn.disabled=c.cost>state.b;
    btn.innerHTML=`<span>${c.label}</span><strong>$${c.cost}K</strong><small>${c.cost>state.b?"Over budget":"Choose"}</small>`;
    btn.addEventListener("click",()=>choose(c));
    els.choices.appendChild(btn);
  });
}

function choose(c){
  state.b-=c.cost;
  state.r=clamp(state.r+c.r);
  state.g=clamp(state.g+c.g);
  state.v=clamp(state.v+c.v);
  state.i++;
  if(state.i>=scenarios.length){ finish(); } else { render(); }
}

function finish(){
  els.scenario.hidden=true;
  els.result.hidden=false;
  const score=Math.round((state.r+state.g+state.v)/3);
  document.getElementById("finalScore").textContent=`${score}/100`;
  let title, text;
  if(score>=82){
    title="Modernization Strategist";
    text="You balanced reliability, governance, and business value while using the budget deliberately. The platform is in a much stronger position for analytics and responsible AI.";
  }else if(score>=68){
    title="Platform Stabilizer";
    text="You made several strong decisions and improved the environment materially. Some tradeoffs remain, but the organization now has a clearer path forward.";
  }else if(score>=52){
    title="Technical Debt Negotiator";
    text="You created pockets of improvement, but the platform still carries meaningful reliability or governance risk. A more sequenced modernization roadmap would help.";
  }else{
    title="Technical Debt Collector";
    text="Short term decisions consumed attention without resolving enough of the underlying platform risk. The environment needs a structured assessment before adding more complexity.";
  }
  document.getElementById("resultTitle").textContent=title;
  document.getElementById("resultText").textContent=text;
  document.getElementById("finalReliability").textContent=state.r;
  document.getElementById("finalGovernance").textContent=state.g;
  document.getElementById("finalValue").textContent=state.v;
  document.getElementById("finalBudget").textContent=`$${state.b}K`;
}

document.getElementById("restartGame").addEventListener("click",init);
init();
