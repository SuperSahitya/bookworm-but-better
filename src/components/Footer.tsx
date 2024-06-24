import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerHeading}>
        <span className={styles.span}>&#169;</span>&nbsp; 2024 &nbsp;
        <Image
          src="/leaf.svg"
          alt="bookworm logo"
          className={styles.image}
          height={32}
          width={32}
        ></Image>
        <div className={styles.name}>Bookworm</div>
      </div>
      <div className={styles.hide}>|</div>
      <div className={styles.made}>
        Made with &nbsp;<FaHeart className={styles.icon}></FaHeart>
      </div>
    </div>
  );
};

export default Footer;
