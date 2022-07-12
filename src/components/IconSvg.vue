<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconClassName" :fill="color" />
    </svg>
</template>
<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
    iconName: {
        type: String,
        required: true
    },
    className: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: '#fff'
    },
    fontSize: {
        type: Number,
        default: 20
    }
});
const iconClassName = computed(() => {
    return `#${props.iconName}`;
})
const svgClass = computed(() => {
    if (props.className) {
        return `svg-icon ${props.className}`;
    }
    return 'svg-icon';
});
</script>
<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    overflow: hidden;
    font-size: v-bind(fontSize+'px');
}
</style>