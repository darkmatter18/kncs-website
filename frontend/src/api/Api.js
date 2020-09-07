import Axios from "axios";
import {baseURL} from "../constant";

const Api = Axios.create({baseURL: baseURL})

export default Api