//(function() {
//	var $ = document.querySelector.bind(document);
//	var $$ = document.querySelectorAll.bind(document);
//	var a = $$('.item');
//	var div = $('#test'), 
//		childrenInput = div.children[1],
//		childrenButton = div.children[2];
//	var	span = $('.span');
//
//	childrenInput.addEventListener('keyup', function (event) {
//		'use strict'
//		console.log(typeof event.target.value, event.target.value.length);
//	} );
//
//	childrenButton.addEventListener('click', (event)=>{ 
//		var value = Object.values(new String(childrenInput.value));
//		res = value.reduce((a, b)=>{return a += +b}, 0);
//		console.log(res);
//		span.innerText = res;
//		});	
//        console.log(childrenInput);
//})();
// var parallax = (function () {
//     var bg = document.querySelector('.hero_bg'),
//         user = document.querySelector('.hero_section'),
//         sectionText = document.querySelector('.hero_user');
    
//     return {
//         move: function (block, windowScroll, strafeAmount) {
//             var strafe = windowScroll / -strafeAmount + '%',
//                 transformString = 'translate3d(0,' + strafe + ', 0)',
//                 style = block.style;
//             style.transform = transformString;
//             style.webkitTransform = transformString;
//         },
//         init: function (wScroll) {
//             this.move(bg, wScroll, 45);
//             this.move(sectionText, wScroll, 20);
//             this.move(user, wScroll, 3);
//         }
//     }
// })();
// window.onscroll = function () {
//     var wScroll = window.pageYOffset;
    
//     parallax.init(wScroll)
// }