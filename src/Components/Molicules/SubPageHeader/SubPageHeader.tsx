import React from 'react';
import styles from './SubPageHeader.module.scss';

export const SubPageHeader: React.FC = ({children}) => {
    return (
        <div className={styles.root}>
            {children}
        </div>
    );
}