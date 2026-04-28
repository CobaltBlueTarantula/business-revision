<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import ChevronDown from '@tabler/icons-svelte/icons/chevron-down';
	import Button from './ui/button/button.svelte';
	import type { Course } from '$lib/types';

	let { courses, onSelect }: { courses: Course[]; onSelect: (index: number) => void } = $props();

	let selectedCourseIndex = $state(0);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="secondary"
				size="sm"
				class="h-8 min-w-40 justify-between px-2.5 text-sm font-normal text-muted-foreground hover:text-foreground"
			>
				<span>{courses[selectedCourseIndex].name}</span>
				<ChevronDown class="h-3.5 w-3.5 shrink-0 opacity-50" />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="start" class="w-(--radix-dropdown-menu-trigger-width) min-w-32">
		<DropdownMenu.Group>
			{#each courses as course, i (course.slug)}
				<DropdownMenu.CheckboxItem
					class="flex justify-between gap-4"
					checked={selectedCourseIndex === i}
					onCheckedChange={(c) => {
						if (c) {
							selectedCourseIndex = i;
							onSelect(i);
						}
					}}
				>
					<span>{course.name}</span>
				</DropdownMenu.CheckboxItem>
			{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
