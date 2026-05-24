import type { Course } from '$lib/types.js';
import { error } from '@sveltejs/kit';

export const prerender = true;

export function entries() {
	const modules = import.meta.glob('$lib/content/*/course.json', { eager: true });
	const routes = [];
	for (const m of Object.values(modules)) {
		const course = (m as any).default;
		for (const topic of course.topics) {
			for (const section of topic.sections) {
				for (const item of section.items) {
					routes.push({ course: course.slug, topic: topic.slug, slug: item.slug });
				}
			}
		}
	}
	return routes;
}

export async function load({ params }) {
	try {
		const page = await import(`$lib/content/${params.course}/${params.topic}/${params.slug}.md`);
		const courseData = await import(`$lib/content/${params.course}/course.json`);

		const course = courseData.default as Course;
		let item = null;
		let sec = null;
		for (const section of course.topics.find((t) => t.slug === params.topic)?.sections ?? []) {
			const found = section.items.find((i) => i.slug === params.slug);
			if (found) {
				item = found;
				sec = section;
				break;
			}
		}

		return {
			content: page.default,
			metadata: page.metadata, // frontmatter
			itemData: item,
			section: sec
		};
	} catch {
		error(404, 'Page not found');
	}
}
