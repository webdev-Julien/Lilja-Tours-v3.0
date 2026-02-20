// Intersection Observer for scroll animations
function initScrollAnimations() {
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px 100px 0px'
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


// Form submission handling
function initMultidayForm() {
	const form = document.getElementById('multiday-tour-form');
	const submitButton = document.getElementById('submit-button');
	const formMessage = document.getElementById('form-message');

	if (!form) return;

	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		// Disable submit button
		submitButton.disabled = true;
		submitButton.textContent = 'Sending...';

		// Get form data
		const formData = new FormData(form);
		const interests = [];
		formData.getAll('interests').forEach(interest => interests.push(interest));

		const data = {
			firstName: formData.get('firstName'),
			lastName: formData.get('lastName'),
			email: formData.get('email'),
			phone: formData.get('phone'),
			numPeople: formData.get('numPeople'),
			numChildren: formData.get('numChildren'),
			childrenAges: formData.get('childrenAges') || 'Not provided',
			numDays: formData.get('numDays'),
			travelDates: formData.get('travelDates'),
			interests: interests.join(', ') || 'Not specified',
			accommodationType: formData.get('accommodationType'),
			budgetAmount: formData.get('budgetAmount'),
			budgetCurrency: formData.get('budgetCurrency'),
			details: formData.get('details') || 'No additional details provided'
		};

		// Create form data for PHP endpoint
		const phpFormData = new URLSearchParams();
		Object.keys(data).forEach(key => {
			phpFormData.append(key, data[key]);
		});

		try {
			// Try PHP endpoint
			const response = await fetch('/contact-multiday.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: phpFormData.toString()
			});

			if (response.ok) {
				const result = await response.json();

				if (result.success) {
					// Show success message
					formMessage.textContent = 'Thank you! Your request has been sent successfully. We\'ll get back to you within 24 hours with a personalized itinerary.';
					formMessage.className = 'p-4 rounded-sm bg-green-50 text-green-800 border border-green-200';
					formMessage.classList.remove('hidden');

					// Reset form
					form.reset();

					// Scroll to message
					formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

					// Hide message after 8 seconds
					setTimeout(() => {
						formMessage.classList.add('hidden');
					}, 8000);
				} else {
					throw new Error(result.error || 'Failed to send request');
				}
			} else {
				throw new Error('Server error');
			}
		} catch (error) {
			// Show error message
			formMessage.textContent = 'Sorry, there was an error sending your request. Please try again or contact us directly at julien@lilja-tours.com';
			formMessage.className = 'p-4 rounded-sm bg-red-50 text-red-800 border border-red-200';
			formMessage.classList.remove('hidden');

			// Scroll to message
			formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

			console.error('Form submission error:', error);
		} finally {
			// Re-enable submit button
			submitButton.disabled = false;
			submitButton.textContent = 'Send My Request';
		}
	});
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	initScrollAnimations();
	initMultidayForm();
});
