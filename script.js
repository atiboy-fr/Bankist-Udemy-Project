'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
const nav = document.querySelector('.nav')
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section')

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// const message = document.createElement('div')
// message.classList.add('cookie-message');
// message.innerHTML = `We use cookies for improved functionalities and analytics, <button class='btn btn--close--cookie'> Got it </button>`

// header.append(message)



// document.querySelector('.btn--close--cookie').addEventListener('click', function() {
//   message.remove()
// })

// message.style.backgroundColor = '#37383d'
// message.style.width = '110%'

// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e) {

//SCROLLING
  //Automatic Way
section1.scrollIntoView({behavior: "smooth"})

  //Manual way of doing it
// const s1coords = section1.getBoundingClientRect();
// console.log(s1coords)
//   window.scrollTo({
//     left: s1coords.left + window.scrollX, 
//     top: s1coords.top + window.scrollY,
//     behavior: 'smooth',
// })


})


document.querySelectorAll('.nav__link').forEach(function(el) {
  el.addEventListener('click', function(e) {
    e.preventDefault()
    const id = this.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  })
})

//using event delegation
// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   e.preventDefault()

//   if(e.target.class.contains('nav__link')) {
//     const id = e.target.getAttribute('href')
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   }
// })




tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');

  if(!clicked) return

  tabs.forEach((t) => t.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  tabsContent.forEach((c) => c.classList.remove('operations__content--active'))

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

const handleHover = function(e, opacity) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach((el) => {
      if(el !== link) el.style.opacity = opacity
    })
    logo.style.opacity = opacity
  }
}
nav.addEventListener('mouseover', function(e) {
  handleHover(e, 0.5)
})

nav.addEventListener('mouseout', function(e) {
  handleHover(e, 1)
})

// const initialCoords = section1.getBoundingClientRect()

// window.addEventListener('scroll', function() {
//   if(window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky')
//   } else {
//     nav.classList.remove('sticky')
//   }
// })


//Intersection Observer Api
// const obsCallBack = function(entries, observer) {
//   entries.forEach((en) => console.log(en))
//   console.log(observer)
// }

// const obsOption = {
//   root: null,
//   threshold: 0.1,
// }

// const observer = new IntersectionObserver(obsCallBack, obsOption)
// observer.observe(section1)

//

const navHeight = nav.getBoundingClientRect().height
const stickyNav = function(entries) {
   const [entry] = entries


   if(!entry.isIntersecting) {
    nav.classList.add('sticky')
   } else {
    nav.classList.remove('sticky')
   }
  }
  
  
  const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  })
  headerObserver.observe(header)
  

const revealSection= function(entries, observer) {
  const [entry] = entries
  
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
})

allSections.forEach((section) => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
})

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach((img) => imgObserver.observe(img));


const sliderAnimation = function () {
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots')

// slider.style.transform = 'scale(0.4)'
// slider.style.overflow = 'visible'
// slides.forEach((s, i) => {
//   s.style.transform = `translateX(${100 * i}%)`
// })

const createDots = function() {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML("beforeend", `<button class='dots__dot' data-slide='${i}'></button>`)
  })
}

createDots()

const activateDot = function(slide) {
  document.querySelectorAll('.dots__dot').forEach((d) => d.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide = '${slide}']`).classList.add('dots__dot--active');
}
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')

let curSlide = 0
const maxSlide = slides.length - 1

const goToSlide = function(slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`
  })
  activateDot(slide)
}

goToSlide(0)

const nextSlide = function() {
  if(curSlide === maxSlide) curSlide = 0
  else curSlide++  
  console.log(curSlide)
  goToSlide(curSlide)
}

const prevSlide = function() {
  if(curSlide === 0) {
    curSlide = maxSlide
  } else {
    curSlide--
  }
  console.log(curSlide)
  goToSlide(curSlide)
}

btnRight.addEventListener('click', nextSlide)

btnLeft.addEventListener('click', prevSlide)

document.addEventListener('keydown', function(e) {
  if(e.key === 'ArrowRight') nextSlide();
  else if (e.key === 'ArrowLeft') prevSlide();
})

dotContainer.addEventListener('click', function(e) {
  if(e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide
    goToSlide(slide)
    activateDot(slide)
  }
  
})
}
sliderAnimation()

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () => `rgb(${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)})`
// console.log(randomColor())

// document.querySelector('.nav__link').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
// })

// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
// })

// document.querySelector('.nav').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
// })