/* ============================================================
   CORE — état global, petits utilitaires, navigation entre écrans
   ============================================================ */

const ETAT = {
  nom: CONFIG.prenomAffiche, ageDit: CONFIG.age, ecran: 0,
  debut: Date.now(),
  clics67: 0, rates67: 0, erreursSimon: 0, mancheSimonMax: 0, moai: 0,
  indiceMdp: false, voixEnvoyee: false, compliments: 0,
  secrets: {}
};

/* minuscules + accents retirés, pour comparer des textes sans se prendre la tête.
   La classe de caractères couvre les marques diacritiques que NFD sépare des lettres. */
function norm(s){
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}
function alea(n){ return Math.floor(Math.random() * n); }
function pioche(t){ return t[alea(t.length)]; }

/* ---------------- MACHINE À ÉCRIRE ---------------- */
function tape(el, texte, fin){
  if(el._timer) clearInterval(el._timer);
  el.innerHTML = '';
  let i = 0;
  const curseur = '<span class="curseur">&nbsp;</span>';
  el._timer = setInterval(function(){
    i++;
    el.innerHTML = texte.slice(0, i) + (i < texte.length ? curseur : '');
    if(i % 6 === 0) SONS.bip();   // 1 oscillateur sur 6 : moins de nœuds audio créés/sec
    if(i >= texte.length){
      clearInterval(el._timer); el._timer = null;
      if(fin) fin();
    }
  }, 22);
}

/* ---------------- TOAST ---------------- */
let toastTimer = null;
function toast(txt){
  const t = document.getElementById('toast');
  t.textContent = txt;
  t.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ t.classList.remove('on'); }, 3400);
}

/* ---------------- MODALE ---------------- */
function modale(titre, texte){
  document.getElementById('modTitre').textContent = titre;
  document.getElementById('modTxt').textContent = texte;
  document.getElementById('modale').classList.add('on');
}
document.getElementById('modFermer').onclick = function(){ document.getElementById('modale').classList.remove('on'); };
document.getElementById('modale').onclick = function(e){ if(e.target === this) this.classList.remove('on'); };

/* ---------------- NAVIGATION ----------------
   ECRANS[n] est rempli par etapes.js, jeux.js et final.js.
   PCT est volontairement bloqué à 67% sur les trois derniers écrans. */
const ECRANS = {};
const PCT = [0, 5, 9, 14, 21, 28, 36, 44, 52, 60, 67, 67, 67, 100, 67];

function aller(n){
  const cur = document.querySelector('.ecran.actif');
  if(cur) cur.classList.remove('actif');
  document.getElementById('e' + n).classList.add('actif');
  ETAT.ecran = n;
  document.getElementById('hudFill').style.width = PCT[n] + '%';
  document.getElementById('hudPct').textContent = Math.round(PCT[n]) + '%';
  window.scrollTo({top: 0, behavior: 'smooth'});
  if(ECRANS[n]) ECRANS[n]();
}
