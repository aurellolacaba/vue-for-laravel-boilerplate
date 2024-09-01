<template>
    <div v-if="isLoading" class="dark:text-white">Loading...</div>

    <div v-else class="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
        <div class="flex items-center space-x-4 p-4">
            <!-- Avatar -->
            <img
                :src="`https://i.pravatar.cc/150?u=fake${user?.id}@pravatar.com`"
                alt="User Avatar"
                class=" w-32 h-32 rounded-full"
            />

            <!-- User Info -->
            <div>
                <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-300">
                    {{ user?.first_name }} {{ user?.last_name }}
                </h2>
                <p class="text-sm text-gray-500">{{ user?.email }}</p>
            </div>
        </div>
        <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul class="flex flex-wrap -mb-px">
                <li>
                    <router-link 
                        :to="{name: 'userProfile'}"
                        class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        active-class="inline-block p-4 text-primary-600 border-b-2 border-primary-600 rounded-t-lg active dark:text-primary-500 dark:border-primary-500"
                    >
                        Overview
                    </router-link>
                </li>
                <li>
                    <router-link 
                        :to="{name: 'userSettings'}"
                        class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        active-class="inline-block p-4 text-primary-600 border-b-2 border-primary-600 rounded-t-lg active dark:text-primary-500 dark:border-primary-500"
                    >
                        Account Settings
                    </router-link>
                </li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
    
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useErrorHandler } from '../../composables/useErrorHandler';
import { useUserStore } from '../../stores/UserStore';
import { storeToRefs } from 'pinia';

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const { handleApiError } = useErrorHandler()
const userStore = useUserStore()
const { isLoading, user } = storeToRefs(userStore)

onMounted( async () => {
    try {
        await userStore.getById(props.id)
    } catch (error) {
        handleApiError(error)
    }
})

</script>