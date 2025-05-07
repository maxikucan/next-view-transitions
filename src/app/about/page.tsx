import { BackButton } from '@/components/BackButton';

export default function About() {
	return (
		<div className="flex flex-col items-center justify-center mt-4 relative">
			<BackButton />

			<h2>About page</h2>

			<p className="p-4 mt-8">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi dolorem obcaecati dolorum voluptas neque nemo perferendis non sunt quasi?
				Velit, ipsa atque blanditiis, beatae reprehenderit nesciunt est molestiae porro harum voluptatibus laboriosam sed adipisci! Facere cumque ab
				nesciunt, pariatur ea, harum repellendus officiis vero, eveniet voluptatem voluptatum repellat mollitia dicta!
			</p>
		</div>
	);
}
