<script lang="ts">
    import { armour, item_image, upgrade_costs } from "$lib/data.json";
    import { user_data, shouldShow, fully_upgrade } from "./stores";

    // Get around typescript being annoying
    const image: Record<string, string> = item_image;

    $: necessary_items = armour.reduce<Record<string, number>>((prev, curr) => {
        if (!$shouldShow(curr.name)) return prev;

        const tier = $user_data[curr.name].tier;
        const max_tier = $fully_upgrade ? 4 : Math.min(tier + 1, 4);
        for (let t = tier; t < max_tier; t++) {
            const items = [{ name: "Rupee", amount: upgrade_costs[t] }, ...curr.tiers[t]];
            for (const item of items) {
                prev[item.name] = (prev[item.name] ?? 0) + item.amount;
            }
        }

        return prev;
    }, {});
</script>

<section>
    {#each Object.keys(necessary_items) as item}
        <div class="item tile" title={item}>
            <img src={image[item]} alt={item} />
            <div>{item} x{necessary_items[item]}</div>
        </div>
    {/each}
</section>

<style>
    section {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 0.4rem;
    }

    .item > * {
        width: 4em;
        /* margin: 0 10px; */
    }
</style>
