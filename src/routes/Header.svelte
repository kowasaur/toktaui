<script>
    import { page } from "$app/stores";
    $: other_url = $page.url.pathname === "/" ? "/armour" : "/";
    $: other_name = $page.url.pathname === "/" ? "Armour" : "Items";
    $: this_name = $page.url.pathname === "/" ? "Items" : "Armour";
</script>

<svelte:head>
    <title>{this_name}</title>
    <meta name="description" content="Tears of the Kingdom Armour Upgrade Items" />
</svelte:head>

<header>
    <nav>
        <a href={other_url}>{other_name}</a>
    </nav>
</header>
