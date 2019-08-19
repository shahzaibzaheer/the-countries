<template>
    <div><router-view></router-view></div>
</template>

<script>
    import Home from './components/Home.vue';
    import Country from './components/Country.vue';

    export default {
        components:{
            'home': Home,
            'single-country': Country,
        }
    }
</script>

<style lang="scss">

</style>

