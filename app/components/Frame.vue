<!-- Frame.vue -->
<script setup lang="ts">
import Input from './Input.vue'
import Output from './Output.vue'

const optVal = ref('')

const handleCss = (val: string) => {
    optVal.value = val
}

</script>

<template>
    <div
        class="bg-[#f5f5f5] grid grid-rows-[1fr_5fr] gap-8 items-start h-fit p-6 shadow-[0_4px_#cccccc,4px_0_#cccccc,-4px_0_#cccccc,0_-4px_#cccccc]">
        <Input @emit-css="handleCss" />
        <Output :raw-color="optVal" />
    </div>

</template>