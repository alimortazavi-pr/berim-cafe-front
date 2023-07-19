import {
  Modal,
  Button,
  Input,
  Loading,
  FormElement,
  useModal,
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";

//Types
import { getMobileModalProps } from "@/common/types/auth.type";
import { IGetMobileFrom } from "@/common/interfaces/auth.interface";
import { toast } from "react-toastify";

//Redux
import { useAppDispatch } from "@/store/hooks";
import { checkMobileExist, requestNewCode } from "@/store/auth/actions";

//Components
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";

//Tools
import { Formik, FormikErrors } from "formik";
import convertAPToEnglish from "ap-to-english";

//Validators
import { getMobileValidator } from "@/validators/authValidator";
import convertToPersian from "num-to-persian";

export default function GetMobileModal({
  setVisible,
  bindings,
}: getMobileModalProps) {
  //Redux
  const dispatch = useAppDispatch();

  //NextUI
  const { setVisible: setVisibleSignUp, bindings: bindingsSignUp } = useModal();
  const { setVisible: setVisibleSignIn, bindings: bindingsSignIn } = useModal();

  //States
  const [form, setForm] = useState<IGetMobileFrom>({
    mobile: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState<{ value: number; status: boolean }>({
    value: 120,
    status: true,
  });

  //Functions
  function mobileInputHandler(
    e: ChangeEvent<FormElement>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<IGetMobileFrom>>
  ) {
    if (!e.target.value) {
      setFieldValue(
        "mobile",
        convertToPersian(convertAPToEnglish(e.target.value.replace(/\,/g, "")))
      );
    } else if (
      !convertAPToEnglish(e.target.value.replace(/\,/g, "")).match(/^-?\d+$/)
    ) {
      return;
    } else {
      setFieldValue(
        "mobile",
        convertToPersian(convertAPToEnglish(e.target.value.replace(/\,/g, "")))
      );
    }
  }

  function closeHandler() {
    setVisible(false);
  }

  async function requestCode(mobile: string) {
    window.clearInterval((window as any).counterInterval);
    setIsLoading(true);
    try {
      await dispatch(requestNewCode(convertAPToEnglish(mobile)));
      toast.success("کدتایید برای شما ارسال شد", {
        position: toast.POSITION.TOP_CENTER,
      });
      calculatingCounter(120);
      setIsLoading(false);
    } catch (err: any) {
      calculatingCounter(counter.value);
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
    }
  }

  function calculatingCounter(time: number) {
    let count: number;
    count = time;
    (window as any).counterInterval = setInterval(() => {
      if (count !== 0) {
        count -= 1;
        setCounter({ status: true, value: count });
      } else {
        setCounter({ value: count, status: false });
        window.clearInterval((window as any).counterInterval);
      }
    }, 1000);
  }

  async function formSubmitHandler(values: IGetMobileFrom) {
    setIsLoading(true);
    try {
      setForm({ ...form, mobile: values.mobile });
      const mustRegister: any = await dispatch(checkMobileExist(values.mobile));
      await requestCode(values.mobile);
      if (mustRegister) {
        setVisibleSignUp(true);
      } else {
        setVisibleSignIn(true);
      }
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
    <div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        animated={true}
        {...bindings}
        className="cursor-default bg-[url('../images/auth-pattern.png')] bg-cover relative"
      >
        <div className="w-full h-full bg-white/95 absolute top-0 z-0"></div>
        <div className={"my-5 mx-5 z-10"}>
          <div className="font-semibold mb-4 text-lg">
            <span>لطفا برای ورود یا ثبت نام شماره موبایل خود را وارد کنید</span>
          </div>
          <Formik
            onSubmit={formSubmitHandler}
            initialValues={form}
            validationSchema={getMobileValidator}
            enableReinitialize={true}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
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
                    label="شماره موبایل"
                    placeholder="مثلا: ۰۹۱۲۳۲۱۱۲۱۲"
                    status={
                      touched.mobile && errors.mobile ? "error" : undefined
                    }
                    color={
                      touched.mobile && errors.mobile ? "error" : undefined
                    }
                    helperColor={
                      touched.mobile && errors.mobile ? "error" : undefined
                    }
                    helperText={
                      touched.mobile && errors.mobile
                        ? errors.mobile
                        : undefined
                    }
                    type="text"
                    onBlur={handleBlur}
                    onChange={(e) => mobileInputHandler(e, setFieldValue)}
                    value={values.mobile}
                    name="mobile"
                    size="lg"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full mt-2"
                  disabled={isLoading}
                  color="success"
                  shadow
                  bordered
                  size={"lg"}
                >
                  <span className={`${isLoading ? "hidden" : "block"}`}>
                    درخواست کدتایید
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
      <SignUpModal
        bindings={bindingsSignUp}
        setVisible={setVisibleSignUp}
        setVisibleGetMobile={setVisible}
        mobile={form.mobile}
        counter={counter}
        requestCode={requestCode}
      />
      <SignInModal
        bindings={bindingsSignIn}
        setVisible={setVisibleSignIn}
        setVisibleGetMobile={setVisible}
        mobile={form.mobile}
        counter={counter}
        requestCode={requestCode}
      />
    </div>
  );
}
