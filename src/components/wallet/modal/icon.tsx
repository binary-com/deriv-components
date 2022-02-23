export interface IconProps {
    color?: string;
    height?: string;
    name?: string;
    width?: string;
}

const Icon = ({ color, name, height, width }: IconProps) => {
    return (
        <svg
            width={width}
            height={height}
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            style={{ '--fill-color-1': color }}
        >
            <use xlinkHref={`./modal/${name}.svg#${name}`} />
        </svg>
    );
};

export default Icon;
