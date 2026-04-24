'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type ViewTransitionsContextType = {
	setFinishViewTransition: (fn: () => void) => void;
};

const ViewTransitionsContext = createContext<ViewTransitionsContextType>({
	setFinishViewTransition: () => {}
});

export function ViewTransitionsProvider({ children }: { children: React.ReactNode }) {
	const finishViewTransition = useRef<(() => void) | null>(null);
	const pathname = usePathname();

	useEffect(() => {
		if (finishViewTransition.current) {
			finishViewTransition.current();
			finishViewTransition.current = null;
		}
	}, [pathname]);

	return (
		<ViewTransitionsContext.Provider
			value={{ setFinishViewTransition: fn => { finishViewTransition.current = fn; } }}
		>
			{children}
		</ViewTransitionsContext.Provider>
	);
}

export function useViewTransitionsContext() {
	return useContext(ViewTransitionsContext);
}
