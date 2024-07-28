import styles from "../layouts/_home.module.scss";

import Hero from "../layouts/hero";
import Introduction from "../layouts/introduction";
import Services from "../layouts/services";
import Makeup from "../layouts/makeup";
import Carousel from "../layouts/carousel";
import Guidance from "../layouts/guidance";
import Comments from "../layouts/comments";
import Footer from "../layouts/footer";

import useTitle from "@/hooks/useTitle";

const HomePage = () => {
  useTitle("نگین | آرایش میکاپ 💄");

  return (
    <>
      <section className={styles.heroAndIntro}>
        <Hero />
        <Introduction />
      </section>
      <Services />
      <Makeup />
      <Carousel />
      <Guidance />
      <Comments />
      <Footer />
    </>
  );
};

export default HomePage;
