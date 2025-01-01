<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>terry218742</title>
</svelte:head>

<div class="w-content flex h-screen gap-1">
	<div class="m-auto">
		{@render children()}
	</div>
</div>
