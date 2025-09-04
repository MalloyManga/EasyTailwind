// toast.ts

import type { Component } from "vue"

export interface ToastMap {
    success: Component
    error: Component
    none: null
}