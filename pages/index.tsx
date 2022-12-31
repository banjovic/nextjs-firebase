import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div>V-AUTH</div>

      <div>
        <button
          onClick={() => router.push("/signup")}
          className={styles["primary-button"]}
        >
          Sign Up
        </button>
        <button
          onClick={() => router.push("/login")}
          className={styles["secondary-button"]}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
