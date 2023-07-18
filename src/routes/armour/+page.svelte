<script lang="ts">
    import { armour } from "$lib/data.json";
    import { user_data } from "../stores";

    const valid_armour_names = new Set(armour.map(a => a.name));

    let input = "";

    const handleSubmit = () => {
        if (!valid_armour_names.has(input)) {
            alert("Invalid Armour Name");
            return;
        }
        user_data.update(d => {
            d[input] = d[input] ?? false;
            return d;
        });
    };
</script>

<form on:submit={handleSubmit}>
    <input type="text" bind:value={input} />
    <button type="reset">x</button>
</form>

{#each armour as a}
    {#if a.name in $user_data}
        <img src={a.image} alt={a.name} />
        <div>{a.name}</div>
    {/if}
{/each}

<style>
    img {
        width: 8em;
    }
</style>
