export async function load({ params }) {
	const key = decodeURIComponent(params.course);

	let json = null;
	try {
		const data = await import(`$lib/content/${key}.json`);
		json = data.default;
	} catch {
		json = null;
	}

	return {
		course: json
	};
}
