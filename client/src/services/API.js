import Axios from "axios"

const API = Axios.create({
    baseURL: "http://localhost:5005"
})

export default API