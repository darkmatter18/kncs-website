import Axios from "axios";
import {ADMIN_SCHOOL_CLASS, ADMIN_SCHOOL_SUBJECT, baseURL} from "../../../constant";

const classApi = Axios.create({baseURL: baseURL + ADMIN_SCHOOL_CLASS})
const schoolApi = Axios.create({baseURL: baseURL + ADMIN_SCHOOL_SUBJECT})

export {classApi, schoolApi}
