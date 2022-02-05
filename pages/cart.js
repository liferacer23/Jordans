import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tr className={styles.tr}>
            <th>Shoe</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>

          {cart.shoes.map((shoe, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className={styles.imageContainer}>
                    <Image  key={index} src={shoe.image[0]} width={100} height={120} />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{shoe.title}</span>
                </td>
                <td>
                  {shoe.extraOptions.map((data,index)=>{
                    return(
                      
                    <h4 key={index} className={styles.extras}>{data.text}</h4>
                    
                    )
                  })}
                  </td> 
                
                <td>
                  <span className={styles.price}>{shoe.FinalPrice} $</span>
                </td>
                <td>
                  <span className={styles.quantity}>{shoe.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>{shoe.FinalPrice} $</span>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>CART TOTAL</h1>
          <div className={styles.subTotalText}>
            <b className={styles.subTotalTextTitle}>Subtotal</b>${cart.total}
          </div>
          <div className={styles.discount}>
            <b className={styles.discountTextTitle}>Discount</b>$0
          </div>
          <div className={styles.total}>
            <b className={styles.totalTextTitle}>Total</b>${cart.total}
          </div>
          <button className={styles.button}>CHECKOUT NOW!!</button>
        </div>
      </div>
    </div>
  );
}
/* 
export const getServerSideProps = async () => {
  dbConnect();
  const jordan = await Jordan.find();

  // const HOST = process.env.APP_URL
  //const res = await axios.get(`${HOST}/api/jordans`);

  return {
    props: {
      jordans: JSON.parse(JSON.stringify(jordan)),
    },
  };
}; */
