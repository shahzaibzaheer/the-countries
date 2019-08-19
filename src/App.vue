<template>

    <div class="loading" v-if="!isFetchComplete">
        <div class="ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    <div id="app" class="" v-else>

        <header class="top-bar">
            <div class="container">
                <h2 class="title">The-Countries</h2>
                <button><i class="icon-moon-o"></i>Dark Mode</button>
            </div>
        </header>


        <!--        <section class="search-and-filter-container">-->
        <!--            <div class="search-container">-->
        <!--                <i class="icon-search"></i>-->
        <!--                <input type="text" placeholder="Search for a country...">-->
        <!--            </div>-->
        <!--            <div class="filter-container">-->
        <!--                <i class="icon-sort-amount-desc"></i>-->
        <!--                <select name="" id="">-->
        <!--                    <option value="" disabled selected hidden>Filter by Region</option>-->
        <!--                    <option value="">aaaaaa</option>-->
        <!--                    <option value="">bbbbbb</option>-->
        <!--                    <option value="">cccccc</option>-->
        <!--                    <option value="">ddddddd</option>-->
        <!--                </select>-->
        <!--            </div>-->
        <!--        </section>-->


        <!--        <section class="countries-list">-->
        <!--            <div class="country" v-for="country in countriesData">-->
        <!--                <div class="flag-img" v-bind:style="{ 'background-image': 'url(' + country.flag + ')' }"></div>-->
        <!--                <div class="meta-info">-->
        <!--                    <h4 class="name">{{country.name}}</h4>-->
        <!--                    <p><span>Population: </span> {{ country.population }} </p>-->
        <!--                    <p><span>Region: </span> {{ country.region }} </p>-->
        <!--                    <p><span>Capital: </span> {{ country.capital }} </p>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </section>-->


    </div>
</template>
<script>
    export default {

        mounted() {
            this.fetchCountriesData();
        },

        data() {
            return {
                isFetchComplete: false,
                countriesData: [],
            }
        },


        methods: {
            fetchCountriesData() {
                fetch("https://restcountries.eu/rest/v2/all")
                    .then(response => response.json())
                    .then(countriesData => {
                        // console.log(countriesData);
                        this.countriesData = countriesData;
                        this.isFetchComplete = true;
                    })
                    .catch(err => console.log(err));
            }
        }


    }
</script>

<style lang="scss">
    $text-color: #fff;
    $body-background: #fafafa;
    $element-background: #fff;
    $max-width: 1000px;
    *{
        margin: 0;
        padding: 0;
        font-family: 'Nunito Sans', sans-serif;
        box-sizing: border-box;

        &:after, &:before{
            box-sizing: inherit;
        }
    }
    body {
        font-size: 12px;

        @media (min-width: 719px) {
            font-size: 16px;
        }
    }




    @function gap($x) {
        @return $x * 8px;
    }

    @mixin material-shadow() {
        border: none;
        box-shadow: 1px 1px 2px rgba(black, 0.2);
    }




    .container{
        max-width: $max-width;
        margin-left: auto;
        margin-right: auto;
    }



    /*===========================
         Top bar
    =============================*/
    .top-bar {
        background: $element-background;
        @include material-shadow();
        padding: gap(2);

        .container {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
        }

        .title {
            font-size: 1.8em;
            font-weight: 800;
            text-align: center;
        }

        button {
            margin-top: gap(1);
            background: none;
            border: none;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2em;

            i {
                padding-right: gap(1);
            }
        }
    }






    /*===========================
         Media queires
    =============================*/
    @media (min-width: 359px){
        .top-bar .container{
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            button{
                margin-top: 0;
            }
        }
    }












    /*===========================
         Loading animation
    =============================*/

    .ellipsis {
        display: inline-block;
        position: fixed;
        width: 64px;
        height: 64px;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .ellipsis div {
        position: absolute;
        top: 27px;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: #000;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    .ellipsis div:nth-child(1) {
        left: 6px;
        animation: ellipsis1 0.6s infinite;
    }

    .ellipsis div:nth-child(2) {
        left: 6px;
        animation: ellipsis2 0.6s infinite;
    }

    .ellipsis div:nth-child(3) {
        left: 26px;
        animation: ellipsis2 0.6s infinite;
    }

    .ellipsis div:nth-child(4) {
        left: 45px;
        animation: ellipsis3 0.6s infinite;
    }

    @keyframes ellipsis1 {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes ellipsis3 {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
    }

    @keyframes ellipsis2 {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(19px, 0);
        }
    }

</style>

<!--<style lang="scss">-->
<!--    $white: #fff;-->
<!--    $background-color: #fafafa;-->
<!--    $max-width : 1000px;-->


<!--    body {-->
<!--        background: $background-color;-->

<!--        font-size: 10px;-->

<!--        @media (min-width: 359px){-->
<!--            font-size: 14px;-->
<!--        }-->


<!--    }-->

<!--    i {-->
<!--        font-size: 1.2em;-->
<!--    }-->

<!--    #app {-->
<!--        &.dark {-->
<!--            background: hsl(207, 26%, 17%);-->
<!--        }-->
<!--    }-->


<!--    /*===========================-->
<!--         Top bar-->
<!--    =============================*/-->


<!--    /*.topbar {-->
<!--        button {-->
<!--            background: none;-->
<!--            border: none;-->
<!--            font-weight: 600;-->
<!--            display: flex;-->
<!--            align-items: center;-->
<!--            justify-content: center;-->
<!--            font-size: 1.2em;-->

<!--            i {-->
<!--                padding-right: gutter(1);-->
<!--            }-->
<!--        }-->

<!--    }*/-->


<!--    /*===========================-->
<!--       Search & Filter container-->
<!--    =============================*/-->
<!--    .search-and-filter-container {-->
<!--        margin: gutter(4) 0;-->
<!--        display: flex;-->
<!--        justify-content: flex-start;-->
<!--        align-items: flex-start;-->
<!--        flex-direction: column;-->
<!--        padding: gutter(2);-->

<!--        .search-container {-->


<!--            /*position: relative;*/-->
<!--            display: flex;-->
<!--            justify-content: center;-->
<!--            align-items: center;-->
<!--            margin: gutter(2) 0;-->
<!--            align-self: center;-->
<!--            background: $white;-->
<!--            box-shadow: 1px 1px 2px rgba(black, 0.2);-->
<!--            padding: gutter(1.5) gutter(2) ;-->
<!--            border-radius: 4px;-->


<!--            input {-->
<!--                margin-left:gutter(2) ;-->
<!--                border: none;-->
<!--                width: 100%;-->
<!--                background: none;-->
<!--                font-size: 1.2em;-->
<!--                &:focus{-->
<!--                    outline: none;-->
<!--                }-->
<!--            }-->

<!--            /*i {*/-->
<!--            /*    position: absolute;*/-->
<!--            /*    top: 0;*/-->
<!--            /*    left: gutter(1);*/-->
<!--            /*    transform: translateY(80%);*/-->
<!--            /*}*/-->
<!--        }-->


<!--        .filter-container {-->
<!--            position: relative;-->

<!--            select {-->
<!--                width: 100%;-->
<!--                -webkit-appearance: none;-->
<!--                -moz-appearance: none;-->
<!--                padding: gutter(1.5) gutter(5) gutter(1.5) gutter(1.5);-->
<!--                border: none;-->
<!--                border-radius: 4px;-->
<!--                box-shadow: 1px 1px 2px rgba(black, 0.2);-->
<!--                font-size: 1.2em;-->


<!--            }-->

<!--            i {-->
<!--                position: absolute;-->
<!--                top: 0;-->
<!--                right: gutter(1);-->
<!--                transform: translateY(90%);-->

<!--            }-->


<!--        }-->
<!--    }-->


<!--    /*===========================-->
<!--      Countries List-->
<!--   =============================*/-->
<!--    .countries-list {-->
<!--        background: pink;-->
<!--        display: flex;-->
<!--        flex-direction: column;-->
<!--        margin: 0 auto;-->

<!--        .country{-->
<!--            background: $white;-->
<!--            border-radius: 4px;-->
<!--            box-shadow: 1px 1px 2px rgba(black, 0.2);-->
<!--            /*margin: gutter(2);*/-->

<!--            .flag-img{-->
<!--                width: 100%;-->
<!--                height: 200px;-->
<!--                background-size: cover;-->


<!--            }-->

<!--        }-->
<!--    }-->


<!--    /*===========================-->
<!--            Media Queries-->
<!--    =============================*/-->
<!--    @media (min-width: 319px){-->
<!--        .top-bar {-->
<!--            .container{-->
<!--                flex-direction: row;-->
<!--                justify-content: space-between;-->
<!--            }-->

<!--            button{-->
<!--                margin-top: 0;-->
<!--            }-->


<!--        }-->
<!--    }-->


<!--    /*===========================-->
<!--         Loading animation-->
<!--    =============================*/-->

<!--    .ellipsis {-->
<!--        display: inline-block;-->
<!--        position: fixed;-->
<!--        width: 64px;-->
<!--        height: 64px;-->

<!--        top: 50%;-->
<!--        left: 50%;-->
<!--        transform: translate(-50%, -50%);-->
<!--    }-->

<!--    .ellipsis div {-->
<!--        position: absolute;-->
<!--        top: 27px;-->
<!--        width: 11px;-->
<!--        height: 11px;-->
<!--        border-radius: 50%;-->
<!--        background: #000;-->
<!--        animation-timing-function: cubic-bezier(0, 1, 1, 0);-->
<!--    }-->

<!--    .ellipsis div:nth-child(1) {-->
<!--        left: 6px;-->
<!--        animation: ellipsis1 0.6s infinite;-->
<!--    }-->

<!--    .ellipsis div:nth-child(2) {-->
<!--        left: 6px;-->
<!--        animation: ellipsis2 0.6s infinite;-->
<!--    }-->

<!--    .ellipsis div:nth-child(3) {-->
<!--        left: 26px;-->
<!--        animation: ellipsis2 0.6s infinite;-->
<!--    }-->

<!--    .ellipsis div:nth-child(4) {-->
<!--        left: 45px;-->
<!--        animation: ellipsis3 0.6s infinite;-->
<!--    }-->

<!--    @keyframes ellipsis1 {-->
<!--        0% {-->
<!--            transform: scale(0);-->
<!--        }-->
<!--        100% {-->
<!--            transform: scale(1);-->
<!--        }-->
<!--    }-->

<!--    @keyframes ellipsis3 {-->
<!--        0% {-->
<!--            transform: scale(1);-->
<!--        }-->
<!--        100% {-->
<!--            transform: scale(0);-->
<!--        }-->
<!--    }-->

<!--    @keyframes ellipsis2 {-->
<!--        0% {-->
<!--            transform: translate(0, 0);-->
<!--        }-->
<!--        100% {-->
<!--            transform: translate(19px, 0);-->
<!--        }-->
<!--    }-->

<!--</style>-->
