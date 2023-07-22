<script lang="ts">
    import { armour } from "$lib/data.json";
    import { user_data, shouldShow } from "../stores";

    // Lowercase armour names
    const lower_armour_names = armour.map(a => a.name.toLowerCase());
    // Mapping from lowercase armour names to the armour
    const lower_to_armour = Object.fromEntries(armour.map(a => [a.name.toLowerCase(), a]));

    let input = "";
    let search_results: string[] = []; // for armour

    function updateUserData(armour: string, new_value: UserArmour) {
        user_data.update(d => {
            d[armour] = new_value;
            return d;
        });
    }

    function submit(armour_name: string) {
        // TODO: change to opening the piece-specific page
        if (armour_name in $user_data) {
            alert("You've already added this");
            return;
        }
        updateUserData(armour_name, { tier: 0, favourite: false });
    }

    function handleChange() {
        search_results = [];
        if (input.length < 4) return;
        const lower_input = input.toLowerCase();
        search_results = lower_armour_names.filter(name => name.startsWith(lower_input));
        console.log(search_results);
    }

    function tierAdjust(armour: string, amount: number) {
        return () => {
            const old_armour = $user_data[armour];
            const tier = Math.min(Math.max(old_armour.tier + amount, 0), 4) as ValidTier;
            updateUserData(armour, { ...old_armour, tier });
        };
    }
</script>

<form>
    <input type="text" bind:value={input} on:input={handleChange} />
    <button type="reset">x</button>
    {#each search_results as name}
        {@const a = lower_to_armour[name]}
        <button
            class={a.name in $user_data ? "added" : ""}
            type="button"
            on:click={() => submit(a.name)}
        >
            <img src={a.image} alt={a.name} />
            {a.name}
        </button>
    {/each}
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
    .added {
        background: rgb(100, 255, 80);
    }
</style>
