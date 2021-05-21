export const isHidden = (breakPoint: number | undefined, width: number | undefined) => {
    if (width && breakPoint) {
        if (width < breakPoint) {
            return true;
        }
    }
    return false;
};

type styles = {
    display?: string;
    flex?: number;
}

export const buildStyles = (item: boolean, container: boolean, size: number = 1) => {
    const styles: styles = {};
    
    if (container) {
        styles.display = 'flex';
    }

    if (item) {
        styles.flex = size;
    }

    return styles;
}