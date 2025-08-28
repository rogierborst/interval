<script setup lang="ts">
const types = {
    default: {
        bg: 'bg-blue-400',
        bgHover: 'hover:bg-blue-800',
        color: 'white'
    },
    success: {
        bg: 'bg-green-500',
        bgHover: 'bg-green-600',
        color: 'white'
    }
}
const props = defineProps({
    type: {
        type: String,
        default: 'default'
    }
});

const classes = computed(() => {
    const type = types[props.type] ?? types.default;

    return `${ type.bg } text-${ type.color } ${ type.bgHover }`;
})
</script>

<template>
    <div class="rounded px-3 py-2 inline-block cursor-pointer" :class="classes">
        <slot />
    </div>
</template>
