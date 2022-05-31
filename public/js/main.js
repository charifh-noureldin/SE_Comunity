(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	var burgerMenu = function() {

		$('.js-colorlib-nav-toggle').on('click', function(event) {
			event.preventDefault();
			var $this = $(this);
			if( $('body').hasClass('menu-show') ) {
				$('body').removeClass('menu-show');
				$('#colorlib-main-nav > .js-colorlib-nav-toggle').removeClass('show');
			} else {
				$('body').addClass('menu-show');
				setTimeout(function(){
					$('#colorlib-main-nav > .js-colorlib-nav-toggle').addClass('show');
				}, 900);
			}
		})
	};
	burgerMenu();


})(jQuery);


const trashcan = document.querySelector('a.delete');
trashcan.addEventListener('click', (e) => {
  const endpoint = `/orders/${trashcan.dataset.doc}`;
  fetch(endpoint, {
	method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => window.location.href = data.redirect)
  .catch(err => console.log(err));
});

  const editPen = document.querySelector('#edit');
  editPen.addEventListener('click', (e) => {
    const paragraph = document.querySelector('#paragraph');
    paragraph.contentEditable = true;
    paragraph.focus();
  });
