import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/NavBar.module.css";
const Nav = () => {

  const [toggle,setToggle]=useState(false);
  const quantity = useSelector(state=>state.cart.quantity)
  return (
    <div>
 
      <nav className={styles.nav_bar}>
      <div className={styles.hamburgerContainer}>
        <div onClick={()=>{setToggle(!toggle)}} className={styles.hamburger}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
        </div>
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/logo.svg" width={100} height={65} alt="logo" />
          </Link>
        </div>
        <div className={toggle?styles.respnav:styles.hidden}>
        <Link href="/">
            <a onClick={()=>{setToggle(!toggle)}}>Home</a>
          </Link>
          <Link href="/store">
            <a onClick={()=>{setToggle(!toggle)}}>Store</a>
          </Link>
          <Link href="/upcoming">
            <a onClick={()=>{setToggle(!toggle)}}> UpComing</a>
          </Link>
          <Link href="/aboutus">
            <a onClick={()=>{setToggle(!toggle)}}>About Us</a>
          </Link>
      </div>
        <div className={styles.links}>
          
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/store">
            <a>Store</a>
          </Link>
          <div className={styles.text}>
            <Link href="/">
              <h1>Sneaker Society</h1>
            </Link>
          </div>
          <Link href="/upcoming">
            <a>UpComing</a>
          </Link>
          <Link href="/aboutus">
            <a>About Us</a>
          </Link>
        </div>
        <Link href="/cart">
        <div className={styles.cart}>
            <Image src="/cart.svg" width={45} height={45} />
            <div className={styles.counter}>{quantity}</div>
        </div>
        </Link>
      </nav>
    </div>
  );
};

export default Nav;
