export async function load({ params }) {
	const key = decodeURIComponent(params.course);

	return {
		key: key
	};
}
