<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';

	import topics from '$lib/content/topics.json';
</script>

<main class="min-h-screen bg-background text-foreground">
	<div class="mx-auto w-[82%] max-w-6xl py-16">
		<!-- Page header -->
		<div class="mb-12">
			<p class="mb-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
				NSW Preliminary · Business Studies
			</p>
			<h1 class="text-3xl font-semibold tracking-tight">Course Revision</h1>
			<p class="mt-2 text-muted-foreground">Select a subtopic to begin studying</p>
		</div>

		<!-- topic columns -->
		<div class="grid grid-cols-3 items-start gap-10">
			{#each topics as topic (topic.title)}
				{@render topicColumn(topic)}
			{/each}
		</div>
	</div>
</main>

{#snippet topicColumn(topic: any)}
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

{#snippet topicSection(topic: any, section: any, i: number)}
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

	{#if i < topic.sections.length - 1}
		<Separator class="mb-5 opacity-40" />
	{/if}
{/snippet}

{#snippet sectionItem(topic: any, item: any)}
	<a
		href="/topic/{topic.number}/{item.slug}"
		class="group flex items-start gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
	>
		<span
			class="mt-1.25 h-1.5 w-1.5 shrink-0 rounded-full opacity-50 transition-opacity group-hover:opacity-100 {topic.color}"
			style="background: currentColor;"
		></span>
		{item.label}
	</a>
{/snippet}
