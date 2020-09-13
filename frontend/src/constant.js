/**Api Routes */
export const baseURL = process.env.NODE_ENV === "development" ? "http://localhost/kncs-website/backend" : "/portal/api"
export const API_WEBSITE_SETTINGS = "/settings"
export const API_ROUTE_LOGIN = '/login';
export const API_ADMISSION = '/admission'
export const API_ADMISSION_PRESONAL_INFO = API_ADMISSION + '/process/personal_info'
export const API_ADMISSION_ACADEMIC_INFO = API_ADMISSION + '/process/academic_info'
export const API_ADMISSION_PAYMENT_INFO = API_ADMISSION + '/process/payment_info'
export const API_ADMISSION_DECLARATION = API_ADMISSION + '/process/declaration'

export const ADMIN_ADMISSION_DETAILS = "/admin/admission/details"
export const ADMIN_PAYMENT_CONFIRM = "/admin/admission/payment"
export const ADMIN_ADMISSION_SELECTION = "/admin/admission/select"
export const ADMIN_ADMISSION_DELETE = "/admin/admission/delete"
export const ADMIN_SCHOOL_CLASS = "/admin/school/class"
export const ADMIN_SCHOOL_SUBJECT = "/admin/school/subject"

/**Other Constant */
export const networkStates = {IDLE: 11110, BUSY: 11111, ERROR: 11112}
export const networkButtonTypes = {SAVE_NEXT: 74100, SUBMIT: 74101, SEARCH: 74102}
export const ADMISSION_PROGRESS = ['personal_info', 'academic_info', 'payment_info', 'declaration']
export const DASHBOARD_TYPE = ['student', 'teacher', 'admin']
export const ADMIN_SCHOOL_ROUTES_BASE = '/admin/school'
export const ADMIN_SCHOOL_ROUTES = ['classes', 'subjects']
export const RECAPTCHA_SITE_KEY = '6LdTUK0ZAAAAAG71t-pY6p2S57TMe0-Lb0wLKqoy'

/** Default Constant**/
export const SCHOOL_NAME = "Krishnath College School"
export const SCHOOL_NAME_SHORT = "KNCS"
export const HOME_REDIRECT_TO_LOGIN = true

export const APP_DEFAULT_SETTINGS = {
    ADMISSION_ON: "false"
}