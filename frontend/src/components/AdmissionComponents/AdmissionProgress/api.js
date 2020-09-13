import Axios from "axios";
import {
    API_ADMISSION_ACADEMIC_INFO, API_ADMISSION_DECLARATION,
    API_ADMISSION_PAYMENT_INFO,
    API_ADMISSION_PRESONAL_INFO,
    baseURL
} from "../../../constant";

const PersonalInfoApi = Axios.create({baseURL: baseURL + API_ADMISSION_PRESONAL_INFO})
const AcademicInfoApi = Axios.create({baseURL: baseURL + API_ADMISSION_ACADEMIC_INFO})
const PaymentInfoApi = Axios.create({baseURL: baseURL + API_ADMISSION_PAYMENT_INFO})
const DeclarationApi = Axios.create({baseURL: baseURL + API_ADMISSION_DECLARATION})

export {PersonalInfoApi, AcademicInfoApi, PaymentInfoApi, DeclarationApi}