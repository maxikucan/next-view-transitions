import { useEffect, useState } from 'react';

export const BREAK_POINTS = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1400
};

export const MEDIA_QUERIES = {
	min: {
		portraitPhone: `(min-width: ${BREAK_POINTS.xs}px)`,
		landscapePhone: `(min-width: ${BREAK_POINTS.sm}px)`,
		tablet: `(min-width: ${BREAK_POINTS.md}px)`,
		desktop: `(min-width: ${BREAK_POINTS.lg}px)`,
		largeDesktop: `(min-width: ${BREAK_POINTS.xl}px)`,
		extraLargeDesktop: `(min-width: ${BREAK_POINTS.xxl}px)`
	},
	max: {
		portraitPhone: `(max-width: ${BREAK_POINTS.sm}px)`,
		landscapePhone: `(max-width: ${BREAK_POINTS.md}px)`,
		tablet: `(max-width: ${BREAK_POINTS.lg}px)`,
		desktop: `(max-width: ${BREAK_POINTS.xl}px)`,
		largeDesktop: `(max-width: ${BREAK_POINTS.xxl}px)`,
		extraLargeDesktop: `(max-width: ${BREAK_POINTS.xxl + 200}px)`
	}
};

type Direction = keyof typeof MEDIA_QUERIES;
type BreakpointName = keyof typeof MEDIA_QUERIES.min;
type MediaQueryKey = `${Direction}.${BreakpointName}`;

/**
 * A custom hook that listens to media query changes and returns a boolean value indicating whether the media query matches.
 * It uses the `window.matchMedia` API to check for media query matches and updates the state accordingly.
 *
 * Direction `max`, it will return `true` if the screen size is less than or equal to the specified breakpoint.
 *
 * Directon `min`, it will return `true` if the screen size is greater than or equal to the specified breakpoint.
 *
 * @param {MediaQueryKey} queryKey - The media query key to listen to. It should be in the format of "direction.breakpointName".
 * @returns {boolean} A boolean value indicating whether the media query matches.
 */
export function useMediaQuery(queryKey: MediaQueryKey): boolean {
	const [matches, setMatches] = useState<boolean>(() => {
		if (typeof window === 'undefined') return false;

		const [dir, key] = queryKey.split('.') as [Direction, BreakpointName];
		return window.matchMedia(MEDIA_QUERIES[dir][key]).matches;
	});

	/**
	 * Listener function to handle media query changes.
	 */
	function listener(event: MediaQueryListEvent) {
		setMatches(event.matches);
	}

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const [dir, key] = queryKey.split('.') as [Direction, BreakpointName];
		const mediaQuery = MEDIA_QUERIES[dir][key];
		const mediaQueryList = window.matchMedia(mediaQuery);

		mediaQueryList.addEventListener('change', listener);

		setMatches(mediaQueryList.matches);

		return () => {
			mediaQueryList.removeEventListener('change', listener);
		};
	}, [queryKey]);

	return matches;
}
