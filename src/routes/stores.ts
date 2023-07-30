import { persisted } from "svelte-local-storage-store";
import { derived, writable } from "svelte/store";

// The keys are the armour the user has and the bool is whether it is favourite
export const user_data = persisted<UserData>("user_data", {});

export const only_favourites = writable(false);

// show the costs for fully upgrading everything or just to the next tier
export const fully_upgrade = writable(false);

// Whether to show a piece of armour
// (the user has it and if only favourites is on, it is favourite)
export const shouldShow = derived(
    [user_data, only_favourites],
    ([u, o]) =>
        (armour: string) =>
            armour in u && (!o || u[armour].favourite)
);
