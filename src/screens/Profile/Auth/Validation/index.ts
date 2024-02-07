import { object, string } from "yup";

const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordHelperText = `the password should has at least one lowercase letter, one uppercase letter,
and a minimum length of 8 characters.`;

const emailRegx = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,}$/;
const emailHelperText = "Email should be like first.last@subdomain.example.net";

export const signUp = object({
  "User Name": string().required("Please Enter Your User Name"),
  Email: string()
    .email(emailHelperText)
    .matches(emailRegx, emailHelperText)
    .required(),
  Password: string()
    .matches(passwordRegx, passwordHelperText)
    .required(passwordHelperText),
});

export const logIn = object({
  Email: string()
    .email(emailHelperText)
    .matches(emailRegx, emailHelperText)
    .required(),
  Password: string()
    .matches(passwordRegx, passwordHelperText)
    .required(passwordHelperText),
});
