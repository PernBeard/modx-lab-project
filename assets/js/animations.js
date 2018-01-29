document.addEventListener("DOMContentLoaded", function() {

	var animateHeroSpacer = function() {
		var logo = document.getElementById('logo');
		var spacer = document.getElementById('hero-spacer');

		var logoHeight = logo.offsetHeight;
		var spacerMargin = logoHeight/2;

		spacer.style.top = spacerMargin + "px";
		
		setTimeout(function() {
			spacer.style.top = "24px";
			spacer.style.height = logoHeight - 48 + "px";
		}, 1000);
	};

	var bindHeroSliderControls = function() {
		var	sliderControls = document.getElementById('slider-controls');
		var sliderPrevButton = document.getElementById('slider-prev');
		var sliderNextButton = document.getElementById('slider-next');

		sliderPrevButton.addEventListener('click', preventDefault);
		sliderNextButton.addEventListener('click', preventDefault);

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
		unbindHeroSliderControls();
		
		var	slider = document.getElementById('hero-slider');
		var	sliderControls = document.getElementById('slider-controls');

		var activeSlide = slider.getElementsByClassName('active').item(0);
		var prevSlide = undefined;

		if (activeSlide.previousElementSibling) {
			prevSlide = activeSlide.previousElementSibling;
		}
		else {
			prevSlide = slider.lastElementChild;
		}

		activeSlide.className = "to-right";

		setTimeout(function() {
			prevSlide.className = "active";
		}, 300);

		setTimeout(function() {
			activeSlide.className = "";
			bindHeroSliderControls();
		}, 600);
	};

	var nextSlide = function(e) {
		unbindHeroSliderControls();
		
		var	slider = document.getElementById('hero-slider');
		var	sliderControls = document.getElementById('slider-controls');

		var activeSlide = slider.getElementsByClassName('active').item(0);
		var nextSlide = undefined;

		if (activeSlide.nextElementSibling) {
			nextSlide = activeSlide.nextElementSibling;
		}
		else {
			nextSlide = slider.firstElementChild;
		}

		activeSlide.className = "to-left";

		setTimeout(function() {
			nextSlide.className = "active";
		}, 300);

		setTimeout(function() {
			activeSlide.className = "";
			bindHeroSliderControls();
		}, 600);
	};

	var animateHeroSlider = function() {
		var	sliderContainer = document.getElementById('hero-slider-container');
		var	slider = document.getElementById('hero-slider');
		var	sliderControls = document.getElementById('slider-controls');

		var activeSlide = slider.getElementsByClassName('active').item(0);
		var slideImg = activeSlide.firstChild;

		var newImg = new Image();
		newImg.src = slideImg.src;
		sliderImgHeight = newImg.height;

		sliderContainer.style.height = sliderImgHeight + "px";
		slider.style.height = sliderImgHeight + "px";

		setTimeout(function() {
			slider.style.width = "100%";
		}, 1500);

		setTimeout(function() {
			sliderControls.style.opacity = 1;
		}, 2000);
	};

	var animatePaperBirds = function() {
		var leftBird = document.getElementById('left-bird');
		var rightBird = document.getElementById('right-bird');

		var leftBirdXBase = leftBird.offsetLeft;
		var leftBirdYBase = leftBird.offsetTop;
		var rightBirdXBase = rightBird.offsetLeft;
		var rightBirdYBase = rightBird.offsetTop;

		setTimeout(function() {
			leftBird.style.opacity = 1;
			rightBird.style.opacity = 1;
			flutter(leftBird, leftBirdXBase, leftBirdYBase, 2, 10);
			flutter(rightBird, rightBirdXBase, rightBirdYBase, 2, 10);
		}, 2500);

	};

	var flutter = function(bird, birdXBase, birdYBase, xDeltaLimit, yDeltaLimit) {
		var deltaX = randomFlutter(xDeltaLimit * -1, xDeltaLimit);
		var deltaY = randomFlutter(yDeltaLimit * -1, yDeltaLimit);

		var newX = birdXBase + deltaX;
		var newY = birdYBase + deltaY;

		bird.style.top = newY + "px";
		bird.style.left = newX + "px";

		setTimeout(function() {
			flutter(bird, birdXBase, birdYBase, xDeltaLimit, yDeltaLimit);
		}, 1000);
	};

	var randomFlutter = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	
	var init = function() {
		animateHeroSpacer();
		bindHeroSliderControls();
		animateHeroSlider();
		animatePaperBirds();
	};

	init();

});