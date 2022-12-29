import React from "react";

import styles from "../styles/pageStyles/authStyles.module.scss";

import SignUpAnimation from "../assets/svg/computer-signup.svg";

type Props = {};

const Signup = (props: Props) => {
  return (
    <div className={styles["signup-container"]}>
      <div className={styles["signup-svg"]}>
        <div className={styles["signup-svg-text-wrapper"]}>
          <h2>First Tryout</h2>
          <div>
            Next Js with Firebase <span>for authentication</span>
          </div>
        </div>

        <SignUpAnimation />
      </div>

      <div className={styles["signup-content-wrapper"]}></div>
    </div>
  );
};

export default Signup;
