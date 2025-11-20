// Load appropriate video based on screen size
function loadHeroVideo() {
	const video = document.getElementById('hero-video');
	if (!video) return;

	const width = window.innerWidth;
	let videoSrc;

	// Determine which video to load based on screen width
	if (width < 768) {
		// Mobile
		videoSrc = '/videos/SD/tours-bg-mobile.mp4';
	} else if (width < 1024) {
		// Tablet
		videoSrc = '/videos/MD/tours-bg-medium.mp4';
	} else {
		// Desktop
		videoSrc = '/videos/HD/tours-bg-hd.mp4';
	}

	// Create and append source element
	const source = document.createElement('source');
	source.src = videoSrc;
	source.type = 'video/mp4';
	video.appendChild(source);

	// Load the video
	video.load();
}

// Load video immediately
loadHeroVideo();

// Intersection Observer for scroll animations
function initScrollAnimations() {
	// Mobile-friendly observer settings
	const isMobile = window.innerWidth < 768;
	const observerOptions = {
		threshold: isMobile ? 0.05 : 0.1,
		rootMargin: isMobile ? '0px 0px 0px 0px' : '0px 0px -50px 0px'
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
			}
		});
	}, observerOptions);

	// Observe all elements with animation classes
	const animatedElements = document.querySelectorAll(
		'.fade-in, .slide-up, .slide-down'
	);

	animatedElements.forEach((element) => {
		// Check if element is already in viewport on load
		const rect = element.getBoundingClientRect();
		const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

		if (isInViewport) {
			// Element is already visible, add class immediately
			element.classList.add('visible');
		} else {
			// Element not in viewport, observe it
			observer.observe(element);
		}
	});
}

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
	// DOM already loaded
	initScrollAnimations();
}
