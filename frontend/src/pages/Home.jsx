import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Offer from "../components/Offer";
import Features from "../components/Features";
import Hero from "../components/Hero";
import MyOrders from "./MyOrders";

const Home = () => {
  return (
    <div>
      <section id="home">
        <Hero />
      </section>

      <section id="Features">
        <Features />
      </section>

      <section id="categories">
        <Categories />
      </section>

      <section id="shop">
        <Offer />
      </section>
     

      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
