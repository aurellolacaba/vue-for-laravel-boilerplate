import { defineStore } from "pinia";

export const useToastStore = defineStore('toasts', {
    state: () => ({ items: [] }),
    actions: {
        new(toast) {
            const item = {
                id: new Date().getTime(),
                message: typeof toast === 'string' ? toast : toast.message,
                type: toast.type || 'default',
                duration: toast.duration || 5000
            }
            this.items.push(item)
        },
        remove(toastId) {
            this.items = this.items.filter(({ id }) => id !== toastId)
        },
        clear() {
            this.items = []
        }
    },
    
})