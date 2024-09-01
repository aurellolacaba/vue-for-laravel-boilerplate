import { defineStore } from "pinia";
import { ref } from "vue";
import { UserService } from "../services/UserService";

export const useUserStore = defineStore('userProfile', () => {
    const isLoading = ref(false)
    const user = ref(null)

    const getById = async (id) => {
        try {
            isLoading.value = true
            const response = await UserService.getById(id)
            user.value = response.data.data
        } catch (error) {
            throw error
        } finally {
            isLoading.value = false
        }
    }

    return {
        isLoading,
        user,
        getById
    }
})