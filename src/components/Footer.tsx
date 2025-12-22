import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import { FaHeart, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.topSection}>
        <div className={styles.brandSection}>
          <div className={styles.logoContainer}>
            <Image
              src="/leaf.svg"
              alt="bookworm logo"
              width={32}
              height={32}
              className={styles.logo}
            />
            <span className={styles.brandName}>Bookworm</span>
          </div>
          <p className={styles.tagline}>Read better, live better.</p>
        </div>

        <div className={styles.linksSection}>
          <div className={styles.linkGroup}>
            <h3 className={styles.linkHeader}>Explore</h3>
            <Link href="/" className={styles.link}>
              Home
            </Link>
            <Link href="/search" className={styles.link}>
              Search
            </Link>
            <Link href="/orders" className={styles.link}>
              Orders
            </Link>
          </div>
          <div className={styles.linkGroup}>
            <h3 className={styles.linkHeader}>Account</h3>
            <Link href="/profile" className={styles.link}>
              Profile
            </Link>
            <Link href="/api/auth/signin" className={styles.link}>
              Login
            </Link>
          </div>
        </div>

        <div className={styles.socialSection}>
          <h3 className={styles.linkHeader}>Connect</h3>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.iconLink}>
              <FaGithub />
            </a>
            <a href="#" className={styles.iconLink}>
              <FaTwitter />
            </a>
            <a href="#" className={styles.iconLink}>
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.bottomSection}>
        <div className={styles.copyright}>
          <span>
            &#169; {new Date().getFullYear()} Bookworm. All rights reserved.
          </span>
        </div>
        <div className={styles.madeWith}>
          Made with <FaHeart className={styles.heartIcon} /> by SuperSahitya
        </div>
      </div>
    </footer>
  );
};

export default Footer;
