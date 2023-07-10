<template>
    <svg :class="svgClass" v-bind="$attrs" :id="props.id" :style="{ color: color }">
        <use :xlink:href="iconName" />
    </svg>
</template>
<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        default: ""
    }
});
const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
    // console.log(props.name, 'props.name')
    if (props.name) {
        return `svg-icon icon-${props.name}`
    }
    return 'svg-icon'
})
</script>
<style scoped>
.svg-icon {
    /* width: 10em;
    height: 5em; */
    fill: currentColor;
    vertical-align: middle;
    overflow: hidden;
}
</style>
