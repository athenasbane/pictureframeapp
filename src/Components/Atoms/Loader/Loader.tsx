import React from 'react';
import cog from './cog.png';
import styles from './Loader.module.scss'

export const Loader = () => {
    return (
        <div className={styles.root}>
            <p className={styles.label}>Loading...</p>
            <img className={styles.cog} src={cog} alt="loading spinner" />
        </div>
    );
};