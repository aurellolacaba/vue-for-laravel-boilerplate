import axios from "axios"
import { ResponseWrapper, ErrorWrapper } from "./util"
import { useLocalStorage } from "@vueuse/core";
import { Http } from "./http.init";
import router from "../router";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const token = useLocalStorage('access_token', null)

export class AuthService {
    static async login({email, password}) {
        try {
            const response = await axios.post(
                `${apiBaseUrl}/login`,
                {email, password}
            );
            token.value = response.data.access_token
            
            return new ResponseWrapper(response, response.data);
        } catch (error) {
            // throw error.response
            throw new ErrorWrapper(error);
        }
    }

    static async logout(){
        try {
            await new Http({auth: true}).post('logout')
            token.value = null
            router.push('/login')
        } catch (error) {
            throw new ErrorWrapper(error);
        }
        
    }

    static async fetchUser() {
        try {
            const response = await new Http({auth: true}).get('users/me')

            return new ResponseWrapper(response, response.data.data)
        } catch (error) {
            throw new ErrorWrapper(error);
        } 
    }

    static getBearer(){
        return `Bearer ${token.value}`
    }
}