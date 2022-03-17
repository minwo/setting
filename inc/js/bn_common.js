'use strict';

document.addEventListener('DOMContentLoaded', function(){
    initUi.setup();

    // mac os 일 경우 html 태그에 mac_os 클래스 붙임
    if (navigator.userAgent.indexOf('Mac OS X') != -1) {
        $("html").addClass("mac_os");
    }
});

// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

// multi function
let initUi = (function(){
    let _inst;

    function setup(){
        registUI('.ui-tab', uiTab);
        registUI('.ui-accodion', uiAccodion);
    }

    function registUI(el, fn, saveData){
        document.querySelectorAll(el).forEach(function(obj, idx){
            _inst = new fn();
            _inst.init(el, obj);
        });
    }

    return{setup:setup}
})();

function getElIndex(element, range) {
    if (!!range) return [].indexOf.call(element, range);
    return [].indexOf.call(element.parentNode.children, element);
  }

let uiTab = function(){
    let el, btnEl, layerEl, btnLength;
    let i, idx;

    function init(_el){
        el = document.querySelector(_el);
        btnEl = el.querySelectorAll('.btn');
        layerEl = el.querySelectorAll('.tab-layer');

        btnLength = btnEl.length;
        
        bindEvent();
    }

    function bindEvent(){
        clickEvent();
    }

    function clickEvent(){
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

let uiAccodion = function(){
    let el, btnEl, layerEl;
    let i, layerLgt, dStyle;

    const init = (_el) => {
        el = document.querySelector(_el);
        btnEl = el.querySelectorAll('.btn');
        layerEl = el.querySelectorAll('.layer');

        layerLgt = layerEl.length;

        bindEvent();
    }

    const bindEvent = () => {
        clickEvent();
        setEvent();
    }

    const setEvent = () => {
        dStyle = {

        }
    }
    
    const clickEvent = () => {
        [].forEach.call(btnEl, (e) => {
            e.addEventListener('click', (event) => {
                event.preventDefault();

                console.log(133333)
            });
        });

    }

    return{init:init}
}











































