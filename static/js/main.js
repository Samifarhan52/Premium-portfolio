const loader=document.getElementById("loader");window.addEventListener("load",()=>{setTimeout(()=>loader.classList.add("hidden"),2200)});const dot=document.querySelector(".cursor-dot"),ring=document.querySelector(".cursor-ring");let mouseX=window.innerWidth/2,mouseY=window.innerHeight/2,ringX=mouseX,ringY=mouseY;document.addEventListener("mousemove",e=>{mouseX=e.clientX;mouseY=e.clientY;if(dot){dot.style.left=mouseX+"px";dot.style.top=mouseY+"px"}});function animateCursor(){ringX+=(mouseX-ringX)*0.15;ringY+=(mouseY-ringY)*0.15;if(ring){ring.style.left=ringX+"px";ring.style.top=ringY+"px"}requestAnimationFrame(animateCursor)}animateCursor();document.querySelectorAll("a,button,.magnetic,.project-card-wrap").forEach(el=>{el.addEventListener("mouseenter",()=>{if(ring){ring.style.width="56px";ring.style.height="56px";ring.style.borderColor="rgba(157,127,255,.55)"}});el.addEventListener("mouseleave",()=>{if(ring){ring.style.width="38px";ring.style.height="38px";ring.style.borderColor="rgba(93,140,255,.45)"}el.style.transform=""});el.addEventListener("mousemove",e=>{if(!el.classList.contains("magnetic"))return;const rect=el.getBoundingClientRect();const x=e.clientX-rect.left-rect.width/2;const y=e.clientY-rect.top-rect.height/2;el.style.transform=`translate(${x*.06}px, ${y*.06}px)`})});const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("show")})},{threshold:.12});document.querySelectorAll(".reveal").forEach(el=>io.observe(el));const parallaxItems=document.querySelectorAll("[data-parallax]");window.addEventListener("mousemove",e=>{const x=(e.clientX/window.innerWidth-.5)*2;const y=(e.clientY/window.innerHeight-.5)*2;parallaxItems.forEach(item=>{const factor=parseFloat(item.dataset.parallax||"0.05");item.style.transform=`translate3d(${x*24*factor}px, ${y*18*factor}px, 0)`})});const bg=document.getElementById("bg3d");if(bg&&window.THREE){const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,.1,1000);camera.position.z=18;const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));renderer.setSize(window.innerWidth,window.innerHeight);bg.appendChild(renderer.domElement);const group=new THREE.Group();scene.add(group);const geos=[new THREE.IcosahedronGeometry(1,0),new THREE.TorusKnotGeometry(.7,.18,90,16),new THREE.BoxGeometry(1.1,1.1,1.1)];for(let i=0;i<18;i++){const m=new THREE.MeshBasicMaterial({color:i%2===0?0x8ab4ff:0xb39dff,wireframe:true,transparent:true,opacity:.18});const mesh=new THREE.Mesh(geos[i%geos.length],m);mesh.position.set((Math.random()-.5)*28,(Math.random()-.5)*20,(Math.random()-.5)*24);const s=Math.random()*1.4+.5;mesh.scale.setScalar(s);group.add(mesh)}const starsGeo=new THREE.BufferGeometry();const count=520;const positions=new Float32Array(count*3);for(let i=0;i<count*3;i++)positions[i]=(Math.random()-.5)*90;starsGeo.setAttribute("position",new THREE.BufferAttribute(positions,3));const stars=new THREE.Points(starsGeo,new THREE.PointsMaterial({color:0xffffff,size:.11,transparent:true,opacity:.5}));scene.add(stars);let tx=0,ty=0;window.addEventListener("mousemove",e=>{tx=(e.clientX/window.innerWidth-.5)*2;ty=(e.clientY/window.innerHeight-.5)*2});function render(){requestAnimationFrame(render);group.rotation.x+=.0008;group.rotation.y+=.0014;group.children.forEach((mesh,i)=>{mesh.rotation.x+=.001+i*.00002;mesh.rotation.y+=.0014+i*.00002});camera.position.x+=((tx*1.6)-camera.position.x)*.02;camera.position.y+=((-ty*1.2)-camera.position.y)*.02;camera.lookAt(scene.position);renderer.render(scene,camera)}render();window.addEventListener("resize",()=>{camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight)})}const searchInput=document.getElementById("projectSearch");const projectCards=[...document.querySelectorAll(".project-card-wrap")];const smartTags=document.getElementById("smartTags");const semanticMap={"business website":["business","local brand","service","sapna","pet"],"academic project":["bca","final year","academic","bike"],"mobility":["mobility","transport","welift","bike"],"ui ux":["ui","ux","portfolio","design"],"agriculture":["agri","agriculture"],"freelance":["freelance","client","pet","business"],"platform":["platform","concept","hub","welift","agri"]};function buildSmartTags(query){if(!smartTags)return;smartTags.innerHTML="";if(!query){["semantic search","smart tags","classification","UI/UX","data insights"].forEach(tag=>{const s=document.createElement("span");s.className="pill";s.textContent=tag;smartTags.appendChild(s)});return}const matched=[];Object.entries(semanticMap).forEach(([label,terms])=>{if(query.includes(label)||terms.some(term=>query.includes(term)))matched.push(label)});(matched.length?matched:["keyword-aware results","intent detection"]).forEach(tag=>{const s=document.createElement("span");s.className="pill";s.textContent=tag;smartTags.appendChild(s)})}buildSmartTags("");if(searchInput){searchInput.addEventListener("input",()=>{const q=searchInput.value.toLowerCase().trim();buildSmartTags(q);projectCards.forEach(card=>{const hay=[card.dataset.title||"",card.dataset.summary||"",card.dataset.tags||""].join(" ");let visible=hay.includes(q)||!q;if(!visible&&q){Object.values(semanticMap).forEach(terms=>{if(terms.some(t=>q.includes(t)&&hay.includes(t)))visible=true})}card.style.display=visible?"":"none"})})}

// ---------- Portfolio AI Chatbot ----------
const chatbotInput = document.getElementById("chatbotInput");
const chatbotSend = document.getElementById("chatbotSend");
const chatbotMessages = document.getElementById("chatbotMessages");

const botKnowledge = [
  {
    keywords: ["project", "projects", "work", "portfolio"],
    answer: "Farhanulla has worked on Bike Rentals, Pet Shop Website, Old Portfolio, Agri Link Hub, Welift Project, and Sapna Home Needs."
  },
  {
    keywords: ["bike", "bike rentals"],
    answer: "Bike Rentals is his BCA Final Year Project from 2024. It is a web-based bike rental platform with a structured browsing and booking-style flow."
  },
  {
    keywords: ["pet", "pet shop"],
    answer: "Pet Shop Website is a freelance project from 2025, focused on a business-friendly layout, service visibility, and a customer-friendly experience."
  },
  {
    keywords: ["skills", "tech", "technology", "stack"],
    answer: "His key skills include Python, Flask, HTML, CSS, JavaScript, UI/UX Design, Responsive Design, GitHub, NLP concepts, and Data Science thinking."
  },
  {
    keywords: ["nlp", "natural language processing"],
    answer: "This portfolio includes NLP-inspired features like semantic project search, smart tag generation, and keyword-aware discovery."
  },
  {
    keywords: ["data", "data science", "analytics"],
    answer: "This portfolio includes data science-inspired features like project insights, category breakdowns, technology frequency, and analytics-style UI cards."
  },
  {
    keywords: ["hire", "contact", "freelance", "work with"],
    answer: "You can contact Farhanulla through WhatsApp, Instagram, LinkedIn, GitHub, or by sending a project inquiry through the lead form."
  },
  {
    keywords: ["service", "services", "website", "build"],
    answer: "He builds premium portfolio websites, business websites, landing pages, interactive web experiences, and polished UI/UX-focused digital products."
  }
];

function addChatMessage(type, text) {
  if (!chatbotMessages) return;
  const msg = document.createElement("div");
  msg.className = `chat-msg ${type}`;
  msg.textContent = text;
  chatbotMessages.appendChild(msg);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBotReply(input) {
  const q = input.toLowerCase();
  for (const item of botKnowledge) {
    if (item.keywords.some(keyword => q.includes(keyword))) {
      return item.answer;
    }
  }
  return "I can help with projects, skills, freelance services, NLP, data science, and contact details. Try asking about projects, skills, or hiring.";
}

function handleChatbotSend() {
  if (!chatbotInput || !chatbotInput.value.trim()) return;
  const userText = chatbotInput.value.trim();
  addChatMessage("user", userText);

  const reply = getBotReply(userText);
  setTimeout(() => addChatMessage("bot", reply), 300);

  chatbotInput.value = "";
}

if (chatbotSend) {
  chatbotSend.addEventListener("click", handleChatbotSend);
}
if (chatbotInput) {
  chatbotInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleChatbotSend();
    }
  });
}

// ---------- Lead Form via Formspree ----------
const leadForm = document.getElementById("leadForm");
const leadFormStatus = document.getElementById("leadFormStatus");

if (leadForm) {
  leadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(leadForm);

    try {
      const response = await fetch(leadForm.action, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        leadForm.reset();
        leadFormStatus.textContent = "Inquiry sent successfully. I’ll get back to you soon.";
      } else {
        leadFormStatus.textContent = "Something went wrong. Please try again.";
      }
    } catch (error) {
      leadFormStatus.textContent = "Network error. Please try again.";
    }
  });
}