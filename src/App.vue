<template>
    <div class="loading" :class="{dark: isDarkMode}" v-if="!isFetchComplete">
        <div class="ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    <div id="app" :class="{dark: isDarkMode}" v-else>


        <header class="top-bar" :class="{dark: isDarkMode}">
            <div class="container">
                <h2 class="title">The-Countries</h2>
                <button :class="{dark: isDarkMode}" @click="isDarkMode = !isDarkMode">
                    <span v-if="isDarkMode"><i class="icon-sun"></i>Light Mode</span>
                    <span v-else><i class="icon-moon-o"></i>Dark Mode</span>

                </button>
            </div>
        </header>

        <!-- *************** Single country Item -->
        <div v-if="route.params.name">
            <router-view></router-view>
        </div>

        <!-- *************** All countries -->
        <div>
            <section class="search-and-filter-section container">
                <div class="search-container" :class="{dark: isDarkMode}">
                    <i class="icon-search"></i>
                    <input v-model="query" class="search-input" type="text" placeholder="Search for a country...">
                </div>
                <div class="filter-container">
                    <select name="" id="" v-model="selectedRegion" :class="{dark: isDarkMode}">
                        <option value="" disabled selected>Filter by Region</option>
                        <option value="">All Regions</option>
                        <option v-for="region in regions">{{region}}</option>
                    </select>
                    <i class="icon-sort-amount-desc"></i>
                </div>
            </section>
            <p class="container total-countries-info" v-show="showTotal"> There are total <span>{{ filteredCountriesList.length }}</span>
                countries in the <span v-if="selectedRegion.length>0">{{selectedRegion}}</span><span v-else>world</span>
            </p>
            <section class="countries-list container">
                <div class="country" v-for="country in filteredCountriesList" :class="{dark: isDarkMode}">
                    <div class="flag-img" v-bind:style="{ 'background-image': 'url(' + country.flag + ')' }"></div>
                    <div class="meta-info">
                        <h4 class="name">{{country.name}}</h4>
                        <p><span>Population: </span> {{ country.population.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,
                            '$1,') }} </p>
                        <p><span>Region: </span> {{ country.region }} </p>
                        <p><span>Capital: </span> {{ country.capital }} </p>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
    import country from './components/Country.vue';

    export default {

        mounted() {
            this.fetchCountriesData();
        },
        components: {
            'country': country,
        },
        data() {
            return {
                isFetchComplete: false,
                countriesData: [],
                regions: [],
                query: "",
                showTotal: true,
                selectedRegion: "",
                isDarkMode: true,
            }
        },

        computed: {
            filteredCountriesList() {
                // console.log(this.countriesData);
                if (this.selectedRegion.length > 0) {
                    // filter the query by selected region
                    return this.countriesData.filter(country => country.region.toLowerCase().match(this.selectedRegion.toLowerCase()));

                } else if (this.query.length > 0) {
                    // filter the query by user's string
                    return this.countriesData.filter(country => country.name.toLowerCase().match(this.query.toLowerCase()));
                } else {
                    return this.countriesData;
                }
            },

        },

        watch: {

            query() {
                // watching te query input field,
                // if user searches a query then don't show total number of countries
                this.showTotal = !this.query.length > 0;
                this.selectedRegion = "";    // we want, if query change, remove the region filter, if region selected then emptied the query

            },
            selectedRegion() {
                this.query = "";    // we want, if query change, remove the region filter, if region selected then emptied the query
            },
            isFetchComplete() {
                if (this.isFetchComplete) {
                    let regionsArray = [];
                    this.countriesData.filter(country => {
                        if (country.region.length > 0) {
                            regionsArray.push(country.region);
                        }
                    });

                    this.regions = [...new Set(regionsArray)];
                    console.log(this.regions);
                }
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
    $text-color: hsl(200, 15%, 8%);
    $body-background: #fafafa;
    $element-background: #fff;
    $max-width: 1000px;


    // for darkmode
    $dark-text-color: #fff;
    $dark-body-background: #202C37;
    $dark-element-background: #2B3945;


    @function gap($x) {
        @return $x * 8px;
    }

    @mixin material-shadow() {
        border: none;
        box-shadow: 1px 1px 2px rgba(black, 0.2);
        border-radius: 4px;
    }


    * {
        margin: 0;
        padding: 0;
        font-family: 'Nunito Sans', sans-serif;
        box-sizing: border-box;

        &:after, &:before {
            box-sizing: inherit;
        }
    }

    #app {
        font-size: 12px;
        background: $body-background;
        color: $text-color;
        min-height: 100vh;

        &.dark {
            color: $dark-text-color;
            background: $dark-body-background;
        }

        @media (min-width: 719px) {
            font-size: 16px;
        }
    }

    i {
        opacity: 0.7;
    }

    .container {
        max-width: $max-width;
        margin-left: auto;
        margin-right: auto;
        padding-left: gap(2);
        padding-right: gap(2);
        @media (min-width: $max-width) {
            padding: 0 !important;
        }
    }

    .total-countries-info {
        text-align: center;
        margin-top: gap(5);

        span {
            font-weight: 600;
            font-size: 1.5em;
            display: block;

            @media (min-width: 265px) {
                display: inline;
            }
        }
    }

    /*===========================
         Top bar
    =============================*/
    .top-bar {
        background: $element-background;

        &.dark {
            background: $dark-element-background;
        }

        @include material-shadow();
        padding: gap(2) 0;

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
            color: $text-color;
            padding: gap(1) 0;

            &:focus {
                outline: none;
            }

            &.dark {
                color: $dark-text-color;
            }

            i {
                padding-right: gap(1);
            }
        }
    }


    /*===========================
        Search & filter by container
     =============================*/
    .search-and-filter-section {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;

        .search-container {
            display: flex;
            align-items: center;
            justify-content: center;
            align-self: center;
            background: $element-background;
            padding: gap(1);
            @include material-shadow();
            margin: gap(2) 0;

            &.dark {
                background: $dark-element-background;

                .search-input {
                    color: $dark-text-color;
                }

            }

            .search-input {
                margin-left: gap(2);
                border: none;
                width: 100%;
                background: none;
                font-size: 1.2em;
                color: $text-color;

                &:focus {
                    outline: none;
                }
            }

        }

        .filter-container {
            align-self: flex-end;
            position: relative;

            i {
                position: absolute;
                top: 0;
                right: 0;
                transform: translate(-40%, 90%);
            }

            select {
                border: none;
                @include material-shadow();
                width: 100%;
                background: none;
                font-size: 1.2em;
                -webkit-appearance: none;
                -moz-appearance: none;
                background: $element-background;
                padding: gap(1);
                padding-right: gap(4);
                color: $text-color;

                &.dark {
                    background: $dark-element-background;
                    color: $dark-text-color;
                }
            }
        }

    }


    /*===========================
           countries list
     =============================*/
    .countries-list {
        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content: center;*/
        /*align-items: center;*/
        margin-top: gap(4);
        display: grid;
        grid-template-columns: minmax(150px, 220px);

        grid-row-gap: gap(8);
        align-items: center;
        justify-content: center;

        .country {
            background: $element-background;
            border-radius: 4px;
            box-shadow: 1px 1px 2px rgba(black, 0.2);
            overflow: hidden;

            &.dark {
                background: $dark-element-background;
            }

            .flag-img {
                min-width: 100px;
                min-height: 120px;
                background-position: center;
                background-size: cover;

                @media (min-width: 225px) {
                    height: 150px;
                }

            }

            .meta-info {
                padding: gap(2);

                .name {
                    font-size: 1.2em;
                    margin: gap(1) 0;
                }

                span {
                    font-weight: 600;
                }

            }

        }


        @media (min-width: 500px) {
            grid-template-columns: repeat(2, 220px);
            justify-content: space-around;

        }
        @media (min-width: 800px) {
            grid-template-columns: repeat(3, 220px);
        }
        @media (min-width: 1050px) {
            grid-template-columns: repeat(4, 220px);
            justify-content: space-between;
        }


    }


    /*===========================
         Media queires
    =============================*/
    @media (min-width: 359px) {
        .top-bar .container {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            button {
                margin-top: 0;
            }
        }
    }


    /*===========================
         Loading animation
    =============================*/
    .loading {
        width: 100vw;
        height: 100vh;
        background: $body-background;

        .ellipsis div {
            background: $text-color;

        }

        &.dark {
            background: $dark-body-background;

            .ellipsis div {
                background: $dark-text-color;
            }
        }
    }

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

