import { persisted } from "svelte-local-storage-store";

// The keys are the armour the user has and the bool is whether it is favourite
export const user_data = persisted<UserData>("user_data", {});
