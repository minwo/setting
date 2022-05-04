'use strict';

document.addEventListener('DOMContentLoaded', function(){
    initUi.setup();

    // mac os 일 경우 html 태그에 mac_os 클래스 붙임
    if (navigator.userAgent.indexOf('Mac OS X') != -1) {
        document.querySelector('html').classList.add('mac_os');
        // $("html").addClass("mac_os");
    }
});

document.addEventListener('scroll', function(){

});

// multi function
const initUi = (function(){
    let _inst;

    function setup(){
        registUI('.ui-tab', uiTab);
        registUI('.ui-accodion', uiAccodion);
        registUI('.ui-swipe', swipeCom);
    }

    function registUI(el, fn, saveData){
        document.querySelectorAll(el).forEach(function(obj, idx){
            _inst = new fn();
            _inst.init(el, obj);
        });
    }

    return{setup:setup}
})();

const getElIndex = (element, range) => {
    if (!!range) return [].indexOf.call(element, range);
    return [].indexOf.call(element.parentNode.children, element);
}

const uiTab = () => {
    let el, btnEl, layerEl, btnLength;
    let i, idx;

    const init = (_el) => {
        el = document.querySelector(_el);
        btnEl = el.querySelectorAll('.btn');
        layerEl = el.querySelectorAll('.tab-layer');

        btnLength = btnEl.length;
        
        bindEvent();
    }
    const bindEvent = () => {
        clickEvent();
    }

    const clickEvent = () => {
        [].forEach.call(btnEl, function(e){
            e.addEventListener('click', function(){
                idx = getElIndex(btnEl, e);
                
                for(i = 0; i < btnLength; i++){
                    btnEl[i].classList.remove('on');
                    layerEl[i].classList.remove('on');
                }
                this.classList.add('on');
                layerEl[idx].classList.add('on');
            });
        });

    }

    return{init:init}
}

const uiAccodion = () => {
    let el, btnEl, layerEl, prevEl;
    let idx, layerLgt, duration, layerHeight, elCheck;

    const init = (_el) => {
        el = document.querySelector(_el);
        btnEl = el.querySelectorAll('.btn');
        layerEl = el.querySelectorAll('.layer');

        layerLgt = layerEl.length;
        duration = 300;

        bindEvent();
    }

    const bindEvent = () => {
        clickEvent();
    }
    
    const clickEvent = () => {
        [].forEach.call(btnEl, (e) => {
            e.addEventListener('click', (event) => {
                prevEl = layerEl[idx];
                event.preventDefault();
                idx = getElIndex(btnEl, e);
                elCheck = prevEl !== layerEl[idx] && prevEl !== undefined;
                
                console.log(window.getComputedStyle(layerEl[idx]).display)
                if(!layerEl[idx].style.height){
                    if(elCheck) remove(prevEl);
                    
                    layerEl[idx].style.display = 'block';
                    layerHeight = layerEl[idx].clientHeight;
                    layerEl[idx].style.height = '0';
                    setTimeout(() => {
                        layerEl[idx].style.height = layerHeight + "px";
                    },);

                } else {
                    remove(layerEl[idx]);
                }

            });
        });

        const remove = (el) => {
            el.style.height = '0';
            setTimeout(() => {
                el.style = null;
            },duration);
        }
    }

    return{init:init}
}

const swipeCom = () => {
    let el, swiper;
    let option, type;

    const init = (_el) => {
        el = document.querySelectorAll(_el);

        bindEvent();
    }

    const bindEvent = () => {
        swipeEach();
    }

    const swipeEach = () => {
        [].forEach.call(el, (e, obj) => {
            type = e.getAttribute('data-swipe');
            console.log(type)
            if ( type === 'sw-type01'){
                console.log(e)
                option = {
                    speed: 400,
                    spaceBetween: 100,
                    slidesPerView: 'auto',
                    freeMode: true,
                    slideToClickedSlide: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                }
            } else if ( type === 'sw-type02'){
                option = {
                    speed: 1400,
                    direction: 'vertical'
                }
            }
            swiper = new Swiper(e, option );
        });
    }
    
    return{init:init}
}

// scrollTop
document.addEventListener("scroll", function(){
    var _scrollTop = window.scrollY || document.documentElement.scrollTop;
});

// intersection observer
const changeNav = (entries, observer) => {
	entries.forEach((entry) => {
        console.log(entry)
		if(entry.isIntersecting && entry.intersectionRatio >= 0.55) {
			entry.target.classList.add('inview');
		} else {
            entry.target.classList.remove('inview');
        }
	});
}

const options = {
	threshold: 0.55
}

const observer = new IntersectionObserver(changeNav, options);

document.addEventListener('DOMContentLoaded', function(){
    // target the elements to be observed
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
        observer.observe(section);
    });
});