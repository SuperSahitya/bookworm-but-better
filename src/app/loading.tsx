import React from "react";
import styles from "./loading.module.css";

const Loading = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.loader}></div>
        <div className={styles.loading}>Loading</div>
      </div>
    </>
  );
};

export default Loading;
