import Axios from "axios";
import {API_ADMISSION, baseURL} from "../../constant";

const AdmissionApi = Axios.create({baseURL: baseURL + API_ADMISSION})

export default AdmissionApi