// toast.ts

import type { Component } from "vue"

export interface CurrentToast {
    success: Component
    error: Component
    none: null
}