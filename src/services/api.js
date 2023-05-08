import axios from 'axios'

const apiCodeBurger = axios.create({
    baseURL: 'https://code-burger-back-end.vercel.app'
})

apiCodeBurger.interceptors.request.use(async config => {
    const userData = await localStorage.getItem('codeburger:userData')
    const token = userData && JSON.parse(userData).token
    config.headers.authorization = `Bearer ${token}`

    return config
})

export default apiCodeBurger
