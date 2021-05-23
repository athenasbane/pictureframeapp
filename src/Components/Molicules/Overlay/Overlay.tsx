import React, { useState, useRef, useEffect } from 'react';
import styles from './Overlay.module.scss';
import {Button} from '../../Atoms/Button/Button';
import { useHistory } from 'react-router-dom';
import useWindowSize from '../../../customHooks/useWindowSize';

export const Overlay = () => {
    const [ active, setActive ] = useState(false);
    const timeoutRef = useRef<any>(null);
    const history = useHistory();
    const {width} = useWindowSize();

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

    useEffect(() => {
        return () => resetTimeout();
    })

    const btnClickHandler = (location: string) => {
        resetTimeout()
        history.push(location)
    }
    
    const background = (
        <div className={styles.background} >
            <div className={styles.buttons}>
                <Button 
                    size={ width && width < 340 ? 'large' : 'medium'}
                    onClick={() => btnClickHandler("/config")}>
                        Configuration
                </Button>
                <Button 
                    size={ width && width < 300 ? 'large' : 'medium'}
                    onClick={() => btnClickHandler("/upload")}>
                        Upload
                </Button>
            </div>
        </div>
    )

    return (
        <div className={styles.root} onClick={overlayClickHandler}>
            { active ? background : null }
        </div>
    );
}