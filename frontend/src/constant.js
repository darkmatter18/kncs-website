/**Api Routes */
export const API_ROUTE_LOGIN = '/login';
export const PRE_REGISTRATION = '/preregistration'
export const PRE_REGISTRATION_LOGIN = '/preregistration/login'
export const PRE_REGISTRATION_PRESONAL_INFO = '/preregistration/process/personal_info'
export const PRE_REGISTRATION_ACADEMIC_INFO = '/preregistration/process/academic_info'
export const PRE_REGISTRATION_DECLARATION = '/preregistration/process/declaration'

/**Other Constant */
export const netState = {IDLE: 11110, BUSY: 11111, ERROR: 11112}
export const ADMISSION_PROGRESS = ['personal_info', 'academic_info', 'payment_info', 'declaration']
export const RECAPTCHA_SITE_KEY = '6LdTUK0ZAAAAAG71t-pY6p2S57TMe0-Lb0wLKqoy'