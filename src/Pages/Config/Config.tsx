import React from 'react';
import { Slider } from '../../Components/Atoms/Slider/Slider';
import styles from './Config.module.scss';
import { Button } from '../../Components/Atoms/Button/Button';
import { useHistory } from 'react-router-dom';

export type ConfigProps = {
    speed: number
    configChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void; 
}

const configDefaults = {
    min: 1,
    max: 30,
}

export const Config: React.FC<ConfigProps> = ({ speed, configChangeHandler }) => {
    const history = useHistory();
    return (
        <div className={styles.root}>
            <div className={styles.homeBtn}>
                <Button onClick={() => history.push('/')}>Home</Button>
            </div>
            <div className={styles.container}>
                
                <h3 className={styles.label}>Configuration</h3>
            </div>
            <div className={styles.container}>
                <div className={styles.labelContainer}>
                   <p className={styles.label}>{configDefaults.min}</p>
                   <p className={styles.label}>Image Change Speed</p>
                   <p className={styles.label}>{configDefaults.max}</p> 
                </div>
                <Slider value={speed} onChange={configChangeHandler} min={configDefaults.min} max={configDefaults.max} />
            </div>
        </div>
    );
}