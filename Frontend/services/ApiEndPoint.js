import axios from 'axios'

const instance =axios.create({
    baseURL:'http://localhost:4001',
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials:true
})

export const get=(url,params)=>instance.get(url,{params})

export const post=(url,data)=>instance.post(url,data)

export const put=(url,data)=>instance.put(url,data)
export const dele=(url)=>instance.delete(url)