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

const displayTwClassNames = ref<TempTwClassName[]>(tempTwClassNames)

// 两个函数用于检查颜色值为合理并且可用的的
const useCheck = (val: string) => {
    return val.length == 4 || val.length == 7
}
const useCheck2 = (val: string) => {
    return val.length == 3 || val.length == 6
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


const emits = defineEmits<{
    toastAction: [toastStatus: keyof ToastMap]
}>()

watch(() => rawColor, (newColor) => {
    if (!newColor) {
        // !newColor 相比于 newColor == '' 能够更加优雅的处理所有的falsy值 '' null undefined 而组件加载的时间没有传递这个prop 会是 undefined
        // 并且 !newColor 是js中检查值存在性的一个惯用写法
        displayTwClassNames.value = tempTwClassNames
        return 
    }
    let isValid = false
    let finalColor = ``
    if (newColor.includes('#')) {
        isValid = useCheck(newColor)
        finalColor = newColor
    }
    else {
        isValid = useCheck2(newColor)
        finalColor = `#${newColor}`
    }
    if (isValid) {
        displayTwClassNames.value = [
            { className: `bg-[${finalColor}]`, gridAttr: 'col-start-1 col-end-3' },
            { className: `border-[${finalColor}]`, gridAttr: 'col-start-3 col-end-5' },
            { className: `shadow-[${finalColor}]`, gridAttr: 'col-start-1 col-end-5' },
            { className: `text-[${finalColor}]`, gridAttr: 'col-start-1 col-end-3' },
            { className: `ring-[${finalColor}]`, gridAttr: 'col-start-3 col-end-5' },
        ]
    }
    else {
        emits('toastAction', 'invalid')
    }
}, { immediate: true })

</script>

<template>
    <div class="ize-full grid grid-cols-4 auto-rows-[minmax(2rem,auto)] gap-4">
        <button v-for="displayTwClassName in displayTwClassNames" :class="displayTwClassName.gridAttr" @click="handleClick(displayTwClassName.className)" type="button"
            class="cursor-pointer h-fit flex justify-center items-center text-white bg-[#757de8] px-4 py-3 shadow-[0_4px_#3F51B5,4px_0_#3F51B5,-4px_0_#3F51B5,0_-4px_#3F51B5,4px_4px_rgba(255,255,255,0.3)_inset,-4px_-4px_#656ccb_inset] active:bg-[#656ccb] active:shadow-[0_4px_#3F51B5,4px_0_#3F51B5,-4px_0_#3F51B5,0_-4px_#3F51B5,-4px_-4px_rgba(255,255,255,0.3)_inset]">
            {{ displayTwClassName.className }}
        </button>
    </div>

</template>