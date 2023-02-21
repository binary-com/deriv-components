export const createCanvas = () => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');

    return (text: string, font: string) => {
        const context = canvas.getContext('2d');
        if (context) {
            context.font = font;
            const metrics = context.measureText(text);
            return metrics.width;
        }
    };
};

const getCssStyle = (element: Element, prop: string) => {
    return window.getComputedStyle(element, null).getPropertyValue(prop);
};

export const getCanvasFont = (el: Element) => {
    const fontWeight = getCssStyle(el, 'font-weight');
    const fontSize = getCssStyle(el, 'font-size');
    const fontFamily = getCssStyle(el, 'font-family');

    return `${fontWeight} ${fontSize} ${fontFamily}`;
};
