'use client';

import { startTransition, useEffect, useState } from 'react';
import { useRouter as useNextRouter } from 'next/navigation';
import type { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { useMediaQuery } from './useMediaQuery';

export type TransitionOptions = {
	onTransition?: () => void;
};

export type TransitionRouter = {
	push: (href: string, options?: TransitionOptions & NavigateOptions) => void;
	replace: (href: string, options?: TransitionOptions & NavigateOptions) => void;
	back: (transition: TransitionOptions) => void;
};

/**
 * A custom hook that wraps the Next.js router with view transitions.
 * It provides a way to trigger view transitions when navigating between pages.
 *
 * @returns {TransitionRouter} - An object containing the router methods with view transitions.
 * @example
 * const { push, replace, back } = useTransitionRouter();
 */
export function useTransitionRouter(): TransitionRouter {
	const router = useNextRouter();
	const isDesktop = useMediaQuery('min.desktop');

	const [finishViewTransition, setFinishViewTransition] = useState<null | (() => void)>(null);

	function triggerTransition(callBack: () => void, { onTransition }: TransitionOptions = {}) {
		if ('startViewTransition' in document && !isDesktop) {
			const transition = document.startViewTransition(
				() =>
					new Promise<void>(resolve => {
						startTransition(() => {
							callBack();

							setFinishViewTransition(() => resolve);
						});
					})
			);

			if (onTransition) {
				transition.ready.then(onTransition);
			}
		} else {
			return callBack();
		}
	}

	function push(href: string, { onTransition, ...options }: TransitionOptions = {}) {
		triggerTransition(() => router.push(href, options), {
			onTransition
		});
	}

	function replace(href: string, { onTransition, ...options }: TransitionOptions = {}) {
		triggerTransition(() => router.replace(href, options), {
			onTransition
		});
	}

	function back({ onTransition }: TransitionOptions = {}) {
		triggerTransition(() => router.back(), {
			onTransition
		});
	}

	useEffect(() => {
		if (finishViewTransition) {
			finishViewTransition();

			setFinishViewTransition(null);
		}
	}, [finishViewTransition]);

	return { ...router, push, replace, back };
}
