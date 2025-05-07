import { useRouter as useNextRouter } from 'next/navigation';
import { startTransition, useCallback, useEffect, useMemo, useState } from 'react';

export type TransitionOptions = {
	onTransitionReady?: () => void;
};

type NavigateOptionsWithTransition = TransitionOptions;

export type TransitionRouter = {
	push: (href: string, options?: NavigateOptionsWithTransition) => void;
	replace: (href: string, options?: NavigateOptionsWithTransition) => void;
	back: (transition: TransitionOptions) => void;
};

export function useTransitionRouter() {
	const router = useNextRouter();
	const [finishViewTransition, setFinishViewTransition] = useState<null | (() => void)>(null);

	const triggerTransition = useCallback((callBack: () => void, { onTransitionReady }: TransitionOptions = {}) => {
		if ('startViewTransition' in document) {
			const transition = document.startViewTransition(
				() =>
					new Promise<void>(resolve => {
						startTransition(() => {
							callBack();

							setFinishViewTransition(() => resolve);
						});
					})
			);

			if (onTransitionReady) {
				transition.ready.then(onTransitionReady);
			}
		} else {
			return callBack();
		}
	}, []);

	const push = useCallback(
		(href: string, { onTransitionReady, ...options }: NavigateOptionsWithTransition = {}) => {
			triggerTransition(() => router.push(href, options), {
				onTransitionReady
			});
		},
		[triggerTransition, router]
	);

	const replace = useCallback(
		(href: string, { onTransitionReady, ...options }: NavigateOptionsWithTransition = {}) => {
			triggerTransition(() => router.replace(href, options), {
				onTransitionReady
			});
		},
		[triggerTransition, router]
	);

	const back = useCallback(
		({ onTransitionReady }: NavigateOptionsWithTransition = {}) => {
			triggerTransition(() => router.back(), {
				onTransitionReady
			});
		},
		[triggerTransition, router]
	);

	useEffect(() => {
		if (finishViewTransition) {
			finishViewTransition();
			setFinishViewTransition(null);
		}
	}, [finishViewTransition]);

	return useMemo<TransitionRouter>(
		() => ({
			...router,
			push,
			replace,
			back
		}),
		[push, replace, back, router]
	);
}
