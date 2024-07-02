import http from './config'

const service = {
    create: (data) => http.post("/service", data)
}

export default service