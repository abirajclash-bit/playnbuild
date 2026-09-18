const cfg=window.PLAYNBUILD_CONFIG||{};let sb=null;
function esc(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
async function init(){
 if(!cfg.SUPABASE_URL||cfg.SUPABASE_URL.includes("PASTE_")){loadDemo();return}
 const {createClient}=await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
 sb=createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY); await loadLive();
}
async function loadLive(){
 const tables=["challenges","articles","facts","concepts","videos"];
 for(const t of tables){
  const {data,error}=await sb.from(t).select("*").eq("published",true).order("created_at",{ascending:false});
  if(error){console.warn(t,error);continue}
  render(t,data||[]);
 }
}
function render(t,rows){
 const el=document.getElementById(t==="articles"?"scienceList":t+"List"); if(!el)return;
 if(!rows.length){el.innerHTML='<div class="loading">Nothing published here yet — check back soon.</div>';return}
 if(t==="challenges"){document.getElementById("challengeCount").textContent=rows.length+" challenges";el.innerHTML=rows.map(r=>`<article class="challenge"><span class="tag">${esc(r.difficulty||"CHALLENGE")} · ${esc(r.category||"LOGIC")}</span><h3>${esc(r.title)}</h3><p>${esc(r.question)}</p><div class="answers">${[r.option_a,r.option_b,r.option_c,r.option_d].filter(Boolean).map((x,i)=>`<button data-right="${i===r.correct_index}">${String.fromCharCode(65+i)}. ${esc(x)}</button>`).join("")}</div><p class="feedback"></p></article>`).join("");el.querySelectorAll("button").forEach(b=>b.onclick=()=>{const card=b.closest(".challenge");card.querySelectorAll("button").forEach(x=>x.disabled=true);const f=card.querySelector(".feedback");if(b.dataset.right==="true"){b.classList.add("correct");f.textContent="✓ Correct!";}else{b.classList.add("wrong");f.textContent="Not quite — try the next challenge!";const right=card.querySelector('[data-right="true"]');if(right)right.classList.add("correct")}})}
 if(t==="articles"){el.innerHTML=rows.map(r=>`<article class="article"><h3>${esc(r.title)}</h3><p>${esc(r.body)}</p></article>`).join("")}
 if(t==="facts"){el.innerHTML=rows.map((r,i)=>`<article class="fact"><span>${String(i+1).padStart(2,"0")}</span><h3>${esc(r.title)}</h3><p>${esc(r.body)}</p></article>`).join("")}
 if(t==="concepts"){el.innerHTML=rows.map(r=>`<article class="concept"><div class="icon">${esc(r.icon||"💡")}</div><div><h3>${esc(r.title)}</h3><p>${esc(r.body)}</p></div></article>`).join("")}
 if(t==="videos"){el.innerHTML=rows.map(r=>`<article class="video"><a href="${esc(r.youtube_url)}" target="_blank" rel="noopener"><div class="thumb">${esc(r.emoji||"▶️")}</div><h3>${esc(r.title)}</h3><p>${esc(r.description||"Watch on YouTube →")}</p></a></article>`).join("")}
}
function loadDemo(){render("challenges",[{title:"The 8-Ball Challenge",question:"You have 8 identical-looking balls. One is slightly heavier. Can you identify it using a balance scale only twice?",option_a:"Weigh 4 vs 4, then 2 vs 2",option_b:"Weigh 3 vs 3, then narrow it down",option_c:"Weigh 2 vs 2, then 2 vs 2",correct_index:1,difficulty:"EASY",category:"LOGIC"}]);render("articles",[{title:"Why does ice float?",body:"Water expands as it freezes because hydrogen bonding forms an open crystal structure. The resulting ice is less dense than liquid water, so it floats."}]);render("facts",[{title:"Hot water can sometimes freeze faster",body:"Under particular conditions, warmer water can freeze before cooler water — a phenomenon associated with the Mpemba effect."},{title:"Honey is difficult for many microbes",body:"Its low water activity and acidic environment make it difficult for many microorganisms to grow."},{title:"The brain has a substantial energy demand",body:"The brain is a small fraction of body mass but consumes a substantial share of resting energy."}]);render("concepts",[{title:"Entropy",body:"A measure related to the number of possible microscopic arrangements of a system.",icon:"⚙️"},{title:"Pressure & Flow",body:"Pressure differences can drive fluids through pipes and channels.",icon:"🌊"},{title:"Exponential Growth",body:"Growth proportional to the current amount can become surprisingly rapid.",icon:"📈"}]);render("videos",[{title:"Your PlayNBuild videos",description:"Connect your YouTube videos from the admin panel.",youtube_url:"https://www.youtube.com/@R.Abiraj",emoji:"▶️"}])}
init();