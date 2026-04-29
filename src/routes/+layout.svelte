<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Separator } from '$lib/components/ui/separator';
	import Book from '@tabler/icons-svelte/icons/book';
	import CourseDropdown from '$lib/components/CourseDropdown.svelte';
	import { goto, onNavigate } from '$app/navigation';
	import type { Course } from '$lib/types';

	const modules = import.meta.glob('$lib/content/*.json', { eager: true });
	const courses: Course[] = Object.entries(modules).map(
		([path, module]) => (module as any).default as Course
	);

	let { children } = $props();
	let selected = $state(-1);

	onNavigate((nav) => {
		if (nav.to?.route.id === '/') {
			selected = -1;
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Navbar -->
<header
	class="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-sm"
>
	<div class="flex h-12 items-center gap-4 px-6">
		<!-- Site title -->
		<a href="/" class="flex shrink-0 items-center gap-2">
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
					goto(`/${courses[i].slug}`);
				}}
			/>
		</nav>

		<!-- Spacer -->
		<div class="flex-1"></div>

		<!-- Right-aligned buttons -->
		<!-- <div class="flex items-center gap-2">
			<Button
				variant="ghost"
				size="sm"
				class="h-8 gap-1.5 text-sm font-normal text-muted-foreground hover:text-foreground"
				href="/test1"
			>
				<Bolt class="h-3.5 w-3.5" />
				Test1
			</Button>
			<Button
				variant="ghost"
				size="sm"
				class="h-8 gap-1.5 text-sm font-normal text-muted-foreground hover:text-foreground"
				href="/test2"
			>
				<Trophy class="h-3.5 w-3.5" />
				Test2
			</Button>
			<Separator orientation="vertical" class="h-5 opacity-50" />
			<Button size="sm" class="h-8 text-sm" href="/blue-test">BlueTest</Button>
		</div> -->
	</div>
</header>

<!-- Page content -->
{@render children()}
