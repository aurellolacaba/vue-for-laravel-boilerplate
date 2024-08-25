import axios from "axios";
import { AuthService } from "./AuthService";

export class Http {
    constructor (status) {
        this.isAuth = status && status.auth ? status.auth : false
        this.instance = axios.create({
          baseURL: import.meta.env.VITE_API_BASE_URL
        })
    
        return this.init()
      }
    
    init () {
        if (this.isAuth) {
          this.instance.interceptors.request.use(request => {
            request.headers.authorization = AuthService.getBearer()
            //TODO: do function to handle if access token expired and refreshToken is exist >> go to API and get new access token
            return request
          }, error => {
            return Promise.reject(error)
          })
        }
    
        return this.instance
    }
}