import { z } from "zod";
// validating password input by zod and regex 
const passwordRules = z.
string().
min( 8 , "Password must be at least 8 characters long" ).
regex( /[A-Z]/ , "Password must contain at least one uppercase letter" ).
regex( /[a-z]/ , "Password must contain at least one lowercase letter" ).
regex( /[0-9]/ , "Password must contain at least one number" ).
regex( /[@$!%*?&#]/ , "Password must contain at least a special letter");


// exporting our defined input pattern object to validate incoming signup data in req.body
export const signupSchema = z.object({
    name : z.string().trim().min( 2 , "Name should contain minimum 2 characters"),
    email : z.string().toLowerCase().trim().email("Enter a valid email,example - user@domain.com"),
    password : passwordRules,
});

// exporting reset password input pattern to validate new entered pass by user

export const resetPassword = z.object({password : passwordRules});


export const loginCheck = z.object ({ // to just verify login input format
    email : z.string().toLowerCase().trim().email("Enter a valid email,example - user@domain.com"),
    password : z.string().min(1 , "Invalid password") // password format check is required coz if attacker sends data as raw JSON request via Postman/curl etc
});

export const otpValidator = z.object({
    email : z.string().toLowerCase().trim().email("Some error occured please signup again"),
    otp : z.string().trim().regex( /^[ 0 - 9 ]{ 6 }$/ , "OTP must be a 6 digit number") // character class[ 0 - 9 ] checks each digit of input OTP should be between 0-9 and { 6 } checks whether input OTP is of  numerical 6 digit b/w 0 to 9  or not ^ and $ marks the start and end of input otp respectively. 
}); 



