<script>
    import Header from "./Header.svelte";
    import "./styles.css";
</script>

<div class="app">
    <Header />

    <main>
        <slot />
    </main>

    <footer><a href="https://github.com/kowasaur/totkaui">Github</a></footer>
</div>

<style>
    .app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 1rem;
    }

    main {
        box-sizing: border-box;
    }
</style>
