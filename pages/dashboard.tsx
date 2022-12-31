import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";

import styles from "../styles/pageStyles/dashboard.module.scss";

type Props = {};

type loggedInUserType = {
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber: string;
  photoURL: string;
  tenantId: string;
  uid: string;
};

const Dashboard = (props: Props) => {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState<loggedInUserType>({
    displayName: "",
    email: "",
    emailVerified: false,
    phoneNumber: "",
    tenantId: "",
    uid: "",
    photoURL: "",
    isAnonymous: false,
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedInUser({
        uid: user.uid as string,
        email: user.email as string,
        displayName: user.displayName as string,
        emailVerified: user.emailVerified as boolean,
        phoneNumber: user.phoneNumber as string,
        tenantId: user.tenantId as string,
        photoURL: user.photoURL as string,
        isAnonymous: user.isAnonymous as boolean,
      });
    } else {
      setLoggedInUser({
        displayName: "",
        email: "",
        emailVerified: false,
        phoneNumber: "",
        tenantId: "",
        uid: "",
        photoURL: "",
        isAnonymous: false,
      });
    }
  });

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
