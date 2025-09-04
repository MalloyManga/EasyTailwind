<!-- Frame.vue -->
<script setup lang="ts">
import Input from './Input.vue'
import Output from './Output.vue'
import SuccessToast from './SuccessToast.vue'
import ErrorToast from './ErrorToast.vue'
import InvalidToast from './InvalidToast.vue'
import type { ToastMap } from '~/types/toast'

const optVal = ref('')
const currentToastState = ref<keyof ToastMap>('none')

const toastMap = { success: SuccessToast, error: ErrorToast, none: null, invalid: InvalidToast }

const handleCss = (val: string) => {
    optVal.value = val
}
const handleToast = (toastStatus: keyof ToastMap) => {
    currentToastState.value = toastStatus
}

let timeoutId: NodeJS.Timeout | null = null

watch(currentToastState, (newVal) => {
    // clearTimeout(timeoutId) 这里第一次执行会导致静默失败
    if (timeoutId) {
        clearTimeout(timeoutId)
    }
    if (newVal !== 'none') {
        timeoutId = setTimeout(() => {
            currentToastState.value = 'none'
        }, 3000)
    }
    // if用于防止无限循环 watch 出发的副作用中如果包含修改自身的话会变成无限循环
})
</script>

<template>
    <div
        class="bg-[#f5f5f5] grid grid-rows-[1fr_minmax(4rem,auto)_5fr] items-start h-fit p-6 shadow-[0_4px_#cccccc,4px_0_#cccccc,-4px_0_#cccccc,0_-4px_#cccccc]">
        <Input @emit-css="handleCss" class="row-start-1 row-end-1" />
        <Transition name="toast" mode="out-in">
            <component :is="toastMap[currentToastState]" class="self-center" />
        </Transition>
        <!-- <InvalidToast class="self-center" /> -->
        <Output :raw-color="optVal" @toast-action="handleToast" class="row-start-3 row-end-3" />
    </div>

</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: all 300ms;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
}
</style>