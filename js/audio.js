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
  /* Logo sonore « institutionnel » : balayage montant, motif de 3 notes,
     puis une queue scintillante. Le genre de jingle qu'on entend au démarrage
     d'un logiciel de banque — d'où l'effet comique quand il précède un refus. */
  logo(){
    note(170, .6, 'sine', .16, 880);
    [[0,523],[190,784],[380,1047]].forEach(function(x){
      setTimeout(function(){
        note(x[1], .55, 'triangle', .2);
        note(x[1] * 2, .55, 'sine', .05);
      }, 260 + x[0]);
    });
    for(let i = 0; i < 5; i++){
      setTimeout(function(){ note(1568 + i * 210, .4, 'sine', .045); }, 780 + i * 75);
    }
  },
  bip(){ note(1400,.05,'square',.12); },
  pad(i){ note([262,330,392,523][i], .34, 'square', .22); },
  pop(){ note(700,.09,'triangle',.3,1100); },
  aura(){ for(let i=0;i<12;i++) setTimeout(function(){
      note(200+i*120,.25,'sine',.12,200+i*190); }, i*60); }
};

/* ------------------------------------------------------------
   LES ENREGISTREMENTS DE YASS
   Deux extraits où c'est elle qui chante. Joués pendant la fausse
   vérification du mot de passe, l'un après l'autre.
   ------------------------------------------------------------ */
/* En MP3 et pas en OGG : l'OGG n'est pas lu par Safari/iOS, et elle ouvrira
   probablement le site sur son téléphone. Encodés en 96 kbps mono — la source
   est un enregistrement vocal, inutile d'alourdir le chargement. */
const CHANSONS = ['audio/yass-chante-1.mp3', 'audio/yass-chante-2.mp3'];

/* Le MP3 est lu partout, mais on vérifie quand même : si le navigateur dit non,
   on enchaîne sans audio plutôt que de bloquer le parcours. */
function lectureMp3Possible(){
  const a = document.createElement('audio');
  return !!(a.canPlayType && a.canPlayType('audio/mpeg'));
}

/* Joue les deux extraits à la suite, puis appelle `fin`.

   `surPiste(analyseur, index)` est appelé au démarrage de chaque extrait avec
   un AnalyserNode branché dessus — c'est lui qui pilote le logo animé. Il vaut
   `null` quand l'analyse est impossible (le logo bascule alors sur une
   animation libre) et `(null, -1)` signale la toute fin de la lecture.

   `fin` est TOUJOURS appelé, même si la lecture échoue : la suite du parcours
   ne doit jamais dépendre du bon vouloir du navigateur. */
function jouerChansons(fin, surPiste){
  function terminer(){ if(surPiste) surPiste(null, -1); fin(); }
  if(!sonActif || !lectureMp3Possible()){ setTimeout(terminer, 3200); return; }

  let i = 0, termine = false;
  function suivante(){
    if(termine) return;
    if(i >= CHANSONS.length){ termine = true; terminer(); return; }

    const index = i++;
    const el = new Audio(CHANSONS[index]);
    el.volume = 0.95;

    // on fait passer le son par le graphe Web Audio pour pouvoir l'analyser.
    // createMediaElementSource ne peut être appelé qu'une fois par élément :
    // on en crée un neuf à chaque extrait, donc pas de souci.
    let an = null;
    try{
      const c = audio();
      an = c.createAnalyser();
      an.fftSize = 128;
      c.createMediaElementSource(el).connect(an);
      an.connect(c.destination);          // sans ça, plus aucun son ne sort
    }catch(e){ an = null; }               // navigateur récalcitrant : tant pis pour l'analyse

    el.onended = suivante;
    el.onerror = suivante;
    el.play().then(function(){
      if(surPiste) surPiste(an, index);
    }).catch(function(){
      if(surPiste) surPiste(null, index);
      suivante();                          // autoplay refusé : on enchaîne quand même
    });
  }
  // filet de sécurité : si un fichier ne se charge jamais, on continue au bout de 40 s
  setTimeout(function(){ if(!termine){ termine = true; terminer(); } }, 40000);
  suivante();
}

document.getElementById('mute').onclick = function(){
  sonActif = !sonActif;
  this.textContent = sonActif ? '🔊 SON' : '🔇 SON';
  this.style.color = this.style.borderColor = sonActif ? '#c6ff00' : '#ff2bd6';
  clicsMute++;
  if(clicsMute === 7) secret('board');   // easter egg : 7 clics sur le bouton son
};

/* les navigateurs exigent un geste utilisateur avant de démarrer l'audio */
document.addEventListener('click', function once(){ audio(); document.removeEventListener('click', once); });
