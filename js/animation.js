// ===============================
// REVEAL ON SCROLL (IntersectionObserver)
// Анимация стартует ТОЛЬКО когда элемент появился в зоне видимости
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Если пользователь не хочет анимации — сразу показать всё
  if (prefersReduced) {
    document.querySelectorAll(".js-reveal, .reveal-stagger").forEach((el) => {
      el.classList.add("is-inview");
    });
    return;
  }

  // Настройки зоны видимости:
  // rootMargin сдвигает "линию старта" — чтобы анимация начиналась чуть раньше, чем блок полностью в кадре
  const options = {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -10% 0px"
  };

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      // Включаем анимацию
      el.classList.add("is-inview");

      // Если это stagger-контейнер — зададим задержки детям (1 раз)
      if (el.classList.contains("reveal-stagger") && !el.dataset.staggerInit) {
        const children = Array.from(el.children);
        children.forEach((child, i) => {
          child.style.setProperty("--d", `${i * 120}ms`);
        });
        el.dataset.staggerInit = "1";
      }

      // Одноразовая анимация (чтобы не дергалась при скролле вверх/вниз)
      observer.unobserve(el);
    });
  }, options);

  // ===============================
  // Авто-настройка: какие блоки анимировать
  // Ты можешь добавлять классы руками — но можно и автоматом.
  // ===============================

  // 1) Основные секции
  const sections = document.querySelectorAll(
    ".hero__content, .about__content, .about__img, .private__inner, .video__inner, .why__inner, .faq__inner"
  );

  sections.forEach((el) => {
    el.classList.add("js-reveal", "reveal-up");
    io.observe(el);
  });

  // 2) Списки карточек (stagger)
  const staggerBlocks = document.querySelectorAll(".private__list, .video__content");
  staggerBlocks.forEach((el) => {
    el.classList.add("reveal-stagger");
    io.observe(el);
  });

  // 3) Отдельные карточки (если нужно отдельно, но обычно хватит stagger контейнера)
  // document.querySelectorAll(".private__list-block, .video__content-block").forEach((el) => {
  //   el.classList.add("js-reveal", "reveal-scale");
  //   io.observe(el);
  // });

  // ===============================
  // Если ты хочешь вручную управлять:
  // Просто добавь в HTML:
  // class="js-reveal reveal-left" или reveal-right / reveal-scale / reveal-fade
  // ===============================
  document.querySelectorAll(".js-reveal, .reveal-stagger").forEach((el) => {
 
    io.observe(el);
  });
});