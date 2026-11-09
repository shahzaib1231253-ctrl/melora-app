<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MELORA — Feel it. Express it. Release it.</title>
<style>
:root{--bg:#100e1b;--panel:#1b1729;--panel2:#262039;--line:#39304c;--text:#f7f1ff;--muted:#b9accb;--lav:#d7b8ff;--pink:#e9b5d5}
*{box-sizing:border-box}body{margin:0;background:radial-gradient(ellipse at 50% -10%,#3b2857 0%,#171225 42%,#100e1b 75%);color:var(--text);font:15px/1.5 Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;min-height:100vh}
.wrap{max-width:1040px;margin:auto;padding:28px 22px 50px}.top{display:flex;align-items:center;justify-content:space-between}.brand{display:flex;align-items:center;gap:11px;font-size:25px;font-weight:800;letter-spacing:3px}.mark{color:var(--lav);font-size:28px}.tag{font-size:10px;letter-spacing:2px;color:var(--muted);margin-top:3px}.pill{border:1px solid #66527d;color:#e5d2ff;border-radius:30px;padding:6px 12px;font-size:11px;letter-spacing:1px}
.hero{text-align:center;padding:45px 10px 25px}.eyebrow{color:var(--lav);font-size:11px;letter-spacing:3px;font-weight:700}.hero h1{font-size:clamp(34px,6vw,58px);line-height:1.08;margin:15px auto 12px;max-width:700px;letter-spacing:-1.8px}.hero p{color:var(--muted);font-size:16px;margin:0 auto;max-width:570px}
.app{max-width:760px;margin:0 auto;background:#171323d9;border:1px solid var(--line);border-radius:24px;padding:25px;box-shadow:0 24px 80px #0006;backdrop-filter:blur(12px)}
.tabs{display:flex;gap:8px;margin-bottom:25px}.tab{flex:1;border:1px solid var(--line);background:#211b31;color:var(--muted);padding:11px;border-radius:12px;cursor:pointer;font-weight:650}.tab.active{background:#594271;color:white;border-color:#a98bc9}
h2{font-size:23px;margin:0 0 5px}h3{font-size:15px;margin:23px 0 10px}.sub{color:var(--muted);margin:0 0 18px;font-size:13px}
.moods{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.mood{border:1px solid var(--line);background:var(--panel);color:var(--text);border-radius:14px;padding:14px 8px;cursor:pointer;text-align:center}.mood span{display:block;font-size:24px;margin-bottom:5px}.mood.selected{border-color:var(--lav);background:#38294c;box-shadow:0 0 0 1px #c9a9ef33}
textarea{width:100%;min-height:112px;resize:vertical;border:1px solid var(--line);background:#100e1b;color:white;border-radius:13px;padding:14px;font:inherit;outline:none}textarea:focus{border-color:#b89add}
.options{display:flex;flex-wrap:wrap;gap:9px}.choice{border:1px solid var(--line);background:#211b31;color:var(--muted);border-radius:30px;padding:9px 14px;cursor:pointer}.choice.selected{background:#49365f;border-color:#c7a7ef;color:white}
select{background:#211b31;border:1px solid var(--line);color:white;border-radius:10px;padding:10px 14px;font:inherit}
.primary{width:100%;border:0;border-radius:13px;padding:15px;background:linear-gradient(100deg,#a986d1,#d39fc7);color:#20142d;font-size:15px;font-weight:800;cursor:pointer;margin-top:24px}.primary:hover{filter:brightness(1.08)}.primary:disabled{opacity:0.6;cursor:not-allowed}
.result{display:none;margin-top:20px;padding:18px;border:1px solid #72578e;background:linear-gradient(135deg,#302341,#211a30);border-radius:16px}.result.show{display:block}.result h3{margin:0 0 8px;font-size:18px}.result p{color:var(--muted);font-size:13px;word-break:break-word}
audio{width:100%;margin-top:15px;border-radius:8px}
.footer{text-align:center;color:#8f829f;font-size:11px;letter-spacing:2px;margin:28px 0}
@media(max-width:560px){.wrap{padding:18px 13px}.moods{grid-template-columns:repeat(2,1fr)}}
</style>
</head>
<body>
<div class="wrap">
<header class="top"><div><div class="brand"><span class="mark">〰</span> MELORA</div><div class="tag">YOUR PERSONAL EMOTIONAL MUSIC COMPANION</div></div><span class="pill">LIVE MVP</span></header>
<section class="hero"><div class="eyebrow">A SPACE TO FEEL</div><h1>Your feelings deserve<br> a voice.</h1><p>Put what’s on your mind into words. Shape it into a song that feels like yours.</p></section>
<main class="app">
<nav class="tabs"><button class="tab active">✧ &nbsp; Create</button></nav>
<section id="create">
<h2>How are you feeling today?</h2>
<div class="moods" id="moods">
<button class="mood" data-mood="Happy"><span>☀️</span>Happy</button><button class="mood" data-mood="Heartbroken"><span>💔</span>Heartbroken</button><button class="mood selected" data-mood="Overwhelmed"><span>🌧️</span>Overwhelmed</button><button class="mood" data-mood="Lonely"><span>🌙</span>Lonely</button><button class="mood" data-mood="Hopeful"><span>🌱</span>Hopeful</button><button class="mood" data-mood="Angry"><span>🔥</span>Angry</button><button class="mood" data-mood="Nostalgic"><span>🕊️</span>Nostalgic</button><button class="mood" data-mood="Peaceful"><span>🌸</span>Peaceful</button>
</div>
<h3>Tell us what’s on your mind</h3>
<textarea id="story" placeholder="I've been feeling... I wish someone understood..."></textarea>
<h3>Choose your sound</h3><div class="options" id="styles"><button class="choice selected">Emotional piano</button><button class="choice">Cinematic orchestral</button><button class="choice">Soft acoustic</button><button class="choice">Ambient healing</button></div>
<h3>Song language</h3><select id="language"><option>English</option><option>Urdu</option><option>Hindi</option></select>
<button class="primary" id="generate">✧ &nbsp; Create My Real AI Song</button>

<div class="result" id="result">
  <span class="pill">YOUR AI MUSIC TRACK</span>
  <h3 id="songtitle">Generating...</h3>
  <p id="songdetails"></p>
  <audio id="audioPlayer" controls></audio>
</div>
</section>
</main>
<div class="footer">MELORA &nbsp;·&nbsp; FEEL IT. EXPRESS IT. RELEASE IT.</div>
</div>

<script>
let mood='Overwhelmed', style='Emotional piano';
document.querySelectorAll('.mood').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.mood').forEach(x=>x.classList.toggle('selected',x===b));mood=b.dataset.mood}));
document.querySelectorAll('#styles .choice').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('#styles .choice').forEach(x=>x.classList.toggle('selected',x===b));style=b.textContent}));

document.getElementById('generate').addEventListener('click', async ()=>{
  const btn = document.getElementById('generate');
  const story = document.getElementById('story').value.trim();
  const lang = document.getElementById('language').value;
  const result = document.getElementById('result');
  const player = document.getElementById('audioPlayer');
  
  btn.disabled = true;
  btn.textContent = "Connecting to AI Engine...";
  result.classList.add('show');
  document.getElementById('songtitle').textContent = mood + ' — Creating AI Track...';
  document.getElementById('songdetails').textContent = 'Initializing music creation task...';

  const prompt = `${style} instrumental music conveying a ${mood} mood. User notes: ${story}`;

  try {
    const res = await fetch('/api/generate-music', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const prediction = await res.json();

    if (!res.ok || !prediction || prediction.error || prediction.detail) {
      const errDetail = prediction ? (prediction.error || prediction.detail || JSON.stringify(prediction)) : 'Network response error';
      throw new Error(errDetail);
    }

    const pollUrl = prediction.urls && prediction.urls.get ? prediction.urls.get : `https://api.replicate.com/v1/predictions/${prediction.id}`;

    let status = prediction.status;
    let audioUrl = prediction.output;
    let counter = 0;

    while (status !== "succeeded" && status !== "failed") {
      counter++;
      btn.textContent = `Generating AI Music (${counter * 3}s)...`;
      document.getElementById('songdetails').textContent = `AI composing track... status: ${status} (${counter * 3}s elapsed)`;
      
      await new Promise(r => setTimeout(r, 3000));
      
      const checkRes = await fetch('/api/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pollUrl })
      });
      const checkData = await checkRes.json();
      status = checkData.status;

      if (status === "succeeded") {
        audioUrl = checkData.output;
      } else if (status === "failed") {
        throw new Error(checkData.error || checkData.detail || 'Music generation failed on Replicate.');
      }
    }

    if(audioUrl) {
      player.src = Array.isArray(audioUrl) ? audioUrl[0] : audioUrl;
      document.getElementById('songtitle').textContent = mood + ' — Your AI Song';
      document.getElementById('songdetails').textContent = `${style} · ${lang}`;
      player.play();
    }
  } catch(e) {
    document.getElementById('songtitle').textContent = 'Generation Error';
    document.getElementById('songdetails').textContent = e.message || 'Error generating track.';
  } finally {
    btn.disabled = false;
    btn.textContent = "✧   Create My Real AI Song";
  }
});
</script>
</body>
</html>
