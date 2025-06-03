function Validation(values)
{
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@].[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const phoneNumberPattern = /^\d{10}$/;

    if(values.fname === "")
        error.fname = 'First name Should not be empty'
    else
        error.fname = ""

    if(values.lname === "")
        error.lname = 'First name Should not be empty'
    else
        error.lname = ""

    if(values.phonenumber === "")
        error.phonenumber = 'First name Should not be empty'
    else if(!(phoneNumberPattern.test(values.phonenumber)))
        error.phonenumber = 'Invalid phone number';
    else
        error.phonenumber = ""
    
    if(values.email === "")
        error.email = 'Email Should not be empty'
    else if(!email_pattern.test(values.email))
        error.email = "Invalid Email"
    else
        error.email = ""

    if(values.password === "")
        error.password = 'Password should not be empty'
    else if (!password_pattern.test(values.password))
        error.password = 'Password did not match'
    else
        error.password = ""
    return error;
}
export default Validation;