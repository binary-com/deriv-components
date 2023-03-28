declare module '*.md';
declare module '*.scss';
declare module '*.svg';
declare module '*.svg?svgr' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}
