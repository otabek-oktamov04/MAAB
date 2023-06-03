import {AxiosRequestConfig, Method} from 'axios'
import {useNotification} from '../../contexts/notification.context'
import {authAPI} from '../../http'
import {useAuthContext} from '../../contexts'

interface Config extends AxiosRequestConfig {
  requiresAuth?: boolean
}

interface FetchParams {
  url: string
  method: Method
  data?: any
  config?: Config
}

const useFetch = () => {
  const {showError} = useNotification()
  const {updateRefreshToken} = useAuthContext()
  const sendRequest = async ({url, method, data, config}: FetchParams) => {
    try {
      const response = await authAPI.request({
        url,
        method,
        data,
        ...config,
      })
      return response.data
    } catch (error: any) {
      if (error.response.data.errors[0].code === 'TOKEN_INVALID_OR_EXPIRED') {
        updateRefreshToken()
      } else {
        showError(error.response.data.errors[0].message)
      }
      throw error
    }
  }

  const get = async (url: string, config?: Config) => {
    return sendRequest({url, method: 'get', config})
  }

  const post = async (url: string, data?: any, config?: Config) => {
    return sendRequest({url, method: 'post', data, config})
  }

  const patch = async (url: string, data?: any, config?: Config) => {
    return sendRequest({url, method: 'patch', data, config})
  }

  const remove = async (url: string, config?: Config) => {
    return sendRequest({url, method: 'delete', config})
  }

  return {get, post, patch, remove}
}

export default useFetch
