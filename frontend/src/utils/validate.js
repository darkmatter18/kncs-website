/**
 * Mail Validation Function
 * @param mail - Email id
 * @returns {boolean} - Mail id or not
 */
export const ValidateEmail = (mail) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}
/**
 * Name Validation Function
 * @param name - Person name
 * @returns {boolean} - Validations Status
 */
export const ValidateName = (name) => {
    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(name);
}

/**
 * Aadhar Number Verification
 * @param aadhar_num
 * @returns {boolean}
 */
export const validateAadhar = (aadhar_num) => {
    return /^\d{4}\d{4}\d{4}$/g.test(aadhar_num)
}
/**
 * Mobile Number Verification
 * @param mobileNum
 * @returns {boolean}
 */
export const validateMobileNo = (mobileNum) => {
    return /^[6-9]\d{9}$/.test(mobileNum)

}