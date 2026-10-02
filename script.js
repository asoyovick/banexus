(function () {
  'use strict';

  // Mobile navigation
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Venture expand/collapse
  document.querySelectorAll('.venture-head').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var body = document.getElementById(btn.getAttribute('aria-controls'));
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      body.hidden = expanded;
    });
  });

  // Form validation
  var form = document.getElementById('buildForm');
  var success = document.getElementById('formSuccess');

  function setError(input, errorEl, show) {
    errorEl.hidden = !show;
    input.setAttribute('aria-invalid', show ? 'true' : 'false');
  }

  function validateField(input, errorEl, test) {
    var show = !test;
    setError(input, errorEl, show);
    return !show;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var project = document.getElementById('project');
    var problem = document.getElementById('problem');
    var stage = document.getElementById('stage');
    var why = document.getElementById('why');

    var ok = true;
    ok = validateField(name, document.getElementById('nameError'), name.value.trim().length > 0) && ok;
    ok = validateField(email, document.getElementById('emailError'), /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) && ok;
    ok = validateField(project, document.getElementById('projectError'), project.value.trim().length > 0) && ok;
    ok = validateField(problem, document.getElementById('problemError'), problem.value.trim().length > 0) && ok;
    ok = validateField(stage, document.getElementById('stageError'), stage.value !== '') && ok;
    ok = validateField(why, document.getElementById('whyError'), why.value.trim().length > 0) && ok;

    if (ok) {
      form.hidden = true;
      success.hidden = false;
      success.setAttribute('tabindex', '-1');
      success.focus();
    }
  });

  // Clear errors as the user types
  form.querySelectorAll('input, textarea, select').forEach(function (el) {
    el.addEventListener('input', function () {
      setError(el, document.getElementById(el.id + 'Error'), false);
    });
    el.addEventListener('change', function () {
      setError(el, document.getElementById(el.id + 'Error'), false);
    });
  });

  document.getElementById('resetForm').addEventListener('click', function () {
    form.reset();
    form.hidden = false;
    success.hidden = true;
    document.getElementById('name').focus();
  });
})();
