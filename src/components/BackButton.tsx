'use client';

import { useTransitionRouter } from '@/hooks/useTransitionRouter';
import { slideOut } from '@/utils/pageAnimations';

export function BackButton() {
	const router = useTransitionRouter();

	return (
		<button
			className="text-blue-500 cursor-pointer absolute left-4 top-0"
			onClick={e => {
				e.preventDefault();

				router.back({ onTransitionReady: slideOut });
			}}>
			Back
		</button>
	);
}
