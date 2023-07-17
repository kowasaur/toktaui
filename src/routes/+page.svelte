<script>
	import Counter from './Counter.svelte';
	import data from '$lib/data.json';

	const hood = data.armour[0];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<img src="{hood.image}" alt="{hood.name}"/>

	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
