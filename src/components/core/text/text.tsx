import { createElement, ReactNode } from 'react';
import classNames from 'classnames';
import css from './text.module.scss';

export const type_array = [
    'hero',
    'heading-1',
    'heading-2',
    'heading-3',
    'subtitle-1',
    'subtitle-2',
    'paragraph-1',
    'paragraph-2',
    'small',
    'extra-small',
];

export interface TextProps {
    as: string;
    type: typeof type_array[number];
    bold?: boolean;
    children: ReactNode;
}

const Text = ({ as = 'p', type = 'subtitle-1', bold = true, children, ...props }: TextProps) =>
    createElement(as, { className: classNames(css.text, css[type], bold && css.bold), ...props }, children);

export default Text;
