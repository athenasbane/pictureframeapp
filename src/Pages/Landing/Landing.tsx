import React, { useRef, useEffect, useState } from 'react';
import styles from './Landing.module.scss'
import { Overlay } from '../../Components/Molicules/Overlay/Overlay';

export type LandingProps = {
    images: string[] | undefined;
    config: {
        speed: number;
    }
};

export const Landing: React.FC<LandingProps> = ({images, config}) => {
    const [ currentImage, setCurrentImage ] = useState(0);
    const timeoutRef = useRef<any>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => setCurrentImage(
                    (prevState) => {
                        if (Array.isArray(images)) {
                          return prevState === images.length - 1 ? 0 : prevState + 1  
                        }
                        return prevState;
                    }),
            config.speed * 1000
        )
        return () => {
            resetTimeout();
        }
    }, [currentImage, images, config])

    const image = <img className={styles.image} src={Array.isArray(images) ? images[currentImage] : undefined} alt="dog images" />
    
    return (
        <div className={styles.root}>
            <Overlay />
            {image}
        </div>
    );
}