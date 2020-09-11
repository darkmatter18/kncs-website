import Axios from "axios";
import {API_WEBSITE_SETTINGS, baseURL} from "../../constant";

const settingsApi = Axios.create({baseURL: baseURL + API_WEBSITE_SETTINGS})
export default settingsApi