document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".faq__list-item");

  items.forEach((item) => {
    const content = item.querySelector(".bottom");

    item.addEventListener("click", (e) => {
      // Чтобы не было двойного срабатывания при клике по вложенным элементам
      if (!item.contains(e.target)) return;

      const isOpen = item.classList.contains("active");

      // Закрываем все
      items.forEach((el) => {
        el.classList.remove("active");
        el.querySelector(".bottom").style.height = "0px";
      });

      // Если был закрыт — открываем
      if (!isOpen) {
        item.classList.add("active");
        content.style.height = content.scrollHeight + "px";
      }
    });
  });
});

//

const header = document.querySelector(".header");
const burger = document.querySelector(".header__burger");
const mobileMenu = document.querySelector(".mobile-menu");
const closeBtn = document.querySelector(".mobile-menu__close");
const mobileLinks = document.querySelectorAll(".mobile-menu a");

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }

  lastScroll = currentScroll;
});

/* BURGER */

burger.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  document.body.style.overflow = "";
});

/* CLOSE ON LINK CLICK */

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  });
});
