import { object, string } from "yup";

const messages = {
  email: "Please enter a valid email address",
  pass: "Password can't be blank",
};

let validation = object({
  email: string()
    .email(messages.email) // Email format doğrulaması
    .required("Email is required"), // Zorunlu alan mesajı
  password: string()
    .required(messages.pass), // Şifre için doğrulama
});

export default validation;
