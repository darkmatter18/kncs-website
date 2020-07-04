/**
 * Mail Validation Function
 * @param mail - Email id
 * @returns {boolean} - Mail id or not
 */
export const ValidateEmail = (mail) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}