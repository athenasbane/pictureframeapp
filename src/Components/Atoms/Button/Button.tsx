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

export const Button: React.FC<ButtonProps> = (
        {
            children, 
            onClick=() => {}, 
            version = 'primary', 
            type = 'button', 
            size='medium', 
            icon 
        }) => {
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
    const sizer: (size: string) => {width: string} = (size: string) => {
        console.log(size)
        const sizeObj: {[name: string]: {width: string, height: string}} = {
            small: { width: '20%', height: '100%' }, 
            medium: { width: '30%', height: '100%' },
            large: {width: '50%', height: '100%' },
        }
        return sizeObj[size];
    };

    return (
        <button 
            className={styles[btnType]} 
            onClick={onClick} 
            type={type} 
            style={sizer(size)} 
            >
            {children}
        </button>
    );
}