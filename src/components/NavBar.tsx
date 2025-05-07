'use client';

import { Link } from './Link';

const navItems = [
	{ path: '/', name: 'Home' },
	{ path: '/about', name: 'About' },
	{ path: '/contact', name: 'Contact' }
];

export function NavBar() {
	return (
		<nav>
			<ul className="flex items-center gap-4">
				{navItems.map(item => (
					<li key={item.name}>
						<Link href={item.path}>{item.name}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
