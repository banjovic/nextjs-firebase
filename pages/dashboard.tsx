import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";

import styles from "../styles/pageStyles/dashboard.module.scss";

type Props = {};

type loggedInUserType = {
  accessToken: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
};

const Dashboard = (props: Props) => {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState<loggedInUserType>({
    accessToken: "",
    displayName: "",
    email: "",
    emailVerified: false,
    phoneNumber: "",
  });
  console.log("loggedInUser", loggedInUser);

  onAuthStateChanged(auth, (user) => setLoggedInUser(user));

  const onClickLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className={styles["dashboard-container"]}>
      <div>Hi {loggedInUser?.email}</div>

      <div>
        <button onClick={onClickLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
