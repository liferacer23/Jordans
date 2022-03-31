import "../styles/globals.css";
import Layout from "../components/Layout";
import store from "../redux/store";
import { motion } from "framer-motion";
import { Provider } from "react-redux";
function MyApp({ Component, pageProps,router }) {
   
  return (
    <Provider store={store}>
    <Layout>
      <motion.div key={router.route} initial="pageInitial" animate="pageAnimate" variants={{
          pageInitial:{
            opacity:0
          },
          pageAnimate:{
            opacity:1
          },
          transition:{
            delay:1
          }
      }}>
      <Component {...pageProps} />
      </motion.div>
    </Layout>
    </Provider>
  );
}

export default MyApp;
