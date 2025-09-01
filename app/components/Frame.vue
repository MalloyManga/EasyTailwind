<!-- Frame.vue -->
<script setup lang="ts">
import Input from './Input.vue'
import Output from './Output.vue'
import SuccessToast from './SuccessToast.vue'
import ErrorToast from './ErrorToast.vue'
import type { CurrentToast } from '~/types/toast'

const optVal = ref('')
const currentToast = ref<keyof CurrentToast>('none')

const toastMap = { success: SuccessToast, error: ErrorToast, none: null }

const handleCss = (val: string) => {
    optVal.value = val
}
const handleToast = (toastStatus: keyof CurrentToast) => {
    currentToast.value = toastStatus
}

</script>

<template>
    <div
        class="bg-[#f5f5f5] grid grid-rows-[1fr_minmax(4rem,auto)_5fr] items-start h-fit p-6 shadow-[0_4px_#cccccc,4px_0_#cccccc,-4px_0_#cccccc,0_-4px_#cccccc]">
        <Input @emit-css="handleCss" class="row-start-1 row-end-1" />
        <Transition name="toast" mode="out-in">
            <component :is="toastMap[currentToast]" class="self-center" />
        </Transition>
        <Output :raw-color="optVal" @toast-action="handleToast" class="row-start-3 row-end-3" />
    </div>

</template>