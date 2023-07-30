<script>
    import Header from "./Header.svelte";
    import "./styles.css";
</script>

<div class="app">
    <Header />

    <main>
        <slot />
    </main>

    <footer class="header">
        <a href="https://github.com/kowasaur/totkaui">GitHub</a>
    </footer>
</div>

<style>
    .app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    main {
        margin: var(--outer-margin);
        box-sizing: border-box;
    }

    footer.header {
        justify-content: center;
    }
</style>
