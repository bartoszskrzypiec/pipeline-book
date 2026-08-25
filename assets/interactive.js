function openDetailModal(targetId){
  var template = document.getElementById(targetId);
  var overlay = document.getElementById('modal-overlay');
  var panel = document.getElementById('modal-body');
  if(!template || !overlay || !panel) return;
  panel.innerHTML = '';
  panel.appendChild(template.content.cloneNode(true));
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDetailModal(){
  var overlay = document.getElementById('modal-overlay');
  if(!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('click', function(e){
  var trigger = e.target.closest('[data-modal-target]');
  if(trigger){
    openDetailModal(trigger.getAttribute('data-modal-target'));
    return;
  }
  if(e.target.closest('[data-modal-close]') || e.target.id === 'modal-overlay'){
    closeDetailModal();
  }
});

document.addEventListener('keydown', function(e){
  if(e.key !== 'Escape') return;
  closeDetailModal();
  if(window.__hideVecTip) window.__hideVecTip();
});

document.addEventListener('DOMContentLoaded', function(){
  var vecEls = document.querySelectorAll('.vec[data-tip]');
  if(!vecEls.length) return;

  var tip = document.createElement('div');
  tip.className = 'vec-tooltip';
  tip.id = 'vec-tooltip';
  document.body.appendChild(tip);

  var current = null;

  function showTip(el){
    if(current && current !== el) current.setAttribute('aria-expanded', 'false');
    current = el;
    el.setAttribute('aria-expanded', 'true');
    el.setAttribute('aria-describedby', 'vec-tooltip');
    tip.textContent = el.getAttribute('data-tip');
    tip.style.display = 'block';
    var r = el.getBoundingClientRect();
    var tipRect = tip.getBoundingClientRect();
    var left = r.left + r.width / 2 - tipRect.width / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - tipRect.width - 8));
    var top = r.top - tipRect.height - 8;
    if(top < 8) top = r.bottom + 8;
    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
  }

  function hideTip(){
    tip.style.display = 'none';
    if(current){
      current.setAttribute('aria-expanded', 'false');
      current.removeAttribute('aria-describedby');
      current = null;
    }
  }

  // Udostępniane globalnie, żeby handler Escape (wyżej) mógł zamknąć też tooltip.
  window.__hideVecTip = hideTip;

  vecEls.forEach(function(el){
    // Nadawane z JS, nie w HTML — inaczej trzeba by edytować 272 spany w 22 plikach.
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-expanded', 'false');

    // Hover tylko dla myszy — na dotyku pointerenter potrafi zdublować tap.
    el.addEventListener('pointerenter', function(e){
      if(e.pointerType === 'mouse') showTip(el);
    });
    el.addEventListener('pointerleave', function(e){
      if(e.pointerType === 'mouse') hideTip();
    });

    // Dotyk i klik: przełącznik.
    el.addEventListener('click', function(e){
      e.stopPropagation();
      if(current === el) hideTip(); else showTip(el);
    });

    // Klawiatura: span z role="button" nie dostaje clicku z Entera sam z siebie.
    el.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        if(current === el) hideTip(); else showTip(el);
      }
    });

    el.addEventListener('focus', function(){ showTip(el); });
    el.addEventListener('blur', hideTip);
  });

  document.addEventListener('click', function(e){
    if(!e.target.closest('.vec[data-tip]')) hideTip();
  });

  // Tooltip jest pozycjonowany fixed z getBoundingClientRect — po scrollu
  // odkleiłby się od symbolu, więc chowamy zamiast przeliczać.
  window.addEventListener('scroll', hideTip, {passive: true});
  window.addEventListener('resize', hideTip);
});

/* ------------------------------------------------------------------
   PRZEŁĄCZANIE WARSTW DIAGRAMU
   Odpowiednik toggleRay() z raytracing-book, uogólniony: chip z
   data-layer="X" gasi grupę SVG z tym samym data-layer (klasa .ray-off).
   Chipy są <button>, więc klawiatura działa bez dodatkowego kodu —
   dokładnie tak jak przy .vec[data-tip] niżej.
   Bez JS wszystkie warstwy zostają widoczne: diagram czyta się statycznie.
------------------------------------------------------------------- */
function toggleLayer(chip){
  var layer = chip.getAttribute('data-layer');
  var frame = chip.closest('.diagram-frame');
  if(!layer || !frame) return;
  var off = chip.classList.toggle('off');
  chip.setAttribute('aria-pressed', off ? 'false' : 'true');
  frame.querySelectorAll('[data-layer="' + layer + '"]').forEach(function(el){
    if(el === chip) return;
    el.classList.toggle('ray-off', off);
  });
}

/* Odsłanianie odpowiedzi w .exercise — przycisk wskazuje id bloku .answer. */
function revealAnswer(btn){
  var answer = document.getElementById(btn.getAttribute('data-answer'));
  if(!answer) return;
  var shown = answer.classList.toggle('shown');
  btn.setAttribute('aria-expanded', shown ? 'true' : 'false');
  btn.textContent = shown ? 'Ukryj odpowiedź' : 'Pokaż odpowiedź';
}

document.addEventListener('click', function(e){
  var chip = e.target.closest('.chip[data-layer]');
  if(chip){ toggleLayer(chip); return; }
  var reveal = e.target.closest('.reveal-btn[data-answer]');
  if(reveal) revealAnswer(reveal);
});
