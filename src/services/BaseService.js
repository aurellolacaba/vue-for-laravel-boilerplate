import { Http } from "./http.init";
import { ResponseWrapper, ErrorWrapper, DataWrapper } from './util'

export class BaseService {
    static get entity () {
        throw new Error('entity getter not defined')
    }

    static request (status = { auth: false }) {
        return new Http(status)
    }

    static responseWrapper (...rest) {
        return new ResponseWrapper(...rest)
    }

    static errorWrapper (...rest) {
        return new ErrorWrapper(...rest)
    }

    /**
     * ------------------------------
     * @API_CALLS_PUBLIC
     * ------------------------------
     * 
     */
    static async get(parameters = {})
    {
        
        const params = { ...parameters }

        try {
          const response = await this.request({auth: true}).get(this.entity, { params })

          return new ResponseWrapper(response, new DataWrapper(response.data));
        } catch (error) {
            throw new ErrorWrapper(error);
        }
    }

    static async getById (id) {
        // assert.id(id, { required: true })
    
        try {
          const response = await this.request({ auth: true }).get(`${this.entity}/${id}`)
          return new ResponseWrapper(response, response.data)
        } catch (error) {
          const message = error.response.data ? error.response.data.error : error.response.statusText
          throw new ErrorWrapper(error, message)
        }
    }
    
      static async create (data = {}) {
        // assert.object(data, { required: true })
    
        try {
          const response = await this.request({ auth: true }).post(`${this.entity}`, data)
          return new ResponseWrapper(response, response.data.data)
        } catch (error) {
          throw new ErrorWrapper(error)
        }
    }
    
      static async update (id, data = {}) {
        // assert.id(id, { required: true })
        // assert.object(data, { required: true })
    
        try {
          const response = await this.request({ auth: true }).patch(`${this.entity}/${id}`, data)
          return new ResponseWrapper(response, response.data.data)
        } catch (error) {
          throw new ErrorWrapper(error)
        }
    }
    
      static async remove (id) {
        // assert.id(id, { required: true })
    
        try {
          const response = await this.request({ auth: true }).delete(`${this.entity}/${id}`)
          return new ResponseWrapper(response, response.data)
        } catch (error) {
          throw new ErrorWrapper(error)
        }
    }
}