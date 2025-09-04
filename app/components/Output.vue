<!-- Output.vue -->
<script setup lang="ts">
import type { ToastMap } from '~/types/toast'

interface Prop {
    rawColor: string
}

interface TempTwClassName {
    className: string
    gridAttr: string
}

const { rawColor } = defineProps<Prop>()

const tempTwClassNames: TempTwClassName[] = [
    { className: 'bg-[#f5f5f5]', gridAttr: 'col-start-1 col-end-3' },
    { className: 'border-[#f5f5f5]', gridAttr: 'col-start-3 col-end-5' },
    { className: 'shadow-[#f5f5f5]', gridAttr: 'col-start-1 col-end-5' },
    { className: 'text-[#f5f5f5]', gridAttr: 'col-start-1 col-end-3' },
    { className: 'ring-[#f5f5f5]', gridAttr: 'col-start-3 col-end-5' },
]

// 两个函数用于检查颜色值为合理并且可用的的
const useCheck = (val: string) => {
    // 包含#的颜色检查
    if (val.length == 4 || val.length == 7) {
        return true
    }
    else {
        emits('toastAction', 'invalid')
        return false
    }
}
const useCheck2 = (val: string) => {
    // 不包含#的颜色检查
    if (val.length == 3 || val.length == 6) {
        return true
    }
    else {
        emits('toastAction', 'invalid')
        return false
    }
}
const handleClick = async (className: string) => {
    try {
        await navigator.clipboard.writeText(className)
        // 这里需要一个 toast 如果说点击之后成功复制的话就抛出success
        emits('toastAction', 'success')
    } catch (error) {
        // 这里需要一个 toast 
        emits('toastAction', 'error')
    }
}

const twCssClassNames = computed(() => {
    if (rawColor) {
        // 该if仅用于绕开ts检测

        if (rawColor.includes('#')) {
            if (useCheck(rawColor)) {
                return [
                    { className: `bg-[${rawColor}]`, gridAttr: 'col-start-1 col-end-3' },
                    { className: `border-[${rawColor}]`, gridAttr: 'col-start-3 col-end-5' },
                    { className: `shadow-[${rawColor}]`, gridAttr: 'col-start-1 col-end-5' },
                    { className: `text-[${rawColor}]`, gridAttr: 'col-start-1 col-end-3' },
                    { className: `ring-[${rawColor}]`, gridAttr: 'col-start-3 col-end-5' },
                ]
            }
        }
        else {
            if (useCheck2(rawColor)) {
                return [
                    { className: `bg-[#${rawColor}]`, gridAttr: 'col-start-1 col-end-3' },
                    { className: `border-[#${rawColor}]`, gridAttr: 'col-start-3 col-end-5' },
                    { className: `shadow-[#${rawColor}]`, gridAttr: 'col-start-1 col-end-5' },
                    { className: `text-[#${rawColor}]`, gridAttr: 'col-start-1 col-end-3' },
                    { className: `ring-[#${rawColor}]`, gridAttr: 'col-start-3 col-end-5' },
                ]
            }
        }
    }
})

const emits = defineEmits<{
    toastAction: [toastStatus: keyof ToastMap]
}>()

</script>

<template>
    <div v-if="rawColor" class="ize-full grid grid-cols-4 auto-rows-[minmax(2rem,auto)] gap-4">
        <button v-for="twCssClassName in twCssClassNames" :class="twCssClassName.gridAttr" type="button"
            class="cursor-pointer h-fit flex justify-center items-center text-white bg-[#757de8] px-4 py-3 shadow-[0_4px_#3F51B5,4px_0_#3F51B5,-4px_0_#3F51B5,0_-4px_#3F51B5,4px_4px_rgba(255,255,255,0.3)_inset,-4px_-4px_#656ccb_inset] active:bg-[#656ccb] active:shadow-[0_4px_#3F51B5,4px_0_#3F51B5,-4px_0_#3F51B5,0_-4px_#3F51B5,-4px_-4px_rgba(255,255,255,0.3)_inset]">
            {{ twCssClassName.className }}
            <!-- 这里展示的话 内容和布局是分开的？ -->
        </button>
    </div>
    <div v-else class="size-full grid grid-cols-4 auto-rows-[minmax(2rem,auto)] gap-4">
        <button v-for="tempTwClassName in tempTwClassNames" :class="tempTwClassName.gridAttr"
            @click="handleClick(tempTwClassName.className)" type="button"
            class="cursor-pointer h-fit flex justify-center items-center text-white bg-[#757de8] px-4 py-3 shadow-[0_4px_#3F51B5,4px_0_#3F51B5,-4px_0_#3F51B5,0_-4px_#3F51B5,4px_4px_rgba(255,255,255,0.3)_inset,-4px_-4px_#656ccb_inset] active:bg-[#656ccb] active:shadow-[0_4px_#3F51B5,4px_0_#3F51B5,-4px_0_#3F51B5,0_-4px_#3F51B5,-4px_-4px_rgba(255,255,255,0.3)_inset]">
            {{ tempTwClassName.className }}
        </button>

    </div>

</template>