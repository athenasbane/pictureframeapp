import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Config.module.scss';
import { Button } from '../../Components/Atoms/Button/Button';
import { Slider } from '../../Components/Atoms/Slider/Slider';
import { SubPageHeader } from '../../Components/Molicules/SubPageHeader/SubPageHeader';
import useWindowSize from '../../customHooks/useWindowSize';


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
    const { width } = useWindowSize();
    return (
        <div className={styles.root}>
            <SubPageHeader>
                <div className={styles.homeBtn}>
                    <Button 
                        size={ width && width < 800 ? 'large' : 'medium'}
                        onClick={() => history.push('/')}>
                            Home
                    </Button>
                </div>
                <h3 className={styles.title}>Configuration</h3>
            </SubPageHeader>
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