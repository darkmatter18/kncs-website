import Axios from "axios";
import {API_ROUTE_LOGIN, baseURL} from "../../constant";

const LoginApi = Axios.create({baseURL: baseURL + API_ROUTE_LOGIN})

export default LoginApi