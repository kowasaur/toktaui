<script>
    import { page } from "$app/stores";
    import { only_favourites, fully_upgrade } from "./stores";

    $: other_url = $page.url.pathname === "/" ? "/armour" : "/";
    $: other_name = $page.url.pathname === "/" ? "Armour" : "Items";
    $: this_name = $page.url.pathname === "/" ? "Items" : "Armour";
</script>

<svelte:head>
    <title>{this_name} - TOTKAUI</title>
    <meta name="description" content="Tears of the Kingdom Armour Upgrade Items" />
</svelte:head>

<header class="header">
    <a href={other_url}>{other_name}</a>
    <div class="toggles">
        <div>
            <label for="only_favourites">Only Favourites</label>
            <input type="checkbox" id="only_favourites" bind:checked={$only_favourites} />
        </div>
        {#if this_name == "Items"}
            <div>
                <label for="fully_upgrade">Fully Upgrade</label>
                <input type="checkbox" id="fully_upgrade" bind:checked={$fully_upgrade} />
            </div>
        {/if}
    </div>
</header>

<style>
    .toggles {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .toggles > div {
        display: flex;
    }
</style>
