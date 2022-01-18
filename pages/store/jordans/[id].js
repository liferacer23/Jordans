import { useState } from "react";
import dbConnect from "../../../util/mongo";
import Jordan from "../../../models/Jordan";
import Image from "next/image";
import styles from "../../../styles/SelectedJordan.module.css";
export default function SelectedJordan({ jordans }) {
  const [shoePrice, setShoePrice] = useState(jordans.prices[0]);
  // const [extra,setExtra]=useState(jordans.extraOptions[0].price);
  const [toggle, setToggle] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        {jordans.image.map((data, index) => {
          return (
            <div className={styles.image} key={index}>
              <Image src={data} width={350} height={350} />
            </div>
          );
        })}
      </div>

      <form className={styles.form}>
        <div className={styles.infoSection}>
          <h1 className={styles.title}>{jordans.title}</h1>
          <h2>Price {shoePrice}$</h2>
          <p>{jordans.description}</p>

          <h3 className={styles.size}>Please select your size</h3>
          <div>
            {jordans.prices.map((price, index) => {
              let pricerange1 = 6;
              let pricerange2 = 10;
              if (index === 1) {
                pricerange1 += 4;
                pricerange2 += 2;
              } else if (index === 2) {
                pricerange1 += 6;
                pricerange2 += 5;
              }
              return (
                <div key={index} className={styles.prices}>
                  <input
                    checked={shoePrice === price ? "checked" : ""}
                    onChange={() => {
                      setShoePrice(price);
                    }}
                    type="radio"
                    id={index}
                    name="shoesize"
                    value={price}
                  />
                  <label htmlFor={index}>
                    Size {pricerange1}-{pricerange2} &ensp; {price}$
                  </label>
                </div>
              );
            })}
          </div>
          <h3 className={styles.extraOptionsHeader}>Extra Options</h3>
          {jordans.extraOptions.map((data, index) => {
            return (
              <div key={index} className={styles.extraOptions}>
                <input
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                  type="checkbox"
                  id="extraOptions"
                  name="extraOptions"
                  value={data.price}
                />
                <label htmlFor="extraOptions">
                  {data.text} {data.price}$
                </label>
              </div>
            );
          })}
          <div className={styles.add}>
            <h3 className={styles.quantityHeader}>Quantity</h3>
            <input type="number" defaultValue={1} className={styles.quantity} />
          </div>
          <div className={styles.submit}>
            <button type="submit">Add To Cart</button>
          </div>
        </div>
      </form>
    </div>
  );
}
export const getServerSideProps = async ({ params }) => {
   await dbConnect();
  const id = JSON.parse(JSON.stringify(params));

  const jordan = await Jordan.findById(id.id);

  // const HOST = process.env.APP_URL
  //const res = await axios.get(`${HOST}/api/jordans`);

  return {
    props: {
      jordans: JSON.parse(JSON.stringify(jordan)),
    },
  };
};
