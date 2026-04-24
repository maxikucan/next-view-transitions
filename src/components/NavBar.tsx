import { Link } from './Link';

const navItems = [
	{ path: '/', name: 'Home' },
	{ path: '/static', name: 'Static' },
	{ path: '/dynamic', name: 'Dynamic' }
];

export function NavBar() {
	return (
		<nav>
			<ul className="flex items-center gap-4 p-4 uppercase tracking-wide">
				{navItems.map(item => (
					<li key={item.name}>
						<Link href={item.path}>{item.name}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
