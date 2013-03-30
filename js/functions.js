// mYm Functions v 1.5 - brent@mimoymima.com
// last edited: Nov 27, 2011


// fix for ipad resizing content on orientation change by Jeremy Keith
// useful for making responsive sites, if your site isn't responsive you can remove this bit of code
if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
var viewportmeta = document.querySelector('meta[name="viewport"]');
if (viewportmeta) {
    viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
    document.body.addEventListener('gesturestart', function () {
        viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
    }, false);
	}
}


// DOCUMENT READY FUNCTION: uses noConflict to work with other libraries
jQuery(document).ready(function($) {

//  // site preloader -- also uncomment the div in the header and the css style for #preloader
//  $(window).load(function(){
//  	$('#preloader').fadeOut('slow',function(){$(this).remove();});
//  });
	
// //-----Select Linker -- To use, add the class LinkSelect to your form -- by mimoYmima.com
// 	$('.link-select select').change(function(){ 
// 		var LinkTo = $('.link-select select').val();
// 		top.location.href = LinkTo;
// 	});

//-----Show and Hide Stuff
	$(".toggle")
		.addClass('make-link') // make headings look like links
		.addClass('header-hidden')
		.click(function(){
	        var $this = $(this);
	        if( $this.is('.header-shown') ) {
	                $this.next().slideToggle('normal');
	                $this.removeClass('header-shown');
	                $this.addClass('header-hidden');
	        }
	        else {
	                $this.next().slideToggle('normal');
	                $this.removeClass('header-hidden');
	                $this.addClass('header-shown');
	        }
	        return false;
	});


//-----Make a link with the class of popup open in a new window
	$('.popup').attr('target', '_blank');
	


//::: Nav Stuff ::::::::::::::::::::::::::::::::::::::::::::::

	// got to get this js hooked up properly

	var navMenu = $('.nav-menu'),
		navLinks = $('.nav-links'),
		iconMenu = $('.icon-menu'),
		iconLinks = $('.icon-links');

	iconMenu.add(iconLinks).on('click', function (e) {
		var target = $(this);

		// show and hide for the MENU
		if (target.is(iconMenu) && navMenu.hasClass('expanded') === true) {
			navMenu.slideUp().removeClass('expanded');
			iconMenu.removeClass('active');
		}
		else if (target.is(iconMenu) && navMenu.hasClass('expanded') === false) {
			iconMenu.addClass('active');
			iconLinks.removeClass('active');
			navLinks.removeClass('expanded').slideUp(function () {
				navMenu.slideDown().addClass('expanded');
			});
		}

		// show and hide for the LINKS
		if (target.is(iconLinks) && navLinks.hasClass('expanded') === true) {
			navLinks.slideUp().removeClass('expanded');
			iconLinks.removeClass('active');
		}
		else if (target.is(iconLinks) && navLinks.hasClass('expanded') === false) {
			iconLinks.addClass('active');
			iconMenu.removeClass('active');
			navMenu.removeClass('expanded').slideUp(function () {
				navLinks.slideDown().addClass('expanded');
			});
		}

	});

	//dropdown navigation
	var menuItems = $('.nav-menu > ul > li'),
		mq = $('.mq'),
		doDesktopNavigation,
		doMobileNavigation,
		inMobile = undefined;

	//detect submenus and add arrow
	menuItems.each(function () {
		var el = $(this),
			arrow = $('<span>').addClass('toughicon-arrow-down');
		if (el.find('.subnav').length > 0)
			el.children('a').append(arrow);
	});


	doDesktopNavigation = function () {
		// console.log('desktop');
		//remove previous events
		menuItems.off('click.nav');
		menuItems.on('mouseenter.nav mouseleave.nav', function (e) {
			if (e.type === 'mouseenter')
				$(this).addClass('active').find('.subnav').show();
			if (e.type === 'mouseleave')
				$(this).removeClass('active').find('.subnav').hide();
		});
	};

	doMobileNavigation = function () {
		// console.log('mobile');
		menuItems.off('mouseenter.nav mouseleave.nav');
		menuItems.on('click.nav', function () {
			var el = $(this);
			el.toggleClass('active');
			el.find('.subnav').slideToggle();

		});
	};

	$(window).on('resize', function () {
		//mobile
		if (mq.width() === 123) {
			if (inMobile === true)
				return;
			else
				inMobile = true;
			doMobileNavigation();
		}

		//desktop
		if (mq.width() === 0) {
			if (inMobile === false)
				return;
			else {
				inMobile = false;
				doDesktopNavigation();
			}
		}
	});

	$(window).resize();
});




	
});//<--- this is the end of the document ready function don't delete it

