import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const page = await import(`$lib/content/${params.course}/${params.topic}/${params.slug}.md`);

		return {
			content: page.default,
			metadata: page.metadata // frontmatter
		};
	} catch {
		error(404, 'Topic not found');
	}
}
