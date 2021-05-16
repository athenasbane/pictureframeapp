import React from 'react';
import styles from './Slider.module.scss';

export type SliderProps = {
    value: number;
    onChange: (event: any) => void;
    name?: string;
    min?: number;
    max?: number;
}

export const Slider: React.FC<SliderProps> = ({ value = 50, name = 'slider', min = 0, max = 100, onChange = () => {} }) => {
    return (
        <div className={styles.slidecontainer}>
            <input 
                className={styles.slider} 
                onChange={(event) => onChange(event)}
                name={name} 
                type="range" 
                min={min} 
                max={max} 
                value={value} 
            />
        </div>
    );
}