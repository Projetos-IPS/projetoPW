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
 
      const currentDate = new Date();
      const selectedDate = new Date(date1);

      if(Number(currentDate.getFullYear() - selectedDate.getFullYear()) >= 18){
        return true;
      }else{
        return false;
      }
  }

  function validateNameLength(name){
    if(name.length < 255)
    return true;
    else
    return false;
  }



  