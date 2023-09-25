import axios from 'axios';

function ApiInstance(authorization = null){
    return axios.create({
        baseURL: "http://localhost:3001/", 
        headers: {
            authorization
        }
    })
}

export const Instance = ApiInstance