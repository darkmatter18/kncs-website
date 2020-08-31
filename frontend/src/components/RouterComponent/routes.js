import {ADMIN_SCHOOL_ROUTES_BASE} from '../../constant';

export const HOME = '/';

export const LOGIN = '/login';
export const DASHBOARD = '/:user_type/dashboard'

export const ADMIN_ADMISSION_SELECTION = '/admin/admission/selection'
export const ADMIN_MANAGE_SCHOOL = ADMIN_SCHOOL_ROUTES_BASE+ '/:school_route'

export const MEET_THE_DEVS = '/devs'
export const ADMISSION_HOME = '/admission'
export const ADMISSION_NEW = '/admission/new'
export const ADMISSION_NEW_DONE = '/admission/new/done'
export const ADMISSION_EXISTING = '/admission/existing'
export const ADMISSION_ALL_DONE = '/admission/done'

// [personal_info, academic_info, payment_info, declaration]
export const ADMISSION_PROGRESS_ROUTE = '/admission/progress/:progress'