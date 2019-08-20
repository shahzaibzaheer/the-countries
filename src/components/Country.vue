<template>
    <div class="country-component">

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
            <div class="container">
                <button class="back-btn" :class="{dark: isDarkMode}">
                    <router-link :to="{name: 'home'}">
                        <i class="icon-arrow-left2"></i> <span>Back</span>
                    </router-link>
                </button>

                <p class="error" v-if="isRequestError">
                    <span>404</span>
                    Error while loading data!
                </p>
                <div class="country-detail-container" v-else>
                    <div class="flag-img" v-bind:style="{ 'background-image': 'url(' + countryData.flag + ')' }"></div>
                    <div class="meta-info">
                        <div>
                            <h4 class="name">{{countryData.name}}</h4>
                            <p><span>Native Name: </span> {{ countryData.nativeName }} </p>
                            <p><span>Primary Language: </span> {{ countryData.languages.name }} </p>
                            <p><span>Population: </span>{{countryData.population.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }}</p>
                            <p><span>Region: </span> {{ countryData.region }} </p>
                            <p><span>Sub Region: </span> {{ countryData.subregion }} </p>
                            <p><span>Capital: </span> {{ countryData.capital }} </p>
                        </div>
                        <div>
                            <p><span>Top Level Domain: </span> {{ countryData.topLevelDomain[0] }} </p>
                            <p><span>Abbreviations: </span> {{ countryData.alpha2Code +" & "+countryData.alpha3Code}} </p>
                            <p><span>Currency: </span> {{ countryData.currencies.name }} </p>
                        </div>
                    </div>
                </div>
            </div>


        </div>


    </div>
</template>

<script>
    //endpoint: https://restcountries.eu/rest/v2/name/Anguilla?fullText=true


    export default {

        mounted() {
            this.fetchCountryData();
        },

        data() {
            return {
                countryData: {},
                requestErrorString: "",
                isRequestError: false,
                isFetchComplete: false,

            }
        },
        computed:{
            isDarkMode(){
                  return this.$store.state.isDark;
            },
        },
        methods: {
            fetchCountryData() {
                let countryName = this.$route.params.name;
                let url = "https://restcountries.eu/rest/v2/name/" + countryName + "?fullText=true";

                fetch(url).then(res => {

                    if (res.status === 200) {
                        return res.json();
                    } else {
                        throw new Error("Error while receiving data...");
                    }

                }).then(data => {
                    this.countryData = data[0]; // because country data object is received array's first item
                    this.isFetchComplete = true;
                }).catch(err => {
                    this.isRequestError = true;
                    this.requestErrorString = err;
                    this.isFetchComplete = true;

                });

            }
        },
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
    p.error {
        text-align: center;
        margin-top: gap(15);
        font-size: 3em;

        span {
            display: block;
            font-size: 1.2em;
            font-weight: 600;
        }
    }


    .back-btn {
        background: $element-background;
        color: $text-color;
        @include material-shadow();
        padding: gap(1);
        margin: gap(3) 0;

        i {
            margin-right: gap(1);
        }

        &.dark {
            background: $dark-element-background;
            color: $dark-text-color;
        }
    }



    .country-detail-container{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .flag-img {
            min-width: 180px;
            min-height: 100px;
            background-position: center;
            background-size: cover;
            border-radius: 4px;
            margin-bottom: gap(3);
            
            @media (min-width: 300px) {
                width: 220px;
                height: 150px;
                
            }
            @media (min-width: 480px) {
                width: 300px;
                height: 200px;

            }
        }

        .meta-info div{
            margin: gap(4) 0;

            .name{
                font-size: 2.4em;
                margin-bottom: gap(2);
                font-weight: 800;
            }

            p{
                font-size: 1.2em;
                margin: gap(1) 0;

                @media (min-width: 300px) {
                    font-size: 1.4em;
                }

                @media (min-width: 719px) {
                    font-size: 1.2em;
                }
            }


            span {
                font-weight: 600;
            }


        }



        @media (min-width: 720px) {
            flex-direction: row;
            justify-content: space-around;

        }
    }

</style>

