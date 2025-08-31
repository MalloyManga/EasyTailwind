<!-- Output.vue -->
<script setup lang="ts">
interface Prop {
    rawColor: string
}

const { rawColor } = defineProps<Prop>()

const twCss = computed(() => {
    if (rawColor) {
        if (rawColor.includes('#')) {
            return `bg-[${rawColor}]`
        }
        else {
            return `bg-[#${rawColor}]`
        }
    }
})

</script>

<template>
    <div v-if="rawColor" class="bg-pink-300">
        {{ twCss }}
    </div>
    <div v-else class="size-full bg-pink-300">
        <button type="button" class="cursor-pointer ">
            bg-[#f5f5f5]
        </button>
    </div>

</template>