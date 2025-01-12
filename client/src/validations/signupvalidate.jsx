export const signupvalidate=(values)=>{
    const errors={};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.email){
        errors.email="Email is required"
    }else if(!regex.test(values.email)){
        errors.email="Enter valid email format"
    }
    if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 4) {
        errors.password = "Password must be more than 4 characters";
      } else if (values.password.length > 10) {
        errors.password = "Password cannot exceed more than 10 characters";
      }
      if(values.password!=values.confirmpassword){
        errors.confirmpassword="Password and confirmpassword do not match!"
      }
      return errors;
  }
  