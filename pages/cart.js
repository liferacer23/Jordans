import styles from "../styles/Cart.module.css";
import Image from "next/image";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const currency = "USD";
  const style = { layout: "vertical" };
  const dispatch = useDispatch();
  const router = useRouter();
  const amount = cart.total;

  const createOrder = async (data) => {
    
    try {
      const res = axios.post("http://localhost:3000/api/orders", data);
      res.status === 201 && router.push("/store/orders/" + res.data._id);
     
      dispatch(reset());
    } catch (err) {
      console.log(err);
    }
  };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Your code here after capture the order
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.tr}>
              <th>Shoe</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {cart.shoes.map((shoe, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className={styles.imageContainer}>
                      <Image
                        key={index}
                        src={shoe.image[0]}
                        width={100}
                        height={120}
                      />
                    </div>
                  </td>
                  <td>
                    <span className={styles.name}>{shoe.title}</span>
                  </td>
                  <td>
                    {shoe.extraOptions.map((data, index) => {
                      return (
                        <h4 key={index} className={styles.extras}>
                          {data.text}
                        </h4>
                      );
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
          </tbody>
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
          <div>
            {open ? (
              <div className={styles.paymentMethod}>
                <button className={styles.paymentButton}>
                  CASH ON DELIVERY
                </button>{" "}
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "ARfQ6eeJ_6gr_ouBQc4ckNdLWAfBy1GvFvTbWcwI6C3eqZtZeyzG0dx-l9WGIYSl3l1UHZeDYRsTxcDB",
                    components: "buttons",
                    currency: "USD",
                    "disable-funding": "credit,card,p24",
                  }}
                >
                  <ButtonWrapper currency={currency} showSpinner={false} />
                </PayPalScriptProvider>{" "}
              </div>
            ) : (
              <button
                onClick={() => {
                  setOpen(!open);
                }}
                className={styles.button}
              >
                CHECKOUT NOW!!
              </button>
             
            )}
          </div>
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
