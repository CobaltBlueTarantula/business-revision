import type { Course } from '$lib/types.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const page = await import(`$lib/content/${params.course}/${params.topic}/${params.slug}.md`);
		const courseData = await import(`$lib/content/${params.course}.json`);

		const course = courseData.default as Course;
		let item = null;
		for (const section of course.topics.find((t) => t.slug === params.topic)?.sections ?? []) {
			const found = section.items.find((i) => i.slug === params.slug);
			if (found) {
				item = found;
				break;
			}
		}

		return {
			content: page.default,
			metadata: page.metadata, // frontmatter
			itemData: item
		};
	} catch {
		error(404, 'Page not found');
	}
}
