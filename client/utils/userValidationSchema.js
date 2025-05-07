import * as Yup from "yup";
export const userValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username length should be >3")
    .max(8, "Username length should le <8")
    .required("Required"),
  password: Yup.string()
    .min(5, "Username length should be >5")
    .max(20, "Username length should le <20")
    .required("Required"),
});
