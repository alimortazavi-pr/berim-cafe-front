import { Modal, Button, Input, Loading, FormElement } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";

//Types
import { signUpAndSignInModalProps } from "@/common/types/auth.type";
import { ISignInForm } from "@/common/interfaces/auth.interface";

//Redux
import { useAppDispatch } from "@/store/hooks";
import { signIn } from "@/store/auth/actions";

//Tools
import convertToPersian from "num-to-persian";
import oneToTwoNumber from "one-to-two-num";
import { toast } from "react-toastify";
import { Formik, FormikErrors } from "formik";
import convertAPToEnglish from "ap-to-english";

//Validators
import { signInValidator } from "@/validators/authValidator";

export default function SignInModal({
  setVisible,
  setVisibleGetMobile,
  bindings,
  mobile,
  counter,
  requestCode,
}: signUpAndSignInModalProps) {
  //Redux
  const dispatch = useAppDispatch();

  //States
  const [form, setForm] = useState<ISignInForm>({
    mobile: "",
    code: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  //Effects
  useEffect(() => {
    if (mobile) {
      setForm({ ...form, mobile: mobile as string });
    }
  }, [mobile]);

  //Functions
  function closeHandler() {
    setVisible(false);
  }

  function codeInputHandler(
    e: ChangeEvent<FormElement>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<ISignInForm>>
  ) {
    if (!e.target.value) {
      setFieldValue(
        "code",
        convertToPersian(convertAPToEnglish(e.target.value.replace(/\,/g, "")))
      );
    } else if (
      !convertAPToEnglish(e.target.value.replace(/\,/g, "")).match(/^-?\d+$/)
    ) {
      return;
    } else {
      setFieldValue(
        "code",
        convertToPersian(convertAPToEnglish(e.target.value.replace(/\,/g, "")))
      );
    }
  }

  async function formSubmitHandler(values: ISignInForm) {
    setIsLoading(true);
    try {
      await dispatch(
        signIn({
          ...values,
          mobile: convertAPToEnglish(values.mobile),
          code: convertAPToEnglish(values.code),
        })
      );
      toast.success("ورود با موفقیت انجام شد", {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
      closeHandler();
    } catch (err: any) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
    }
  }

  return (
    <Modal
      closeButton
      animated={true}
      {...bindings}
      className="cursor-default bg-[url('../images/auth-pattern.png')] bg-cover relative"
    >
      <div className="w-full h-full bg-white/95 absolute top-0 z-0"></div>
      <div className={"my-5 mx-5 z-10"}>
        <div className="font-semibold mb-4 text-2xl">
          <span>ورود</span>
        </div>
        <Formik
          onSubmit={formSubmitHandler}
          initialValues={form}
          validationSchema={signInValidator}
          enableReinitialize={true}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center mb-5"
            >
              <div className="text-right w-full mb-3">
                <Input
                  bordered
                  width="100%"
                  disabled
                  label="شماره موبایل"
                  placeholder="مثلا: ۰۹۱۲۳۲۱۱۲۱۲"
                  status={touched.mobile && errors.mobile ? "error" : undefined}
                  color={touched.mobile && errors.mobile ? "error" : undefined}
                  helperColor={
                    touched.mobile && errors.mobile ? "error" : undefined
                  }
                  helperText={
                    touched.mobile && errors.mobile ? errors.mobile : undefined
                  }
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mobile}
                  name="mobile"
                  contentRightStyling={false}
                  contentRight={
                    <Button
                      auto
                      disabled={counter.status && isLoading}
                      onClick={() => {
                        setVisible(false);
                        setVisibleGetMobile(true);
                      }}
                    >
                      ویرایش
                    </Button>
                  }
                />
              </div>
              <div className="text-right w-full mb-3">
                <Input
                  bordered
                  width="100%"
                  label="کدتایید"
                  placeholder="مثلا: ۴۲۳۶۷۳"
                  status={touched.code && errors.code ? "error" : undefined}
                  color={touched.code && errors.code ? "error" : undefined}
                  helperColor={
                    touched.code && errors.code ? "error" : undefined
                  }
                  helperText={
                    touched.code && errors.code ? errors.code : undefined
                  }
                  type="text"
                  onBlur={handleBlur}
                  onChange={(e) => codeInputHandler(e, setFieldValue)}
                  value={values.code}
                  name="code"
                  contentRightStyling={false}
                  contentRight={
                    counter.status ? (
                      <div className="px-2 w-full rounded-[0.75rem] h-[40px] bg-blue-100 flex justify-center items-center">
                        <span className="text-sm font-semibold text-black">
                          {convertToPersian(
                            oneToTwoNumber(Math.floor(counter.value / 60)) +
                              ":" +
                              oneToTwoNumber(Math.floor(counter.value % 60))
                          )}
                        </span>
                      </div>
                    ) : (
                      <Button
                        auto
                        disabled={counter.status && isLoading}
                        onClick={() => requestCode(values.mobile as string)}
                      >
                        در خواست مجدد کد
                      </Button>
                    )
                  }
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-2"
                disabled={isLoading}
                color="success"
                size={"lg"}
                shadow
                bordered
              >
                <span className={`${isLoading ? "hidden" : "block"}`}>
                  ورود
                </span>
                <Loading
                  hidden={!isLoading}
                  type="points"
                  color="currentColor"
                  size="sm"
                />
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
