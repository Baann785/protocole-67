/* ============================================================
   DEBUG — panneau de test, DÉSACTIVÉ PAR DÉFAUT

   ⚠️ Ce fichier ne fait STRICTEMENT RIEN tant qu'il n'est pas activé.
   Trois façons de l'activer, au choix :
     1. ajouter « ?debug » à la fin de l'URL   ← le plus simple
     2. ajouter « #debug » à la fin de l'URL
     3. mettre debug: true dans js/config.js

   Avant d'envoyer le lien à Yass : soit tu laisses tout tel quel (le
   panneau n'apparaîtra jamais sans « ?debug »), soit tu supprimes la
   ligne <script src="js/debug.js"></script> dans index.html pour être
   certain à 100%.
   ============================================================ */
(function(){
  const actifParUrl = /[?&#]debug\b/.test(location.search + location.hash);
  const actifParConfig = (typeof CONFIG !== 'undefined' && CONFIG.debug === true);
  if(!actifParUrl && !actifParConfig) return;

  const ECRANS_NOMS = [
    'Boot', 'Prénom', 'Captcha', 'Âge',
    'Mot de passe', 'É1 · Rituel 67', 'É2 · Trouve 67', 'É3 · Simon',
    'É4 · Crousty', 'É5 · Voix', 'É6 · Quiz', 'É7 · Cadeau',
    '💀 INTRUSION', '🎂 ÉPILOGUE'
  ];
  // bouton « continuer » de chaque écran, pour pouvoir le forcer
  const CONTINUER = {4:'b7', 5:'b4', 6:'b5', 7:'b6', 8:'b8', 9:'b9', 10:'b10', 11:'b11', 13:'b13'};

  /* ---------------- styles ---------------- */
  const css = document.createElement('style');
  css.textContent = `
    #dbg{position:fixed;left:10px;bottom:10px;z-index:9000;width:min(300px,92vw);
      background:#0a0018;border:3px solid #00f0ff;box-shadow:0 0 24px rgba(0,240,255,.4);
      font-family:'Courier New',monospace;font-size:11px;color:#cdb6ff}
    #dbg .tete{background:#00f0ff;color:#000;padding:5px 8px;font-weight:bold;
      display:flex;justify-content:space-between;align-items:center;cursor:pointer;letter-spacing:1px}
    #dbg .corps{padding:8px}
    #dbg.replie .corps{display:none}
    #dbg .ou{color:#c6ff00;margin-bottom:7px;font-weight:bold}
    #dbg .grille{display:grid;grid-template-columns:repeat(2,1fr);gap:3px;margin-bottom:7px}
    #dbg button{font-family:inherit;font-size:10px;padding:5px 4px;background:#1c0940;
      color:#fff;border:1px solid #4a2a8a;cursor:pointer;text-align:left;line-height:1.2}
    #dbg button:hover{background:#00f0ff;color:#000}
    #dbg button.ici{background:#c6ff00;color:#000;font-weight:bold}
    #dbg .actions{display:grid;grid-template-columns:1fr 1fr;gap:3px}
    #dbg .actions button{text-align:center;background:#3a0f52}
    #dbg .aide{margin-top:7px;color:#7d6aa8;font-size:10px;line-height:1.5}
  `;
  document.head.appendChild(css);

  /* ---------------- panneau ---------------- */
  const box = document.createElement('div');
  box.id = 'dbg';
  box.innerHTML =
    '<div class="tete"><span>🐞 DEBUG</span><span id="dbgTgl">[–]</span></div>' +
    '<div class="corps">' +
      '<div class="ou" id="dbgOu"></div>' +
      '<div class="grille" id="dbgGrille"></div>' +
      '<div class="actions">' +
        '<button id="dbgPrec">◀ précédent</button>' +
        '<button id="dbgSuiv">suivant ▶</button>' +
        '<button id="dbgDeb">⚡ débloquer</button>' +
        '<button id="dbgMdp">🔑 remplir mdp</button>' +
      '</div>' +
      '<div class="aide">Ctrl+← / Ctrl+→ : écran · Ctrl+↓ : débloquer · Ctrl+D : replier</div>' +
    '</div>';
  document.body.appendChild(box);

  const grille = document.getElementById('dbgGrille');
  ECRANS_NOMS.forEach(function(nom, i){
    const b = document.createElement('button');
    b.textContent = i + '. ' + nom;
    b.dataset.n = i;
    b.onclick = function(){ sauter(i); };
    grille.appendChild(b);
  });

  function majPanneau(){
    document.getElementById('dbgOu').textContent =
      '→ écran ' + ETAT.ecran + ' : ' + (ECRANS_NOMS[ETAT.ecran] || '?');
    Array.prototype.forEach.call(grille.children, function(b){
      b.classList.toggle('ici', +b.dataset.n === ETAT.ecran);
    });
  }

  function sauter(n){
    n = Math.max(0, Math.min(ECRANS_NOMS.length - 1, n));
    if(typeof stopVoix === 'function') stopVoix();   // libère le micro si on quitte l'épreuve vocale
    aller(n);
    majPanneau();
  }

  /* force l'apparition du bouton « continuer » de l'écran courant */
  function debloquer(){
    const n = ETAT.ecran;

    // le quiz cache son bouton derrière l'écran de score
    if(n === 10){
      document.getElementById('quizJeu').style.display = 'none';
      document.getElementById('quizFin').style.display = 'block';
    }
    const id = CONTINUER[n];
    if(!id) return;
    const b = document.getElementById(id);
    b.style.display = 'block';
    b.disabled = false;
    b.scrollIntoView({behavior:'smooth', block:'center'});
  }

  function remplirMdp(){
    if(ETAT.ecran !== 4 || typeof solutionMdp !== 'function') return;
    const inp = document.getElementById('inputMdp');
    inp.value = solutionMdp();
    inp.dispatchEvent(new Event('input'));   // déclenche la validation des règles
  }

  document.getElementById('dbgPrec').onclick = function(){ sauter(ETAT.ecran - 1); };
  document.getElementById('dbgSuiv').onclick = function(){ sauter(ETAT.ecran + 1); };
  document.getElementById('dbgDeb').onclick  = debloquer;
  document.getElementById('dbgMdp').onclick  = remplirMdp;

  const tete = box.querySelector('.tete');
  tete.onclick = function(){
    box.classList.toggle('replie');
    document.getElementById('dbgTgl').textContent = box.classList.contains('replie') ? '[+]' : '[–]';
  };

  /* raccourcis clavier — en Ctrl+… pour ne pas marcher sur les codes secrets */
  window.addEventListener('keydown', function(e){
    if(!e.ctrlKey) return;
    if(e.key === 'ArrowRight'){ e.preventDefault(); sauter(ETAT.ecran + 1); }
    else if(e.key === 'ArrowLeft'){ e.preventDefault(); sauter(ETAT.ecran - 1); }
    else if(e.key === 'ArrowDown'){ e.preventDefault(); debloquer(); }
    else if(e.key.toLowerCase() === 'd'){ e.preventDefault(); tete.onclick(); }
  });

  /* le panneau suit la navigation, même quand elle vient du parcours lui-même */
  const allerOriginal = window.aller;
  window.aller = function(n){ allerOriginal(n); majPanneau(); };

  majPanneau();
  console.log('%c🐞 DEBUG ACTIF', 'background:#00f0ff;color:#000;padding:2px 6px;font-weight:bold',
              '— retire « ?debug » de l\'URL pour revenir au parcours normal.');
})();
