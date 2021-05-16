import React, { useEffect, useState } from 'react';
import styles from './Button.module.scss';

export type ButtonProps = {
    children: any;
    version?: string
    onClick?: (event?: any) => void | Promise<void>;
    type?: "button" | "submit" | "reset" | undefined;
    size?: string;
    icon?: {name: string, size: string, location: string};
    customStyle?: object;
}

const ButtonTypes = ['primary', 'secondary']

export const Button: React.FC<ButtonProps> = ({children, onClick=() => {}, version = 'primary', type = 'button', size='medium', icon }) => {
    const [ btnType, setBtnType ] = useState(version);
    useEffect(() => {
        if (version !== 'primary' && ButtonTypes.includes(version)) {
            setBtnType(version)
        }

        if (!ButtonTypes.includes(version)) {
            console.error(`Button component dones not recongise type of
            ${version} accepted types are ${ButtonTypes}
            `)
        }
    }, [version]);
    return (
        <button className={styles[btnType]} onClick={onClick} type={type} >
            {children}
        </button>
    );
}