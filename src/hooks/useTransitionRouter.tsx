import { startTransition, useEffect, useState } from 'react';
import { useRouter as useNextRouter } from 'next/navigation';

export type TransitionOptions = {
	onTransition?: () => void;
};

export type TransitionRouter = {
	push: (href: string, options?: TransitionOptions) => void;
	replace: (href: string, options?: TransitionOptions) => void;
	back: (transition: TransitionOptions) => void;
};

export function useTransitionRouter() {
	const router = useNextRouter();
	const [finishViewTransition, setFinishViewTransition] = useState<null | (() => void)>(null);

	function triggerTransition(callBack: () => void, { onTransition }: TransitionOptions = {}) {
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
