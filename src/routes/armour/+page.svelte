<script lang="ts">
    import { armour } from "$lib/data.json";
    import { user_data } from "../stores";

    const valid_armour_names = new Set(armour.map(a => a.name));

    let input = "";

    function handleSubmit() {
        if (!valid_armour_names.has(input)) {
            alert("Invalid armour name");
            return;
        }
        if (input in $user_data) {
            alert("You've already added this");
            return;
        }
        user_data.update(d => {
            d[input] = { tier: 0, favourite: false };
            return d;
        });
    }

    function tierAdjust(armour: string, amount: number) {
        return () =>
            user_data.update(d => {
                // clamp between 0 and 4
                const tier = Math.min(Math.max(d[armour].tier + amount, 0), 4) as ValidTier;
                d[armour] = { ...d[armour], tier };
                return d;
            });
    }
</script>

<form on:submit={handleSubmit}>
    <input type="text" bind:value={input} />
    <button type="reset">x</button>
</form>

{#each armour as a}
    {#if a.name in $user_data}
        <img src={a.image} alt={a.name} />
        <div>{a.name}</div>
        <div>
            <button on:click={tierAdjust(a.name, -1)}>-</button>
            {"★".repeat($user_data[a.name].tier)}
            <button on:click={tierAdjust(a.name, 1)}>+</button>
        </div>
    {/if}
{/each}

<style>
    img {
        width: 7em;
    }
</style>
