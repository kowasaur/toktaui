<script>
    import { page } from "$app/stores";
    import { only_favourites } from "./stores";
    $: other_url = $page.url.pathname === "/" ? "/armour" : "/";
    $: other_name = $page.url.pathname === "/" ? "Armour" : "Items";
    $: this_name = $page.url.pathname === "/" ? "Items" : "Armour";
</script>

<svelte:head>
    <title>{this_name} - TOTKAUI</title>
    <meta name="description" content="Tears of the Kingdom Armour Upgrade Items" />
</svelte:head>

<header>
    <a href={other_url}>{other_name}</a>
    <label for="only_favourites">Only Favourites</label>
    <input type="checkbox" name="only_favourites" bind:checked={$only_favourites} />
</header>
