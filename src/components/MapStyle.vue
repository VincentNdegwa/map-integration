<script>
export default {
    data() {
        return {

        }
    }, methods: {
        changeStyle(event) {
            this.$emit("change_style", event.target.value)
        }
    },
}
</script>
<template>
    <form class="map-styles-holder" action="">
        <div class="radio-item">
            <input @click="changeStyle($event)" id="satellite-streets-v12" type="radio" name="rtoggle"
                value="satellite-streets-v12">
            <label for="satellite-streets-v12">satellite streets</label>
        </div>
        <div class="radio-item">
            <input @click="changeStyle($event)" id="light-v11" type="radio" name="rtoggle" value="light-v11">
            <label for="light-v11">light</label>
        </div>
        <div class="radio-item">
            <input @click="changeStyle($event)" id="dark-v11" type="radio" name="rtoggle" value="dark-v11">
            <label for="dark-v11">dark</label>
        </div>
        <div class="radio-item">
            <input @click="changeStyle($event)" id="streets-v12" type="radio" name="rtoggle" value="streets-v12">
            <label for="streets-v12">streets</label>
        </div>
        <div class="radio-item">
            <input @click="changeStyle($event)" id="outdoors-v12" type="radio" name="rtoggle" value="outdoors-v12">
            <label for="outdoors-v12">outdoors</label>
        </div>
        <div class="radio-item">
            <input @click="changeStyle($event)" id="navigation-day-v1" type="radio" name="rtoggle"
                value="navigation-day-v1">
            <label for="navigation-day-v1">navigation</label>
        </div>
    </form>
</template>

<style>
.map-styles-holder {
    height: fit-content;
    position: absolute;
    top: 1em;
    right: 0;
    background-color: white;
    padding: 0.4em;
    border-radius: 0.4em
}

/* .radio-item>input {
    display: none;
} */
</style>