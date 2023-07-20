<script lang="ts">
    import { armour } from "$lib/data.json";
    import { user_data, shouldShow } from "../stores";

    const valid_armour_names = new Set(armour.map(a => a.name));

    function updateUserData(armour: string, new_value: UserArmour) {
        user_data.update(d => {
            d[armour] = new_value;
            return d;
        });
    }

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
        updateUserData(input, { tier: 0, favourite: false });
    }

    function tierAdjust(armour: string, amount: number) {
        return () => {
            const old_armour = $user_data[armour];
            const tier = Math.min(Math.max(old_armour.tier + amount, 0), 4) as ValidTier;
            updateUserData(armour, { ...old_armour, tier });
        };
    }
</script>

<form on:submit={handleSubmit}>
    <input type="text" bind:value={input} />
    <button type="reset">x</button>
</form>

{#each armour as a}
    {#if $shouldShow(a.name)}
        <img src={a.image} alt={a.name} />
        <div>{a.name}</div>
        {@const user = $user_data[a.name]}
        <div>
            <button on:click={tierAdjust(a.name, -1)}>-</button>
            {"★".repeat(user.tier)}
            <button on:click={tierAdjust(a.name, 1)}>+</button>
            <button
                class="favourite"
                on:click={() => updateUserData(a.name, { ...user, favourite: !user.favourite })}
                >{user.favourite ? "♥" : "♡"}</button
            >
        </div>
    {/if}
{/each}

<style>
    img {
        width: 7em;
    }
    .favourite {
        color: rgb(233, 3, 3);
    }
</style>
