import axios from "axios"

//todo: colocar a porta em .env
export const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    }
})
