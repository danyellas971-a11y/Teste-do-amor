const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduz=matchMedia("(prefers-reduced-motion:reduce)").matches;
$("#menuBtn").onclick=()=>{const o=$("#menu").classList.toggle("on");$("#menuBtn").setAttribute("aria-expanded",o)};
$$("nav a").forEach(a=>a.onclick=()=>{$("#menu").classList.remove("on");$("#menuBtn").setAttribute("aria-expanded","false")});
addEventListener("scroll",()=>{const h=document.documentElement;$("#prog").style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%"},{passive:true});
/* corações flutuando no topo */
if(!reduz){const hero=$(".hero");for(let i=0;i<12;i++){const s=document.createElement("span");s.className="flut";s.textContent="♥";s.style.cssText=`left:${Math.random()*96}%;font-size:${14+Math.random()*30}px;animation-duration:${9+Math.random()*9}s;animation-delay:${-Math.random()*14}s`;hero.appendChild(s)}}
/* explosão de corações */
function chuva(x,y,n=22){if(reduz)return;const e=["❤️","💖","💗","💕","✨"];for(let i=0;i<n;i++){const s=document.createElement("span");s.className="fx";s.textContent=e[i%e.length];s.style.left=x+"px";s.style.top=y+"px";document.body.appendChild(s);const a=Math.random()*Math.PI*2,d=70+Math.random()*150;s.animate([{transform:"translate(0,0) scale(.4)",opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d-60}px) scale(1.3)`,opacity:0}],{duration:1100+Math.random()*700,easing:"cubic-bezier(.1,.7,.3,1)"}).onfinish=()=>s.remove()}}
const cen=e=>{const r=e.currentTarget.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]};
/* sorteio */
const L={c:["Você não é Wi-Fi, mas quando chega perto meu coração já fica conectado.","Se carinho desse multa, você já estaria devendo um abraço bem demorado.","Você é igual feriado: só de pensar em ficar com você meu dia melhora.","Tem GPS? Porque meu pensamento vive encontrando o caminho até você.","Não sou fotógrafa, mas consigo imaginar nós dois em muitos momentos felizes.","Me empresta seu abraço? Prometo devolver só amanhã."],p:["Eu não sou Wi-Fi, mas aposto que a gente se conecta muito bem de pertinho.", "Hoje eu tô com vontade de um abraço daqueles que começam num cantinho e só terminam amanhã.", "Seu conchego tá disponível hoje à noite ou eu preciso marcar horário?", "Dizem que o frio é bom para ficar embaixo da coberta… imagina com você.", "Você me deixa com o coração acelerado e o resto… bem, o resto eu conto pessoalmente.", "Se a gente fosse um filme, seria daqueles que ninguém deixa passar da classificação indicativa."],m:["Que a gente nunca perca a vontade de cuidar um do outro, rir das pequenas coisas e criar novas lembranças. Obrigada por fazer parte da minha história.","Seu abraço tem um talento especial: transformar um dia comum em um dia melhor.","Passando para lembrar que você é amado, admirado e muito importante para mim.","Tem alguém aqui que torce por você, acredita em você e fica feliz só de lembrar que tem você por perto."]};
function troca(btn,id,lista){const el=$(id);btn.addEventListener("click",e=>{let n;do{n=lista[Math.floor(Math.random()*lista.length)]}while(lista.length>1&&n===el.textContent);el.classList.add("troca");setTimeout(()=>{el.textContent=n;el.classList.remove("troca")},reduz?0:220);chuva(...cen(e),8)})}
troca($("#cB"),"#cT",L.c);troca($("#pB"),"#pT",L.p);troca($("#mB"),"#mT",L.m);
/* quiz */
$$(".op").forEach(b=>b.onclick=e=>{$$(".op").forEach(x=>x.classList.remove("sel"));b.classList.add("sel");const ok=!!b.dataset.ok;$("#qr").textContent=ok?"Acertou, viu! Hoje não vivo mesmo sem seu conchego.":"Acho que você errou, baitola.";if(ok)chuva(...cen(e),14)});
/* surpresa */
$("#cor").onclick=e=>{$("#msg").hidden=false;chuva(...cen(e),36);$("#msg").scrollIntoView({behavior:reduz?"auto":"smooth",block:"center"})};
/* carta digitada */
const ps=$$("#carta p");
function digita(){let i=0;(function prox(){if(i>=ps.length)return;const p=ps[i],t=p.dataset.t;let k=0;const id=setInterval(()=>{p.textContent=t.slice(0,++k);if(k>=t.length){clearInterval(id);i++;prox()}},18)})()}
if(reduz||!("IntersectionObserver" in window)){ps.forEach(p=>p.textContent=p.dataset.t)}else{const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();digita()}},{threshold:.35});io.observe($("#carta"))}
/* foto ampliada */
$$(".galeria figure").forEach(f=>f.onclick=()=>{$("#lb img").src=f.querySelector("img").src;$("#lb").classList.add("on")});
$("#lb").onclick=()=>$("#lb").classList.remove("on");
addEventListener("keydown",e=>{if(e.key==="Escape")$("#lb").classList.remove("on")});
