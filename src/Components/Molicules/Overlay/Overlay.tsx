import React, { useState, useRef } from 'react';
import styles from './Overlay.module.scss';
import {Button} from '../../Atoms/Button/Button';
import { useHistory } from 'react-router-dom';

export const Overlay = () => {
    const [ active, setActive ] = useState(false);
    const timeoutRef = useRef<any>(null);
    const history = useHistory();

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    const overlayClickHandler = () => {
        setActive(true);
        timeoutRef.current = setTimeout(
            () => setActive(false),
            2500
        )
        return () => {
            resetTimeout();
        }
    }

    const btnClickHandler = (location: string) => {
        history.push(location)
    }
    
    const background = (
        <div className={styles.background} >
            <div className={styles.buttons}>
                <Button onClick={() => btnClickHandler("/config")}>Configuration</Button>
                <Button onClick={() => btnClickHandler("/upload")}>Upload</Button>
            </div>
        </div>
    )

    return (
        <div className={styles.root} onClick={overlayClickHandler}>
            { active ? background : null }
        </div>
    );
}