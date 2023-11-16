import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  email: yup.string().required,
  password: yup.string().required,
  creationDate: yup.string().required,
});
