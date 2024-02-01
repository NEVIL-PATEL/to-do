import axios from 'axios'

export const apiInstance = axios.create({
    baseURL: "http://localhost:3004",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    }
})

apiInstance.defaults.timeout = 10000;

apiInstance.interceptors.request.use(async function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})

apiInstance.interceptors.response.use(async function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})