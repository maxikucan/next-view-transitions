import { BackButton } from '@/components/BackButton';

export const dynamic = 'force-dynamic';

export default async function Dynamic() {
	// Simulate a delay to demonstrate the view transition with async data fetching
	await new Promise(resolve => setTimeout(resolve, 1500));

	return (
		<div className="flex flex-col items-center justify-center mt-4 relative">
			<BackButton />

			<h2 className="text-xl font-bold">Dynamic page</h2>

			<p className="p-4 m-4 md:m-16 tracking-wide">
				This page simulates a delay to demonstrate the view transition with <b>async data fetching</b>. The view transition will still work smoothly, providing a seamless user experience
				even when there is a delay in loading the content.
			</p>
		</div>
	);
}
