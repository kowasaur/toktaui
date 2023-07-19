// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface Platform {}
    }
    type ValidTier = 0 | 1 | 2 | 3 | 4;
    interface UserArmour {
        tier: ValidTier;
        favourite: boolean;
    }
    type UserData = Record<string, UserArmour>;
}

export {};
