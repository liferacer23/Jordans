import React from "react";
import styles from "../styles/Home.module.css";
import Slider from "../components/Slider/Slider";
import Header from "../components/Header";
import Link from "next/link";
export default function ItemList({ jordans }) {
  
  return (
    <div>
      <Header />
      <div className={styles.container}>
        {jordans.map((data, index) => {
          return (
            
            <div key={data._id} className={styles.itemContainer}>
              <div className={styles.itemHeader}>
                <h3>{data.title}</h3>

              </div>
              <div className={styles.itemBody}>
              <Slider shoes={data} />
              <div className={styles.details}> 
                <h3>Price ${data.prices[0]}</h3>
                <a className={styles.expand} href={`store/jordans/${data._id}`}>
                  BUY
                </a>
                </div>
              </div>
             
            </div>
          );
        })}
      </div>
    </div>
  );
}
