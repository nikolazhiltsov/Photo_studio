import * as flsFunctions from './function.js'

flsFunctions.isWebp()

let menu = document.querySelector('.menu__burger');
let menuNative = document.querySelector('.header__menu');
let menuFooter = document.querySelector('.footer__content__links');

let animItems = document.querySelectorAll("[data-scroll-anim]");
const menuHeight = parseInt(getComputedStyle(document.querySelector('.header__menu')).height);

function scrollToElem(e){
  const yoyo = e.target.getAttribute('data-goto');
  let ate = document.querySelector(yoyo).getBoundingClientRect().top + scrollY - menuHeight;
  if(yoyo == '#Companies' || yoyo == '#Blog'){
    ate = document.querySelector(yoyo).getBoundingClientRect().top + scrollY - menuHeight/2;
  }
  window.scrollTo({
      top: ate,
      behavior: "smooth"
  });
}

menu.addEventListener('click', scrollToElem);
menuNative.addEventListener('click', scrollToElem);
menuFooter.addEventListener('click', scrollToElem);

function show() {
    var toggles = document.querySelectorAll(".cmn-toggle-switch");
  
    for (var i = toggles.length - 1; i >= 0; i--) {
      var toggle = toggles[i];
      toggleHandler(toggle);
    };
  
    function toggleHandler(toggle) {
      toggle.addEventListener( "click", function(e) {
        e.preventDefault();
        (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");
        if(e.target.closest('.active')){

          document.querySelector('.shadow').style.opacity = '1';

          for (let index = 0; index < 5; index++) {
            let icons =  document.querySelectorAll('.menu__burger__services .services__item');
            let menu__burger_item = document.querySelectorAll('.menu__burger__nav__item');
            icons[index].style.opacity = '1';
            menu__burger_item[index].style.transform = 'translateX(0%)';
          }

          document.querySelector('.shadow').style.zIndex = '4';
          menu.classList.add("active");

        }else if(!e.target.closest('.active')){

          document.querySelector('.shadow').style.opacity = 0;
          

          for (let index = 0; index < 5; index++) {
            let icons =  document.querySelectorAll('.menu__burger__services .services__item');
            let menu__burger_item = document.querySelectorAll('.menu__burger__nav__item');
            icons[index].style.opacity = 0.2;
            menu__burger_item[index].style = null;
          }

          setTimeout(() => {
            document.querySelector('.shadow').style.zIndex = '-10';
          }, 600);
          menu.classList.remove("active");

        }
      });
    }
  };
  show();

  document.querySelector('.pro__services__menu__burger').addEventListener('click',()=>{
    document.querySelector('.nav-icon-cross').classList.toggle('open');
    document.querySelector('.pro__services__menu__burger').classList.toggle('menu_active');
  })

menu.addEventListener('click', function (e) {
        document.querySelector('.shadow').style.opacity = 0;

        for (let index = 0; index < 5; index++) {
          let icons =  document.querySelectorAll('.menu__burger__services .services__item');
          let menu__burger_item = document.querySelectorAll('.menu__burger__nav__item');
          icons[index].style.opacity = 0.2;
           menu__burger_item[index].style.transform = 'translate(100%)';
        }
        setTimeout(() => {
          document.querySelector('.shadow').style.zIndex = '-10';
        }, 500);
        menu.classList.remove("active");
        document.querySelector(".cmn-toggle-switch").classList.remove("active")
})



document.documentElement.addEventListener('mousedown', (e) => {
  let posX = e.offsetX;
  let posY = e.offsetY;
  if(e.target.closest('.menu__burger__nav__item') || e.target.closest('.button') || e.target.closest('.pro__services__menu__burger__nav__item') || e.target.closest('.swiper-button')){
      e.target.style.setProperty('--x', posX + 'px');
      e.target.style.setProperty('--y', posY + 'px');
      e.target.classList.add('pulse');
      e.target.addEventListener('animationend', () =>{
          e.target.classList.remove('pulse');
      })
  }
})


if(animItems.length > 0){
  window.addEventListener('scroll',scrollTrigger);
  function scrollTrigger(){
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 100;
      
      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      
      if(animItemHeight > window.innerHeight){
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight - menuHeight)){
        animItem.classList.add('scrollAnimActive');
      }else{
        animItem.classList.remove('scrollAnimActive');
      }

      if(scrollY){
        document.querySelector('.pro__services__menu__burger').classList.remove('menu_active');
        document.querySelector('.nav-icon-cross').classList.remove('open');
      }
    }
  }
  function offset(el){
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.scrollX || document.documentElement.scrollLeft,
      scrollTop = window.scrollY || document.documentElement.scrollTop;
    return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
  }

  setTimeout(scrollTrigger(),400)
}


let imageSliderArrayPrototype = document.querySelectorAll('.swiper__img'); 
let imageSliderArray = [];

for (let i = 0; i < imageSliderArrayPrototype.length; i++) {
  imageSliderArray[i] = imageSliderArrayPrototype[i].style.backgroundImage;
}


new Swiper('.image-slider',{
navigation:{
    nextEl: '.swiper-button.next',
    prevEl: '.swiper-button.back'
},

pagination:{
    el: '.slider__logo__slide',
    clickable: true,
    renderBullet: function (index, className) {
      return `<div class="swiper__img swiper-pagination-bullet" style='background-image: ${imageSliderArray[index]};'>
      <div class="swiper__img__hover">
          <div class="button">Company</div>
          <h1>Check Service <span class="icon-arrow"></span></h1>
      </div>
  </div>`;
    },
},

slidesPerView: 'auto',
loop: true,
spaceBetween: 10,
speed: 800,
breakpoints: {
  769:{
    spaceBetween: 0
  }
},

autoplay:{
  delay: 2000,
  stopOnLastSlide: false,
  disableOnInteraction: false
},

})


new Swiper('.image-slider-clients',{
  slidesPerView: 1,
  loop: true,
  spaceBetween: 20,
  speed: 800,
  autoplay:{
    delay: 2000,
    stopOnLastSlide: false,
    disableOnInteraction: false
  },
  pagination:{
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    769:{
      spaceBetween: 30,
      slidesPerView: 2,
    },
    1120:{
      spaceBetween: 40,
      slidesPerView: 3,
    }
  },
})

const mediaQuery_1360 = window.matchMedia('(max-width: 1360px)')
const mediaQuery_768 = window.matchMedia('(max-width: 768px)')

const parent_original = document.querySelector('.why_headshots__inner:last-child');
const parent_768 = document.querySelector('.why_headshots__inner:first-child');
const parent = document.querySelector('.why_headshots__inner__element:first-child');
const item = document.querySelector('.professional-headshots-services');

function handleTabletChange_1360(e) {
  if(e.matches) {
    if(!item.classList.contains('done_1360')){
      parent.append(item);
      item.classList.add('done_1360');
    }
  } else {
    if(item.classList.contains('done_1360')){
      parent_original.prepend(item);
      item.classList.remove('done_1360');
    }
  }
}
mediaQuery_1360.addEventListener('change',handleTabletChange_1360)
handleTabletChange_1360(mediaQuery_1360)

let blogElem = document.querySelector('.blog__elem');
let blogElemItem = document.querySelectorAll('.blog__elem__item');

function handleTabletChange_768(e) {
  if(e.matches) {
    if(!item.classList.contains('done_768')){
      parent_768.insertBefore(item, parent_768.children[1])
      item.classList.remove('scrollAnimRight');
      item.classList.add('done_768','scrollAnimLeft');
      parent.children[1].classList.remove('scrollAnimLeft');
      parent.children[1].classList.add('scrollAnimRight');
    }
    if(!blogElem.classList.contains('done_768')){
      blogElem.removeAttribute('data-scroll-anim')
      blogElem.classList.remove('scrollAnimLadder')
      for (let i = 0; i < blogElemItem.length; i++) {
        blogElemItem[i].setAttribute('data-scroll-anim','');
      }
      animItems = document.querySelectorAll("[data-scroll-anim]");
    }
  } else {
    if(item.classList.contains('done_768')){
      parent.append(item);
      item.classList.add('scrollAnimRight')
      item.classList.remove('done_768','scrollAnimLeft');
      parent.children[1].classList.remove('scrollAnimRight');
      parent.children[1].classList.add('scrollAnimLeft');
    }
    if(blogElem.classList.contains('done_768')){
      blogElem.setAttribute('data-scroll-anim')
      blogElem.classList.add('scrollAnimLadder')
      for (let i = 0; i < blogElemItem.length; i++) {
        blogElemItem[i].removeAttribute('data-scroll-anim');
      }
      animItems = document.querySelectorAll("[data-scroll-anim]");
    }
  }
}
mediaQuery_768.addEventListener('change',handleTabletChange_768)
handleTabletChange_768(mediaQuery_768)
