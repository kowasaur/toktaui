<script lang="ts">
    import { armour, item_image } from "$lib/data.json";
    import { user_data } from "./stores";

    // Get around typescript being annoying
    const image: Record<string, string> = item_image;

    const necessary_items = armour.reduce<Record<string, number>>((prev, curr) => {
        if (!(curr.name in $user_data)) return prev;

        const tier = $user_data[curr.name].tier;
        if (tier !== 4) {
            for (const item of curr.tiers[tier]) {
                prev[item.name] = (prev[item.name] ?? 0) + item.amount;
            }
        }

        return prev;
    }, {});

    console.log(necessary_items);
</script>

<section>
    {#each Object.keys(necessary_items) as item}
        <img src={image[item]} alt={item} />
        <div>{item} x{necessary_items[item]}</div>
    {/each}
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
