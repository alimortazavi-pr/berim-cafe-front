import * as yup from "yup";

export const getMobileValidator = yup.object().shape({
  mobile: yup
    .string()
    .required("لطفا شماره موبایل خود را وارد کنید")
    .min(11, "فرمت شماره موبایل نادرست است")
    .max(11, "فرمت شماره موبایل نادرست است"),
});

export const signUpValidator = yup.object().shape({
  firstName: yup.string().required("لطفا نام خود را وارد کنید"),
  lastName: yup.string().required("لطفا نام خانوادگی خود را وارد کنید"),
  mobile: yup
    .string()
    .required("لطفا شماره موبایل خود را وارد کنید")
    .min(11, "فرمت شماره موبایل نادرست است")
    .max(11, "فرمت شماره موبایل نادرست است"),
  code: yup.string().min(6, "کدتایید حداقل باید ۸ حرف باشد"),
});

export const signInValidator = yup.object().shape({
  mobile: yup
    .string()
    .required("لطفا شماره موبایل خود را وارد کنید")
    .min(11, "فرمت شماره موبایل نادرست است")
    .max(11, "فرمت شماره موبایل نادرست است"),
  code: yup.string().min(6, "کدتایید حداقل باید ۸ حرف باشد"),
});
