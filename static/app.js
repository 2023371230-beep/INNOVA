// Interacciones y animaciones ligeras: smooth scroll y scroll-reveal
document.addEventListener('DOMContentLoaded', function () {
  // Navbar style on scroll
  function onScroll(){
    var header = document.querySelector('.site-header');
    if(!header) return;
    if(window.scrollY > 10){ header.classList.add('nav-scrolled'); }
    else{ header.classList.remove('nav-scrolled'); }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = anchor.getAttribute('href');
      if (href.length > 1) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Close responsive navbar after click (if open)
          var bsCollapse = document.querySelector('.navbar-collapse');
          if (bsCollapse && bsCollapse.classList.contains('show')) {
            var collapse = new bootstrap.Collapse(bsCollapse);
            collapse.hide();
          }
        }
      }
    });
  });

  // Scroll reveal using IntersectionObserver
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {root: null, rootMargin: '0px', threshold: 0.15});

  document.querySelectorAll('.reveal').forEach(function(el){ observer.observe(el); });

  // Simple hero CTA pulse (small animation)
  var cta = document.querySelector('.hero .btn');
  if(cta){
    setInterval(function(){ cta.classList.toggle('pulse'); }, 2500);
  }
});

// Optional: small CSS class toggle handled by JS for accessibility
// (Pulse class is defined in CSS if desired.)
