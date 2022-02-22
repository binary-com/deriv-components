import React from 'react';
import type { LiHTMLAttributes } from 'react';
import classNames from 'classnames';
import css from './tab.module.scss';

export interface TabProps extends LiHTMLAttributes<HTMLLIElement> {
    active?: boolean;
    contained?: boolean;
    dark?: boolean;
    icon?: string;
    label?: string;
}

const Tab = React.forwardRef(({ active, contained, dark, icon, label, ...props }: TabProps, ref: any) => {
    return (
        <li
            className={classNames(css.tab, dark && css.dark, contained && css.contained, active && css.active)}
            {...props}
            ref={ref}
        >
            {icon && <img className={css.icon} src={icon} />}
            <span>{label}</span>
        </li>
    );
});

export default Tab;
