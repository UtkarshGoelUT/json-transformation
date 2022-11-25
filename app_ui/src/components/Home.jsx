import { React } from "react";
import styles from "./Home.module.css";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export const Home = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.landingBg}>
        <div className={styles.introduction}>
          <div className={styles.introTitle}>J2J</div>
          <div className={styles.introBody}>JSON code transformer in Python</div>
        </div>
        <div className={styles.features}>
          <div className={styles.featuresTitle}>About</div>
          <div className={styles.featuresBody}>A web based application to generate code in Python to easily parse and transform the JSON</div>
        </div>
        <div className={styles.features}>
          <div className={styles.featuresTitle}>Get Started</div>
          <div className={styles.featuresBody}>Read the documentation</div>
          <Button style={{ marginTop: '2rem', fontSize: "1.5rem" }} variant="outline-dark" onClick={() => navigate("/documentation")}>Documentation</Button>
        </div>
      </div>
    </div>
  );
};
