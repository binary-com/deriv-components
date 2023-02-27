export type TListItem = {
    icon?: JSX.Element;
    disabled?: boolean;
    subtitle?: string;
    text: string;
    trailing_label?: JSX.Element | string;
    value: string;
};
