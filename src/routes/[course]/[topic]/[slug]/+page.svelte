<script lang="ts">
	let { data } = $props();
	let Content = $derived(data.content);
</script>

<main class="min-h-screen bg-background text-foreground">
	<div class="mx-auto w-[82%] max-w-6xl py-16">
		<div class="prose max-w-none dark:prose-invert">
			<Content />
		</div>
	</div>
</main>
