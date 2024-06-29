import {POST} from './core'

export const getEndpointWithPrefix = (endpoint) => {
    return `auth/${endpoint}`
}

export const loginApi = (data) => {
    const endpoint =  getEndpointWithPrefix('login')
    return POST(endpoint, data)
}

export const signupApi = (data) => {
    const endpoint =  getEndpointWithPrefix('signup')
    return POST(endpoint, data)
}