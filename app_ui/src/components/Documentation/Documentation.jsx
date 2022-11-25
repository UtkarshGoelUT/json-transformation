import { React } from "react";
import styles from "./Documentation.module.css";

const Documentation = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Documentation</div>
            <div className={styles.body}>JSON based mapper.</div>
            <div className={styles.body}>Added functionality support.</div>
            <div className={styles.body}>Use _ to call function, easily add your new customized function.</div>
            <div className={styles.body}>Use $ to access input variable.</div>
            <div className={styles.body}>Use ^ to enter boolean or integer values.</div>
            <div className={styles.body}>{"Use [ ] to achieve list selection, { } to achieve dictionary selection and filtering."}</div>
        </div>
    );
};

export default Documentation;