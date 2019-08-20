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
                <button :class="{dark: isDarkMode}" @click="$store.commit('toggleDarkMode')">
                    <span v-if="isDarkMode"><i class="icon-sun"></i>Light Mode</span>
                    <span v-else><i class="icon-moon-o"></i>Dark Mode</span>

                </button>
            </div>
        </header>

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

            <!-- *************** All countries List -->
            <section class="countries-list container">
                <div class="country" v-for="country in filteredCountriesList" :class="{dark: isDarkMode}">
                    <router-link :to="{ name: 'countryDetail', params:{name: country.name} }">
                        <div class="flag-img" v-bind:style="{ 'background-image': 'url(' + country.flag + ')' }"></div>
                        <div class="meta-info">
                            <h4 class="name">{{country.name}}</h4>
                            <p><span>Population: </span> {{
                                country.population.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,
                                '$1,') }} </p>
                            <p><span>Region: </span> {{ country.region }} </p>
                            <p><span>Capital: </span> {{ country.capital }} </p>
                        </div>
                    </router-link>
                </div>
            </section>
        </div>
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
                regions: [],
                query: "",
                showTotal: true,
                selectedRegion: "",
            }
        },

        computed: {
            isDarkMode(){
              return this.$store.state.isDark;
            },
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
            },

        }


    }
</script>

<style lang="scss">
    @import "../stylesheets/partials/variables";
    @import "../stylesheets/partials/common-styles";
    @import "../stylesheets/partials/loading-animation";

    a{
        text-decoration: none;
        color: inherit;
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


</style>

