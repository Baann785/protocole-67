/* ============================================================
   AUDIO — tout est synthétisé en Web Audio.
   Aucun fichier son : rien à héberger, rien à charger, aucun droit à gérer.
   ============================================================ */

let ctx = null, sonActif = true, clicsMute = 0;

function audio(){
  if(!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if(ctx.state === 'suspended') ctx.resume();
  return ctx;
}

/* une note : fréquence, durée, timbre, volume, et éventuellement un glissando */
function note(freq, dur, type, vol, glideTo){
  if(!sonActif) return;
  const a = audio(), t = a.currentTime;
  const o = a.createOscillator(), g = a.createGain();
  o.type = type || 'sine';
  o.frequency.setValueAtTime(freq, t);
  if(glideTo) o.frequency.exponentialRampToValueAtTime(Math.max(20, glideTo), t + dur);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol == null ? .3 : vol, t + .012);
  g.gain.exponentialRampToValueAtTime(.0001, t + dur);
  o.connect(g); g.connect(a.destination);
  o.start(t); o.stop(t + dur + .05);
}

/* du bruit blanc filtré : sert pour les percussions et les impacts */
function bruit(dur, vol, filtre){
  if(!sonActif) return;
  const a = audio(), t = a.currentTime;
  const buf = a.createBuffer(1, Math.max(1, Math.floor(a.sampleRate * dur)), a.sampleRate);
  const d = buf.getChannelData(0);
  for(let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  const src = a.createBufferSource(); src.buffer = buf;
  const g = a.createGain();
  g.gain.setValueAtTime(vol == null ? .25 : vol, t);
  g.gain.exponentialRampToValueAtTime(.0001, t + dur);
  const f = a.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = filtre || 1400;
  src.connect(f); f.connect(g); g.connect(a.destination);
  src.start(t);
}

const SONS = {
  vineBoom(){ note(160,.85,'sine',.55,28); bruit(.35,.3,400); },
  airhorn(){ [0,.28,.56].forEach(function(d){ setTimeout(function(){
      [1,1.005,1.5].forEach(function(m){ note(392*m,.24,'sawtooth',.13,466*m); }); }, d*1000); }); },
  bruh(){ note(130,.5,'sawtooth',.35,72); },
  skibidi(){ [523,523,659,523,784,659,523].forEach(function(f,i){
      setTimeout(function(){ note(f,.13,'square',.22); }, i*105); }); },
  tung(){ [0,.22,.44].forEach(function(d,i){ setTimeout(function(){
      note(90-i*12,.3,'sine',.5,42); bruit(.12,.22,900); }, d*1000); }); },
  rizz(){ note(220,.55,'sine',.3,1320); note(330,.55,'triangle',.12,1980); },
  violon(){ [587,523,466,392,349].forEach(function(f,i){
      setTimeout(function(){ note(f,.55,'sawtooth',.16,f*.96); }, i*260); }); },
  erreur(){ note(830,.18,'square',.28); setTimeout(function(){ note(622,.42,'square',.28); },190); },
  sixSept(){ note(880,.1,'square',.28); setTimeout(function(){ note(1320,.16,'square',.28); },110); },
  fanfare(){ [523,659,784,1047].forEach(function(f,i){
      setTimeout(function(){ note(f,.35,'triangle',.3); }, i*130); }); },
  /* la petite mélodie de Fort Boyard, façon Père Fouras */
  boyard(){ [392,440,494,523,494,440,392].forEach(function(f,i){
      setTimeout(function(){ note(f,.22,'triangle',.24); }, i*160); }); },
  bip(){ note(1400,.05,'square',.12); },
  pad(i){ note([262,330,392,523][i], .34, 'square', .22); },
  pop(){ note(700,.09,'triangle',.3,1100); },
  aura(){ for(let i=0;i<12;i++) setTimeout(function(){
      note(200+i*120,.25,'sine',.12,200+i*190); }, i*60); }
};

document.getElementById('mute').onclick = function(){
  sonActif = !sonActif;
  this.textContent = sonActif ? '🔊 SON' : '🔇 SON';
  this.style.color = this.style.borderColor = sonActif ? '#c6ff00' : '#ff2bd6';
  clicsMute++;
  if(clicsMute === 7) secret('board');   // easter egg : 7 clics sur le bouton son
};

/* les navigateurs exigent un geste utilisateur avant de démarrer l'audio */
document.addEventListener('click', function once(){ audio(); document.removeEventListener('click', once); });
