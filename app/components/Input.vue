<!-- Input.vue -->
<script setup lang="ts">
const iptVal = defineModel()

const handleKeyDown = () => {
    if (iptVal.value) {
        emits('emitCss', iptVal.value as string)
    }
}

const emits = defineEmits<{
    emitCss: [cssValue: string]
}>()

</script>

<template>
    <input type="text" @keydown.enter="handleKeyDown" v-model="iptVal"
        class="bg-transparent px-2 py-1 outline-none shadow-[0_4px_#cccccc,4px_0_#cccccc,-4px_0_#cccccc,0_-4px_#cccccc]">

</template>