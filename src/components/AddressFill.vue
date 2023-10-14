<template>
    <div class="form-container">
        <form class="form-control1">
            <input @input="requestSuggestions" v-model="inputSearch" type="text" placeholder="Search for place"
                class="form-control2">
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
                    console.log(res.data)
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        selected(item) {
            // console.log(item.center);
            this.inputSearch = item.place_name;
            this.suggestion = []
            this.$emit("change_cord", item.center)
        }
    }
};
</script>

<style>
.form-container {
    width: 10em;
    position: absolute;
    top: 1em;
    left: 2em;
}

.form-control2 {
    outline: none;
    background: rgba(0, 0, 0, 0.7);
    padding: 0.6em;
    border-radius: 0.4em;
    color: white;
}

.form-control2::placeholder {
    color: gray;
}

.form-control1>ul {
    width: 25rem;
    background: white;
    margin: 0;
    padding: 0.8em;
}

ul>li {
    border-bottom: 1px solid gray;
    padding: 0.3em;

}

.form-control1>ul {
    list-style: none;
    color: gray;
}
</style>