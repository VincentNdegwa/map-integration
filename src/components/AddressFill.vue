<template>
    <div class="form-container">
        <form class="form-control">
            <input @input="requestSuggestions" v-model="inputSearch" type="text" class="form-control">
            <ul v-if="suggestion.length > 0">
                <li v-for="(item, index) in suggestion" :key="index" @click="selected(item)">
                    {{ item.place_name }}
                </li>
            </ul>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            inputSearch: "",
            suggestion: []
        };
    },
    methods: {
        requestSuggestions() {
            if (this.inputSearch.trim()) {
                axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.inputSearch}.json?access_token=pk.eyJ1IjoidmluY2VudC1uZGVnd2EiLCJhIjoiY2xucDB2dzNnMDJ5dTJqbXphMnU2dmplOSJ9.NvNUkNBEry8U_RzWx_CoiQ`).then(res => {
                    this.suggestion = res.data.features;
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        selected(item) {
            console.log(item.center);
            this.inputSearch = item.place_name;
        }
    }
};
</script>

<style>
.form-container {
    background: #454545;
    width: 100%;
    height: 100vh;
    padding: 10em !important;
}

.form-control>ul {
    list-style: none;
    color: gray;
}
</style>