'use client';

import { useRouter as useNextRouter } from 'next/navigation';
import type { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useViewTransitionsContext } from '@/contexts/ViewTransitionsContext';

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
	const { setFinishViewTransition } = useViewTransitionsContext();

	function triggerTransition(navigate: () => void, { onTransition }: TransitionOptions = {}): void {
		if (!('startViewTransition' in document)) {
			navigate();
			return;
		}

		const transition = document.startViewTransition(async () => {
			navigate();
			await new Promise<void>(resolve => {
				setFinishViewTransition(resolve);
			});
		});

		transition.ready.then(() => {
			onTransition?.();
		});
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

	return { ...router, push, replace, back };
}
