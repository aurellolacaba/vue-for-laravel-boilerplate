import { defineStore } from "pinia";
import { AuthService } from "../services/AuthService";
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";

const token = useLocalStorage('access_token', null)

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const isProcessing = ref(false)
    const errors = ref('')
 
    const fetchUser = async () => {
        try {
            isProcessing.value = true
            const response = await AuthService.fetchUser()
            user.value = response.data
        } catch (error) {
            console.log(error)

            throw error
        } finally {
            isProcessing.value = false
        }
    }

    const login = async ({email, password}) => {
        try {
            // isProcessing.value = true
            const response = await AuthService.login({email, password})
            user.value = response.data.user
            // errors.value = ''
        } catch (error) {
            // errors.value = error.errors;
            throw error
        } 
        // finally {
        //     isProcessing.value = false
        // }
    }

    if (token.value !== null) {
        fetchUser()
    }

    return {
        errors,
        isProcessing,
        user,
        login
    }
})