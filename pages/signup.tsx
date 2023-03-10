import React, { useState } from "react";
import { Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";

import styles from "../styles/pageStyles/authStyles.module.scss";

import SignUpAnimation from "../assets/svg/computer-signup.svg";
import { TbWorld } from "react-icons/tb";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

type Props = {};

type MyFormValues = {
  email: string;
  password: string;
};

const Signup = (props: Props) => {
  const router = useRouter();
  const initialValues: MyFormValues = { email: "", password: "" };
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const SignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error: any) {
      console.log("error", error);
      alert(error.message);
    }
  };

  const onClickLogin = () => {
    router.push("/login");
  };

  return (
    <div className={styles["signup-container"]}>
      <div className={styles["signup-svg"]}>
        <div className={styles["signup-svg-text-wrapper"]}>
          <h2 onClick={() => router.push("/")}>V-AUTH</h2>
          <div>
            Next Js with Firebase <span>for authentication</span>
          </div>
        </div>

        <SignUpAnimation />
      </div>

      <div className={styles["signup-content-wrapper"]}>
        <div className={styles["signup-content-container"]}>
          <div className={styles["signup-content-pretext"]}>
            <TbWorld />
            <div>English</div>
          </div>

          <div className={styles["signup-content-auth-title"]}>
            <h2>Create an Account</h2>

            <div>
              Already created an account?{" "}
              <span onClick={onClickLogin}>Click here</span>
            </div>
          </div>

          <div className={styles["signup-content-auth-action-wrapper"]}>
            <div
              className={styles["signup-content-auth-action"]}
              onClick={SignInWithGoogle}
            >
              <FcGoogle />
              <div>Continue with Google</div>
            </div>

            <div className={styles["signup-content-auth-action-option"]}>
              <div className={styles["auth-line"]}></div>
              <div>OR</div>
              <div className={styles["auth-line"]}></div>
            </div>
          </div>

          <div className={styles["form-wrapper"]}>
            <Formik
              initialValues={initialValues}
              validate={(values: MyFormValues) => {
                const errors: any = {};
                if (!values.email) {
                  errors.email = "Email is required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.password) {
                  errors.password = "Password is required";
                } else if (values.password.length < 8) {
                  errors.password = "Password must be at least 8 characters";
                  // Firebase password length is 6 characters - default
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  setLoading(true);
                  const { user } = await createUserWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                  );
                  setLoading(false);
                  router.push("/dashboard");
                } catch (error: any) {
                  setLoading(false);
                  console.log("error", error.message);
                  alert(error.message);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isValid,
                dirty,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className={styles["form-input-wrapper"]}>
                    <div>
                      <label>E-mail address</label>

                      <input
                        type="text"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="Email"
                        required
                        className={
                          errors.email
                            ? styles["email-input-error"]
                            : styles["email-input-field"]
                        }
                      />
                      {errors.email && (
                        <span className={styles["error"]}>{errors.email}</span>
                      )}
                    </div>
                  </div>

                  <div className={styles["form-input-wrapper"]}>
                    <div>
                      <label>Password</label>

                      <div
                        className={
                          errors.password
                            ? styles["input-error"]
                            : styles["input-icon-container"]
                        }
                      >
                        <input
                          type={visible ? "text" : "password"}
                          placeholder="********"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          required
                        />
                        <span onClick={() => setVisible(!visible)}>
                          {visible ? (
                            <AiOutlineEye />
                          ) : (
                            <AiOutlineEyeInvisible />
                          )}
                        </span>
                      </div>
                      {errors.password && (
                        <span className={styles["error"]}>
                          {errors.password}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles["login-btn"]}>
                    <button type="submit">
                      {loading ? "Loading..." : "Create Account"}
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>

        <div className={styles["signup-content-footnote"]}>
          ?? 2022 Victoria Banjo Auth
        </div>
      </div>
    </div>
  );
};

export default Signup;
