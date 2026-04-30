<script>
	import { page } from '$app/state';
</script>

<main class="min-h-screen bg-background text-foreground">
	<div class="mx-auto w-[82%] max-w-6xl py-16">
		<div class="prose max-w-none dark:prose-invert">
			<h1>{page.status}</h1>
			<p>{page.error?.message}</p>
		</div>
	</div>
</main>
