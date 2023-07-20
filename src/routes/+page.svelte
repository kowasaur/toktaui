<script lang="ts">
    import { armour, item_image, upgrade_costs } from "$lib/data.json";
    import { user_data } from "./stores";

    // Get around typescript being annoying
    const image: Record<string, string> = item_image;

    const necessary_items = armour.reduce<Record<string, number>>((prev, curr) => {
        if (!(curr.name in $user_data)) return prev;

        const tier = $user_data[curr.name].tier;
        if (tier !== 4) {
            const items = [{ name: "Rupee", amount: upgrade_costs[tier] }, ...curr.tiers[tier]];
            for (const item of items) {
                prev[item.name] = (prev[item.name] ?? 0) + item.amount;
            }
        }

        return prev;
    }, {});
</script>

<section>
    {#each Object.keys(necessary_items) as item}
        <div class="item">
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
        flex: 0.6;
    }

    .item * {
        width: 4em;
        margin: 0 10px;
    }
</style>
