<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import type { Topic, Section, Item, Course } from '$lib/types';
	import { resolve } from '$app/paths';

	let { data } = $props();
	const course = $derived(data.course as Course);
</script>

<svelte:head>
	<title>{course.name} | Business Studies</title>
</svelte:head>

<main class="min-h-screen bg-background text-foreground">
	<div class="mx-auto w-[82%] max-w-6xl py-16">
		<!-- Page header -->
		<div class="mb-12">
			<p class="mb-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
				Business Studies Course Revision
			</p>
			<h1 class="text-3xl font-semibold tracking-tight">{course?.name ?? 'Course Not Found'}</h1>
			<p class="mt-2 text-muted-foreground">
				{course ? 'Select a subtopic to revise' : ''}
			</p>
		</div>

		<!-- topic columns -->
		{#if course}
			<div class="grid grid-cols-3 items-start gap-10">
				{#each course.topics as topic (topic.title)}
					{@render topicColumn(topic)}
				{/each}
			</div>
		{/if}
	</div>
</main>

{#snippet topicColumn(topic: Topic)}
	<div class="flex flex-col">
		<!-- Topic header -->
		<div class="mb-6">
			<span class="text-xs font-semibold tracking-widest {topic.color} uppercase">
				Topic {topic.number}
			</span>
			<h2 class="mt-1 text-base leading-snug font-semibold">{topic.title}</h2>
		</div>

		<!-- Sections -->
		{#each topic.sections as section, i (section.heading)}
			{@render topicSection(topic, section, i)}
		{/each}
	</div>
{/snippet}

{#snippet topicSection(topic: Topic, section: Section, index: number)}
	<div class="mb-5">
		<p class="mb-2 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
			{section.heading}
		</p>
		<div class="flex flex-col gap-0.5">
			{#each section.items as item (item.slug)}
				{@render sectionItem(topic, item)}
			{/each}
		</div>
	</div>

	{#if index < topic.sections.length - 1}
		<Separator class="mb-5 opacity-40" />
	{/if}
{/snippet}

{#snippet sectionItem(topic: Topic, item: Item)}
	<a
		class="group flex items-start gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
		href={resolve('/[course]/[topic]/[slug]', {
			course: course.slug,
			topic: topic.slug,
			slug: item.slug
		})}
	>
		<span
			class="mt-1.25 h-1.5 w-1.5 shrink-0 rounded-full opacity-50 transition-opacity group-hover:opacity-100 {topic.color}"
			style="background: currentColor;"
		></span>
		{item.label}
	</a>
{/snippet}
