'use client';

import { useEffect, useState } from 'react';
import { useRouter as useNextRouter } from 'next/navigation';
import type { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

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
	const [finishViewTransition, setFinishViewTransition] = useState<null | (() => void)>(null);

	function triggerTransition(navigate: () => void, { onTransition }: TransitionOptions = {}): void {
		if ('startViewTransition' in document) {
			const transition = document.startViewTransition();

			transition.ready.then(() => {
				if (onTransition) {
					onTransition();
				}

				navigate();
			});
		} else {
			navigate();
		}
	}
	function push(href: string, { onTransition, ...options }: TransitionOptions = {}): void {
		triggerTransition(() => router.push(href, options), {
			onTransition
		});
	}

	function replace(href: string, { onTransition, ...options }: TransitionOptions = {}): void {
		triggerTransition(() => router.replace(href, options), {
			onTransition
		});
	}

	function back({ onTransition }: TransitionOptions = {}): void {
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
