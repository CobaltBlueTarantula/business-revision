<script lang="ts">
	import './layout.css';
	import { Separator } from '$lib/components/ui/separator';
	import Book from '@tabler/icons-svelte/icons/book';
	import CourseDropdown from '$lib/components/CourseDropdown.svelte';
	import { goto, onNavigate } from '$app/navigation';
	import type { Course } from '$lib/types';
	import Button from '$lib/components/ui/button/button.svelte';
	import FileText from '@tabler/icons-svelte/icons/file-text';

	import { base } from '$app/paths';

	const modules = import.meta.glob('$lib/content/*.json', { eager: true });
	const courses: Course[] = Object.entries(modules).map(
		([path, module]) => (module as any).default as Course
	);

	let { children } = $props();
	let selected = $state(-1);

	onNavigate((nav) => {
		const course = courses.find((c) => nav.to?.url.pathname.includes(c.slug));

		if (course) {
			selected = courses.indexOf(course);
		} else selected = -1;
	});
</script>

<svelte:head>
	<link rel="icon" href="{base}/favicon.svg" />
</svelte:head>

<!-- Navbar -->
<header
	class="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-sm"
>
	<div class="flex h-12 items-center gap-4 px-6">
		<!-- Site title -->
		<a href={base} class="flex shrink-0 items-center gap-2">
			<Book class="h-4 w-4 text-muted-foreground" />
			<span class="text-sm font-semibold tracking-tight">BusinessRevision</span>
		</a>

		<Separator orientation="vertical" class="h-5 opacity-50" />

		<!-- Course dropdown -->
		<nav class="flex items-center gap-1">
			<CourseDropdown
				{courses}
				{selected}
				onSelect={(i) => {
					selected = i;
					goto(`${base}/${courses[i].slug}`);
				}}
			/>
		</nav>

		<!-- Syllabus button -->
		<Button
			variant="secondary"
			size="sm"
			class="h-8 gap-1.5 text-sm font-normal text-muted-foreground hover:text-foreground"
			href="{base}/files/business-studies-st6-syl.pdf"
			target="_blank"
		>
			<FileText class="h-3.5 w-3.5" />
			Syllabus
		</Button>

		<!-- Spacer -->
		<div class="flex-1"></div>

		<!-- Right-aligned buttons -->
		<div class="flex items-center gap-2">
			<!-- <Button
				variant="ghost"
				size="sm"
				class="h-8 gap-1.5 text-sm font-normal text-muted-foreground hover:text-foreground"
				href="/test2"
			>
				<Trophy class="h-3.5 w-3.5" />
				Test2
			</Button>
			<Separator orientation="vertical" class="h-5 opacity-50" />
			<Button size="sm" class="h-8 text-sm" href="/blue-test">BlueTest</Button> -->
		</div>
	</div>
</header>

<!-- Page content -->
{@render children()}
