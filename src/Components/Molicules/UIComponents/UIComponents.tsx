import React, { useEffect, useState } from 'react';
import useWindowSize from '../../../customHooks/useWindowSize';
import { isHidden, buildStyles } from './UIComponentUtilities';

export type GridProps = {
    children: any;
}

export const Grid: React.FC<GridProps> = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
};

export type RowProps = {
    children: any;
    hideOn?: number | undefined;
    item?: boolean
    container?: boolean
    size?: number
};

export const Row: React.FC<RowProps> = ({children, hideOn = 0, item = false, container = false, size}) => {
    const { width } = useWindowSize();
    const [ styles, setStyles ] = useState(buildStyles(item, container, size))
    if (!item && !container) {
        console.warn('Row Components should either be a container, a item or both. Setting neither can cause issues: <Row item />')
    }

    useEffect(() => {
        setStyles(buildStyles(item, container, size))
    }, [item, container, size])

    return (
        <>
            { isHidden(hideOn, width) ?
                null
                :
                (<div style={styles} >
                    {children}
                </div>)
            }
        </>
    );
};

export type ColProps = {
    children: any;
    size?: number;
    item?: boolean
    container?: boolean
    hideOn?: number | undefined;
}

export const Col: React.FC<ColProps> = ({children, size, hideOn = 0, item = false, container = false}) => {
    const { width } = useWindowSize();
    const [ styles, setStyles ] = useState(buildStyles(item, container, size))
    if (!item && !container) {
        console.warn('Row Components should either be a container, a item or both. Setting neither can cause issues: <Row item />')
    }

    useEffect(() => {
        setStyles(buildStyles(item, container, size))
    }, [item, container, size])
    console.log(styles)
    return (
        <>
            { isHidden(hideOn, width) ?
                null
                : 
                (<div style={styles}>
                    {children}
                </div>)
            }
        </>
    );
};