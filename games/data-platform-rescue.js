
const scenarios = [
  {round:1,kicker:"01 / Stabilize",title:"Monday, 7:12 AM. The executive dashboard missed its refresh again.",text:"The CEO presents quarterly results at 9:00 AM. The team can patch the dashboard manually, but the failures are becoming routine.",choices:[
    {label:"Fund observability, automated tests, and failure alerting",cost:90,r:18,g:4,v:6,a:10,c:8,tag:"observability"},
    {label:"Create a rotating manual recovery team",cost:45,r:4,g:0,v:8,a:-4,c:2,debt:"manualOps"},
    {label:"Replace the BI tool immediately",cost:150,r:1,g:0,v:5,a:-3,c:-2,debt:"toolFirst"}]},
  {round:1,kicker:"02 / Trust",title:"Finance and Operations publish different revenue numbers.",text:"Both teams can defend their calculations. Leadership wants a single number before the next board meeting.",choices:[
    {label:"Create a governed revenue definition with accountable ownership",cost:85,r:4,g:20,v:14,a:5,c:16,tag:"semanticGovernance"},
    {label:"Select Finance as the official source and move on",cost:15,r:0,g:2,v:5,a:0,c:2,debt:"metricConflict"},
    {label:"Build a reconciliation dashboard showing both versions",cost:55,r:2,g:5,v:7,a:2,c:4,debt:"metricConflict"}]},
  {round:1,kicker:"03 / Protect",title:"A routine review finds sensitive customer data accessible to 63 users.",text:"No incident has been reported. Several teams say broad access makes analysis faster.",choices:[
    {label:"Introduce least privilege, masking, and recurring access reviews",cost:105,r:3,g:24,v:5,a:6,c:12,tag:"security"},
    {label:"Document the risk and schedule remediation next quarter",cost:10,r:0,g:-10,v:2,a:0,c:-4,debt:"accessRisk"},
    {label:"Remove warehouse access from everyone except administrators",cost:25,r:-5,g:12,v:-15,a:-2,c:-8}]},
  {round:1,kicker:"04 / Pressure",title:"Sales wants 3 new dashboards before quarter end.",text:"The platform team is already carrying reliability work. Refusing the request may damage stakeholder confidence.",choices:[
    {label:"Negotiate 1 high value dashboard and protect stabilization capacity",cost:45,r:8,g:3,v:12,a:5,c:7,tag:"sequencing"},
    {label:"Commit to all 3 and postpone platform work",cost:80,r:-8,g:-2,v:16,a:-8,c:6,debt:"deliveryDebt"},
    {label:"Refuse all new work until the platform is stable",cost:20,r:10,g:2,v:-12,a:4,c:-10}]},

  {round:2,kicker:"05 / Modernize",title:"The legacy ETL layer now delays almost every change.",text:"A complete rewrite is attractive, but it would consume a large share of the remaining budget.",choices:[
    {label:"Modernize incrementally around high value domains",cost:145,r:14,g:6,v:16,a:20,c:10,tag:"incremental"},
    {label:"Approve a complete platform rewrite",cost:290,r:8,g:4,v:10,a:18,c:3,debt:"bigBang"},
    {label:"Extend the legacy platform for another year",cost:30,r:-7,g:0,v:1,a:-14,c:-5,debt:"legacy"}]},
  {round:2,kicker:"06 / Model",title:"Teams are rebuilding the same customer entities differently.",text:"The duplicated logic is creating inconsistent joins, definitions, and downstream behaviour.",choices:[
    {label:"Establish reusable domain models and shared data contracts",cost:110,r:9,g:13,v:13,a:18,c:9,tag:"contracts"},
    {label:"Let each product team optimize independently",cost:25,r:-3,g:-8,v:8,a:-10,c:-2,debt:"duplication"},
    {label:"Centralize every transformation in 1 enterprise model",cost:120,r:4,g:10,v:-4,a:4,c:-3}]},
  {round:2,kicker:"07 / Cost",title:"Cloud spend rises 38% in 2 months.",text:"Executives are questioning whether modernization is simply replacing technical debt with a larger invoice.",choices:[
    {label:"Add workload attribution, cost observability, and optimization targets",cost:70,r:5,g:5,v:14,a:10,c:12,tag:"finops"},
    {label:"Freeze all new cloud workloads",cost:10,r:1,g:2,v:-14,a:-5,c:-7},
    {label:"Accept the increase as the cost of modernization",cost:0,r:0,g:-2,v:-7,a:-3,c:-8,debt:"costBlind"}]},
  {round:2,kicker:"08 / Incident",title:"A critical dataset changes upstream without notice.",text:"A field used by 11 downstream products changes meaning but not type. Nothing technically breaks at ingestion.",choices:[
    {label:"Pause affected outputs, validate impact, and formalize producer contracts",cost:75,r:15,g:13,v:3,a:14,c:12,tag:"contracts"},
    {label:"Patch downstream logic and keep delivery moving",cost:35,r:3,g:0,v:8,a:-5,c:1,debt:"silentSemantics"},
    {label:"Ask consumers to interpret the new field themselves",cost:0,r:-8,g:-10,v:-7,a:-8,c:-12,debt:"silentSemantics"}]},

  {round:3,kicker:"09 / AI Ready",title:"Leadership wants an AI pilot in 6 months.",text:"The use case is promising, but lineage, quality ownership, and model input controls remain uneven.",choices:[
    {label:"Run a focused readiness assessment and controlled pilot",cost:105,r:6,g:16,v:18,a:10,c:14,tag:"responsibleAI"},
    {label:"Launch quickly with the data already available",cost:70,r:-7,g:-16,v:12,a:-4,c:3,debt:"aiRush"},
    {label:"Ban AI until the entire data estate is perfect",cost:10,r:2,g:7,v:-18,a:0,c:-12}]},
  {round:3,kicker:"10 / Consequence",title:"A model performs well overall but poorly for a smaller customer segment.",text:"The aggregate accuracy target is met. The product team argues that delaying launch would sacrifice value for an edge case.",choices:[
    {label:"Investigate segment performance, data representation, and decision impact",cost:90,r:3,g:20,v:7,a:5,c:14,tag:"responsibleAI"},
    {label:"Launch because the aggregate target is met",cost:20,r:0,g:-18,v:12,a:0,c:-10,debt:"fairnessRisk"},
    {label:"Cancel the initiative entirely",cost:15,r:0,g:5,v:-16,a:0,c:-8}]},
  {round:3,kicker:"11 / Executive Tradeoff",title:"The board asks for a 25% faster delivery cadence next year.",text:"The platform is healthier, but teams warn that accelerating without changing operating practices will recreate old problems.",choices:[
    {label:"Tie faster delivery to platform standards, automation, and product ownership",cost:120,r:10,g:9,v:20,a:15,c:15,tag:"operatingModel"},
    {label:"Set the target and let teams determine how to meet it",cost:20,r:-6,g:-5,v:8,a:-6,c:2,debt:"deliveryDebt"},
    {label:"Reject the target as unrealistic",cost:0,r:4,g:1,v:-10,a:2,c:-9}]},
  {round:3,kicker:"12 / Final Decision",title:"You have 1 final investment window before the strategy review.",text:"Where do you place the remaining attention to make the platform durable after you leave?",choices:[
    {label:"Institutionalize ownership, controls, observability, and architecture decision records",cost:Math.min(100,9999),r:10,g:14,v:8,a:14,c:12,tag:"durability"},
    {label:"Use the remaining capacity to deliver visible executive features",cost:80,r:-2,g:-3,v:16,a:-4,c:7},
    {label:"Preserve the remaining budget and make no further change",cost:0,r:0,g:0,v:0,a:0,c:0}]}
];

let state;
const q=id=>document.getElementById(id);
const clamp=n=>Math.max(0,Math.min(100,n));

function init(){
  state={i:0,r:42,g:35,v:48,a:38,c:44,b:900,history:[],tags:new Set(),debts:new Set(),events:[]};
  q("scenarioCard").hidden=false;q("resultCard").hidden=true;q("eventCard").hidden=true;
  render();
}

function applyDelayedConsequences(){
  const i=state.i;
  let messages=[];
  if(i===4){
    if(state.debts.has("manualOps")){state.r=clamp(state.r-8);state.c=clamp(state.c-5);messages.push("The manual recovery process becomes a dependency. A missed handoff causes another executive reporting failure.");}
    if(state.debts.has("metricConflict")){state.g=clamp(state.g-7);state.c=clamp(state.c-8);messages.push("The unresolved revenue definition resurfaces during planning. Teams are still arguing from different versions of the truth.");}
    if(state.debts.has("accessRisk")){state.g=clamp(state.g-10);state.c=clamp(state.c-6);messages.push("An internal audit escalates the unresolved access issue. Remediation is now urgent rather than planned.");}
    if(state.debts.has("deliveryDebt")){state.r=clamp(state.r-7);state.a=clamp(state.a-6);messages.push("Deferred platform work catches up with the team. Delivery slows as fragile components require repeated intervention.");}
  }
  if(i===8){
    if(state.debts.has("bigBang")){state.b=Math.max(0,state.b-70);state.c=clamp(state.c-6);messages.push("The big bang rewrite overruns its migration estimate. $70K of contingency is consumed.");}
    if(state.debts.has("legacy")){state.r=clamp(state.r-8);state.a=clamp(state.a-10);messages.push("A legacy dependency fails during a release and exposes how much modernization was deferred.");}
    if(state.debts.has("duplication")){state.g=clamp(state.g-8);state.a=clamp(state.a-7);messages.push("Independent domain logic creates another metric conflict. The organization now has multiple versions of the same customer concept.");}
    if(state.debts.has("costBlind")){state.b=Math.max(0,state.b-60);messages.push("Unattributed cloud growth consumes another $60K before the source of the spend is isolated.");}
    if(state.debts.has("silentSemantics")){state.r=clamp(state.r-8);state.c=clamp(state.c-8);messages.push("A silent semantic change reaches an executive report. The pipeline was green, but the meaning was wrong.");}
  }
  if(i===11){
    if(state.debts.has("aiRush")){state.g=clamp(state.g-12);state.c=clamp(state.c-10);messages.push("The rushed AI pilot reaches governance review with incomplete evidence about inputs and controls.");}
    if(state.debts.has("fairnessRisk")){state.g=clamp(state.g-14);state.c=clamp(state.c-12);messages.push("The segment performance issue becomes visible to senior leadership after launch. Aggregate accuracy no longer looks sufficient.");}
  }
  if(messages.length){
    state.events.push(...messages);
    q("eventCard").innerHTML=`<strong>Consequence</strong><p>${messages.join(" ")}</p>`;
    q("eventCard").hidden=false;
  }else{
    q("eventCard").hidden=true;
  }
}

function render(){
  applyDelayedConsequences();
  q("reliabilityScore").textContent=state.r;
  q("governanceScore").textContent=state.g;
  q("valueScore").textContent=state.v;
  q("architectureScore").textContent=state.a;
  q("confidenceScore").textContent=state.c;
  q("budgetScore").textContent=`$${state.b}K`;

  const s=scenarios[state.i];
  q("progressText").textContent=`Round ${s.round} · Decision ${state.i+1} of ${scenarios.length}`;
  q("progressBar").style.width=`${((state.i+1)/scenarios.length)*100}%`;
  q("scenarioKicker").textContent=s.kicker;
  q("scenarioTitle").textContent=s.title;
  q("scenarioText").textContent=s.text;
  q("choices").innerHTML="";

  s.choices.forEach(c=>{
    const btn=document.createElement("button");
    btn.className="sil-choice-card";btn.type="button";
    btn.disabled=c.cost>state.b;
    btn.innerHTML=`<span>${c.label}</span><strong>$${c.cost}K</strong><small>${c.cost>state.b?"Over budget":"Choose"}</small>`;
    btn.onclick=()=>choose(c);
    q("choices").appendChild(btn);
  });
}

function choose(c){
  state.history.push({decision:state.i+1,title:scenarios[state.i].title,choice:c.label});
  state.b-=c.cost;
  state.r=clamp(state.r+c.r);state.g=clamp(state.g+c.g);state.v=clamp(state.v+c.v);
  state.a=clamp(state.a+c.a);state.c=clamp(state.c+c.c);
  if(c.tag)state.tags.add(c.tag);if(c.debt)state.debts.add(c.debt);
  state.i++;
  state.i>=scenarios.length?finish():render();
}

function finish(){
  q("scenarioCard").hidden=true;q("eventCard").hidden=true;q("resultCard").hidden=false;
  const score=Math.round((state.r+state.g+state.v+state.a+state.c)/5);
  q("finalScore").textContent=`${score}/100`;
  let title,text;
  if(score>=85){title="Enterprise Modernization Strategist";text="You treated the platform as an operating system for the organization, not a collection of tools. Reliability, governance, architecture, and stakeholder confidence reinforced one another.";}
  else if(score>=72){title="Resilient Platform Leader";text="You materially strengthened the environment and made disciplined tradeoffs. A few weaknesses remain, but the platform can now absorb change without depending on constant intervention.";}
  else if(score>=58){title="Pragmatic Modernizer";text="You created meaningful improvements, but several short term compromises remain embedded in the environment. The next phase needs stronger sequencing and ownership.";}
  else if(score>=44){title="Delivery First Operator";text="You protected visible delivery in several moments, but accumulated platform risk reduced the durability of those gains.";}
  else{title="Technical Debt Collector";text="Short term decisions repeatedly displaced structural fixes. The platform now needs a deliberate stabilization and governance program before additional complexity is added.";}

  q("resultTitle").textContent=title;q("resultText").textContent=text;
  q("finalReliability").textContent=state.r;q("finalGovernance").textContent=state.g;q("finalValue").textContent=state.v;
  q("finalArchitecture").textContent=state.a;q("finalConfidence").textContent=state.c;q("finalBudget").textContent=`$${state.b}K`;

  const achievements=[];
  if(state.r>=80)achievements.push("Reliability Architect");
  if(state.g>=80)achievements.push("Governance by Design");
  if(state.a>=80)achievements.push("Architecture Steward");
  if(state.c>=80)achievements.push("Trusted Advisor");
  if(state.v>=85)achievements.push("Value Translator");
  if(state.b>=200)achievements.push("Capital Disciplined");
  if(state.tags.has("responsibleAI")&&state.g>=70)achievements.push("Responsible AI Builder");
  q("achievementArea").innerHTML=achievements.length?`<h3>Achievements</h3><div>${achievements.map(a=>`<span>${a}</span>`).join("")}</div>`:"";

  q("decisionHistory").innerHTML=state.history.map(h=>`<li><strong>${h.decision}. ${h.choice}</strong><span>${h.title}</span></li>`).join("");
}

q("restartGame").addEventListener("click",init);
init();
