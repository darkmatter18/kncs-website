import Axios from "axios";

const Api = Axios.create({baseURL: '/portal/api'})

export default Api