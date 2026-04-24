import { BackButton } from '@/components/BackButton';

export default function Static() {
	return (
		<div className="flex flex-col items-center justify-center mt-4 relative">
			<BackButton />

			<h2 className="text-xl font-bold">Static page</h2>

			<p className="p-4 m-4 md:m-16 tracking-wide">
				This is a <b>static</b> page that demonstrates the view transition when navigating to a page without any asynchronous data fetching. The view transition will work smoothly, providing a seamless user experience even when there is no delay in loading the content.
			</p>
		</div>
	);
}
