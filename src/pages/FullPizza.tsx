import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import styles from "./FullPizza.module.scss"; // Import the SCSS module

type Pizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string; // dough type: "тонкое" OR "традиционное"
  size: number;
  count: number;
};

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<Pizza | null>();
  const [error, setError] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(5);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://66b082be6a693a95b538f92c.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (err) {
        console.log("Error while fetching the pizza: ", err);
        setError(true);
      }
    }

    fetchPizza();
  }, [id]);

  useEffect(() => {
    if (error) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      if (countdown === 0) {
        navigate("/");
      }

      return () => clearInterval(interval);
    }
  }, [error, countdown, navigate]);

  const skeletonPlaceholders = [...new Array(1)].map((_, idx) => (
    <PizzaSkeleton key={idx} />
  ));

  if (!pizza && !error) {
    return (
      <div>
        Loading...
        {skeletonPlaceholders}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h2>Error</h2>
        <p>Sorry, we couldn't find the pizza you're looking for.</p>
        <p>
          You will be redirected to{" "}
          <Link to="/">
            <b>the main</b>
          </Link>{" "}
          page in {countdown} seconds.
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="pizza-block-wrapper">
        <div className={styles.pizzaDetails}>
          <div className={styles.pizzaInfo}>
            <img
              src={pizza?.imageUrl}
              alt="pizza image"
              className="pizza-block__image"
            />
            <h2 className={styles.pizzaTitle}>{pizza?.title}</h2>
            <h4 className={styles.pizzaPrice}>{`${pizza?.price} ₽`}</h4>
          </div>
          <div className={styles.pizzaDescription}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              provident corrupti deleniti impedit quam enim sed deserunt, beatae
              quas omnis!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
