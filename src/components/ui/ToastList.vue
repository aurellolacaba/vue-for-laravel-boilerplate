<template>
    <div class=" bg-red">
        <transition-group
            name="slide"
            tag="div"
            class="ui-toast-list component fixed z-[9999] top-5 right-5"
            enter-active-class="transition-transform ease-out duration-300"
            leave-active-class="transition-transform ease-in duration-300"
            enter-from-class="transform translate-x-full"
            enter-to-class="transform translate-x-0"
            leave-from-class="transform translate-x-0"
            leave-to-class="transform translate-x-full"
        >
            <BaseToast
                v-for="toast in toasts.items"
                :key="toast.id"
                :id="toast.id"
                :type="toast.type"
                :message="toast.message"
                @remove="handleRemove"
            ></BaseToast>
        </transition-group>
    </div>
</template>

<script setup>
import BaseToast from './BaseToast.vue';
import { useToastStore } from '../../stores/ToastStore';

const toasts = useToastStore()

const handleRemove = (event) => {
    toasts.remove(event.id)
}
</script>