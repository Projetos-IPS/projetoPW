function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  function validatePasswords(password, repeatpassword){
    if(password === repeatpassword && password.length)
      return true;
      else
      return false;
  }
  
  function validatePasswordLength(password){
    if(password.length > 7 && password.length < 100)
    return true;
    else
    return false;
  }

  function validateDate(date1){
    function isDateInFuture(dateString) {
        const selectedDate = new Date(dateString);
        const currentDate = new Date();
      
        return selectedDate > currentDate;
      }
      if (isDateInFuture(date1)) {
        return false;
      } else {
        return true;
      }
  }

  function validateNameLength(name){
    if(name.length < 255)
    return true;
    else
    return false;
  }



  