/**
 * Validates an email address.
 * @function validateEmail
 * @param {string} email - The email address to be validated.
 * @returns {boolean} Returns true if the email is valid, false otherwise.
 */
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

 /**
 * Validates two passwords to ensure they match and have a valid length.
 * @function validatePasswords
 * @param {string} password - The password to be validated.
 * @param {string} repeatpassword - The password to be repeated and validated.
 * @returns {boolean} Returns true if the passwords match, false otherwise.
 */
function validatePasswords(password, repeatpassword){
    if(password === repeatpassword)
      return true;
      else
      return false;
  }

/**
 * Validates a password to ensure it has a valid length.
 * @function validatePasswordLength
 * @param {string} password - The password to be validated.
 * @returns {boolean} Returns true if the password has a valid length, false otherwise.
 */
function validatePasswordLength(password){
    if(password.length > 7 && password.length < 100)
    return true;
    else
    return false;
}

/**
 * Validates a date to ensure the user is 18 years or older.
 * @function validateDate
 * @param {string} date1 - The date to be validated.
 * @returns {boolean} Returns true if the user is 18 years or older, false otherwise.
 */
function validateDate(date1){
 
      const currentDate = new Date();
      const selectedDate = new Date(date1);

      if(Number(currentDate.getFullYear() - selectedDate.getFullYear()) >= 18){
        return true;
      }else{
        return false;
      }
}

/**
 * Validates a name to ensure it has a valid length.
 * @function validateNameLength
 * @param {string} name - The name to be validated.
 * @returns {boolean} Returns true if the name has a valid length, false otherwise.
 */
function validateNameLength(name){
    if(name.length < 255)
    return true;
    else
    return false;
}



  