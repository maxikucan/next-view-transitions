'use client';

import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import NextLink, { LinkProps } from 'next/link';

import { useTransitionRouter } from '@/hooks/useTransitionRouter';
import { slideIn } from '@/utils/pageAnimations';

export function Link(props: PropsWithChildren<LinkProps>) {
	const router = useTransitionRouter();
	const pathname = usePathname();

	const { href, replace, children, scroll, ...restProps } = props;

	function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
		// If onClick prop is passed, it is executed
		if (props.onClick) {
			props.onClick(e);
		}

		// Prevent unnecessary navigation. Navigation would trigger an unexpected animation
		if (pathname === href) {
			e.preventDefault();

			return;
		}

		if ('startViewTransition' in document) {
			e.preventDefault();

			const navigate = replace ? router.replace : router.push;
			navigate(href as string, { scroll: scroll, onTransition: slideIn });
		}
	}

	return (
		<NextLink href={href} {...restProps} onClick={onClick}>
			{children}
		</NextLink>
	);
}
