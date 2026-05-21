<script lang="ts">
	let { data } = $props();
	let Content = $derived(data.content);
	let name = $derived(data.itemData?.label ?? '???');
	let section = $derived(data.section?.heading ?? '???');
</script>

<svelte:head>
	<title>{name} | Business Studies</title>
</svelte:head>

<main class="min-h-screen bg-background text-foreground">
	<div class="mx-auto w-[82%] max-w-6xl py-16">
		<div class="prose max-w-none dark:prose-invert">
			<p class="mb-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
				{section}
			</p>
			<h1>{name}</h1>
			<Content />
		</div>
	</div>
</main>
