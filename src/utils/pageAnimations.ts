/**
 * Slide-in animation
 */
export function slideIn() {
	document.documentElement.animate(
		[
			{
				opacity: 1,
				transform: 'translate(0, 0)'
			},
			{
				opacity: 0,
				transform: 'translate(-100%, 0)'
			}
		],
		{
			duration: 400,
			easing: 'ease',
			fill: 'forwards',
			pseudoElement: '::view-transition-old(root)'
		}
	);

	document.documentElement.animate(
		[
			{
				opacity: 0,
				transform: 'translate(100%, 0)'
			},
			{
				opacity: 1,
				transform: 'translate(0, 0)'
			}
		],
		{
			duration: 400,
			easing: 'ease',
			fill: 'forwards',
			pseudoElement: '::view-transition-new(root)'
		}
	);
}

/**
 * Slide-out animation
 */
export function slideOut() {
	document.documentElement.animate(
		[
			{
				opacity: 1,
				transform: 'translate(0, 0)'
			},
			{
				opacity: 0,
				transform: 'translate(100%, 0)'
			}
		],
		{
			duration: 400,
			easing: 'ease',
			fill: 'forwards',
			pseudoElement: '::view-transition-old(root)'
		}
	);

	document.documentElement.animate(
		[
			{
				opacity: 0,
				transform: 'translate(-100%, 0)'
			},
			{
				opacity: 1,
				transform: 'translate(0, 0)'
			}
		],
		{
			duration: 400,
			easing: 'ease',
			fill: 'forwards',
			pseudoElement: '::view-transition-new(root)'
		}
	);
}
