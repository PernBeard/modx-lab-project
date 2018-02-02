document.addEventListener("DOMContentLoaded", function() {

	var leftTimeout, rightTimeout;

	var animateHeroSpacer = function() {
		var logo = document.getElementById('logo');
		var spacer = document.getElementById('hero-spacer');

		// center the spacer vertically
		var logoHeight = logo.offsetHeight;
		var spacerMargin = logoHeight/2;

		spacer.style.top = spacerMargin + "px";
		
		setTimeout(function() {
			// increase height while moving element upward to give appearance it is growing from the center out
			$(spacer).animate({'top': '24px', 'height': logoHeight - 48 + "px"});
		}, 1000); // wait a second before beginning animations on the screen
	};

	var bindHeroSliderControls = function() {
		var	sliderControls = document.getElementById('slider-controls');
		var sliderPrevButton = document.getElementById('slider-prev');
		var sliderNextButton = document.getElementById('slider-next');

		// separating preventDefault from slider events
		sliderPrevButton.addEventListener('click', preventDefault);
		sliderNextButton.addEventListener('click', preventDefault);

		// we will be unbinding these events to prevent spam clicking
		sliderPrevButton.addEventListener('click', previousSlide);
		sliderNextButton.addEventListener('click', nextSlide);
	};

	var preventDefault = function(e) {
		e.preventDefault();
	}

	var unbindHeroSliderControls = function() {
		var sliderPrevButton = document.getElementById('slider-prev');
		var sliderNextButton = document.getElementById('slider-next');

		sliderPrevButton.removeEventListener('click', previousSlide);
		sliderNextButton.removeEventListener('click', nextSlide);
	};

	var previousSlide = function(e) {
		// unbind slider events to prevent spam clicking
		unbindHeroSliderControls();
		
		var	slider = document.getElementById('hero-slider');
		var	sliderControls = document.getElementById('slider-controls');

		var activeSlide = slider.getElementsByClassName('active').item(0);
		var prevSlide = undefined;

		// find previous slide
		if (activeSlide.previousElementSibling) {
			// active slide has a sibling slide before it
			prevSlide = activeSlide.previousElementSibling;
		}
		else {
			// if there is no sibling side before, wrap to last slide
			prevSlide = slider.lastElementChild;
		}

		// series of animations to simulate keyframes
		$(activeSlide).animate({'left': '100%', 'opacity': 0}); // slide to the right
		$(prevSlide).css({'left': '30px', 'opacity': 0}); // prepare previous slide

		setTimeout(function() {
			$(prevSlide).animate({'left': '30px', 'opacity': 1}); // redundant positioning? fade in
			prevSlide.className = "active"; // should not affect animation
		}, 300);

		setTimeout(function() {
			// reset original active slide
			activeSlide.className = "";
			$(activeSlide).css({'left': '', 'opacity': ''});

			// rebind slider controls
			bindHeroSliderControls();
		}, 600);
	};

	var nextSlide = function(e) {
		// unbind slider events to prevent spam clicking
		unbindHeroSliderControls();
		
		var	slider = document.getElementById('hero-slider');
		var	sliderControls = document.getElementById('slider-controls');

		var activeSlide = slider.getElementsByClassName('active').item(0);
		var nextSlide = undefined;

		// find next slide
		if (activeSlide.nextElementSibling) {
			// active slide has a sibling slide after it
			nextSlide = activeSlide.nextElementSibling;
		}
		else {
			// if there is no sibling side before, wrap to first slide
			nextSlide = slider.firstElementChild;
		}

		// series of animations to simulate keyframes
		$(activeSlide).animate({'left': '-100%', 'opacity': 0}); // slide to the left
		$(nextSlide).css({'left': '30px', 'opacity': 0}); // prepare previous slide

		setTimeout(function() {
			$(nextSlide).animate({'left': '30px', 'opacity': 1}); // redundant positioning? fade in
			nextSlide.className = "active"; // should not affect animation
		}, 300);

		setTimeout(function() {
			// reset original active slide
			activeSlide.className = "";
			$(activeSlide).css({'left': '', 'opacity': ''});

			// rebind slider controls
			bindHeroSliderControls();
		}, 600);
	};

	var animateHeroSlider = function() {
		var	sliderContainer = document.getElementById('hero-slider-container');
		var	slider = document.getElementById('hero-slider');
		var	sliderControls = document.getElementById('slider-controls');

		var firstSlide = slider.firstElementChild;
		var slideImg = firstSlide.firstElementChild;

		// get height of first slide image even when not rendered on screen
		var tempImg = document.createElement('img');
		tempImg.src = slideImg.src;

		tempImg.onload = function(){
			var sliderImgHeight = tempImg.height;
			sliderContainer.style.height = sliderImgHeight + "px";
			slider.style.height = sliderImgHeight + "px";

			// animate first slide coming in from left
			setTimeout(function() {
				$(firstSlide).css({'left': '-100%', 'opacity': 0}).animate({'left': '30px', 'opacity': 1});
			}, 1500); // show animation after hero spacer animates

			// once first slide is in place, show controls
			setTimeout(function() {
				$(sliderControls).animate({'opacity': 1});
				$(firstSlide).addClass('active');
			}, 2000);
		}
	};

	var animatePaperBirds = function() {
		var leftBird = document.getElementById('left-bird');
		var rightBird = document.getElementById('right-bird');

		var leftBirdXBase = leftBird.offsetLeft;
		var leftBirdYBase = leftBird.offsetTop;
		var rightBirdXBase = rightBird.offsetLeft;
		var rightBirdYBase = rightBird.offsetTop;

		// show paper birds and then let them 'flutter'
		setTimeout(function() {
			$(leftBird).animate({'opacity': 1});
			$(rightBird).animate({'opacity': 1});
			
			flutter(leftBird, leftBirdXBase, leftBirdYBase, 2, 10);
			flutter(rightBird, rightBirdXBase, rightBirdYBase, 2, 10);
		}, 2500); // fade in birds with slider controls

	};

	var flutter = function(bird, birdXBase, birdYBase, xDeltaLimit, yDeltaLimit) {
		/*
		 *  Using a base X and Y so element can't fly off into the nether
         *  Generate number within range of base +/- delta and animate bird
         *  This is slightly wonky, not production ready but just for fun
		 */
		
		var deltaX = randomFlutter(xDeltaLimit * -1, xDeltaLimit);
		var deltaY = randomFlutter(yDeltaLimit * -1, yDeltaLimit);

		var newX = birdXBase + deltaX;
		var newY = birdYBase + deltaY;

		$(bird).animate({'top': newY + "px", 'left': newX + "px"}, 1000, 'linear');

		// could clean this up by passing timeout as argument
		if ($(bird).attr('id') == "left-bird") {
			// register timeout event for canceling and resetting later
			leftTimeout = setTimeout(function() {
				flutter(bird, birdXBase, birdYBase, xDeltaLimit, yDeltaLimit);
			}, 1000); // previous animation should finish before new flutter animation begins
		}
		else {
			// register timeout event for canceling and resetting later
			rightTimeout = setTimeout(function() {
				flutter(bird, birdXBase, birdYBase, xDeltaLimit, yDeltaLimit);
			}, 1000); // previous animation should finish before new flutter animation begins
		}
	};

	var randomFlutter = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	var handleWindowResize = function() {
		$(window).resize(function() {
			var width = $("#event-cta-container").outerWidth();
			var leftWidth = $("#left-bird").width();
			var rightWidth = $("#left-bird").width();
			var leftBirdLeft = (-1 * (leftWidth * 0.8));
			var rightBirdLeft = (width - (rightWidth * 0.2));

			// stop bird animations
			clearTimeout(leftTimeout);
			clearTimeout(rightTimeout);

			// reset bird position as best as possible
			$("#left-bird").css({'left': leftBirdLeft + "px", 'top': '-20px'});
			$("#right-bird").css({'left': rightBirdLeft + "px", 'top': '-10px'});

			// restart fluttering
			leftTimeout = setTimeout(function() {
				flutter($("#left-bird").get(0), leftBirdLeft, -20, 2, 10);
			}, 1000);

			rightTimeout = setTimeout(function() {
				flutter($("#right-bird").get(0), rightBirdLeft, -10, 2, 10);
			}, 1000);
		});
	};
	
	var init = function() {
		animateHeroSpacer();
		bindHeroSliderControls();
		animateHeroSlider();
		animatePaperBirds();
		handleWindowResize();
	};

	init();

});