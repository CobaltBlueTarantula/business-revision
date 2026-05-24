export const prerender = true;

export function entries() {
	const modules = import.meta.glob('$lib/content/*/course.json', { eager: true });
	return Object.values(modules).map((m) => ({
		course: (m as any).default.slug
	}));
}

export async function load({ params }) {
	const key = decodeURIComponent(params.course);

	let json = null;
	try {
		const data = await import(`$lib/content/${key}/course.json`);
		json = data.default;
	} catch {
		json = null;
	}

	return {
		course: json
	};
}
