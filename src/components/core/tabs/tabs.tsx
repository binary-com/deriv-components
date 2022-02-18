import { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import Tab from './tab';
import css from './tabs.module.scss';

export interface TabsProps {
    active_index?: number;
    contained?: boolean;
    dark?: boolean;
    children?: ReactNode[];
}

const Tabs = ({ children, active_index = 0, contained, dark }: TabsProps) => {
    const [active_tab_index, setActiveTabIndex] = useState(active_index);

    useEffect(() => {
        if (active_index >= 0 && active_index !== active_tab_index) {
            setActiveTabIndex(active_index);
        }
    }, [active_index]);

    return (
        <div className={classNames(css.tabs, dark && css.dark)}>
            <ul className={css.list}>
                {children?.map((child: any, idx: number) => {
                    const { icon, label } = child.props;

                    return (
                        <Tab
                            icon={icon}
                            active={idx === active_tab_index}
                            contained={contained}
                            dark={dark}
                            label={label}
                            onClick={() => setActiveTabIndex(idx)}
                        />
                    );
                })}
            </ul>
            <div className={css.content}>
                {children?.map((child: any, idx: number) => {
                    if (idx === active_tab_index) return child.props.children;
                })}
            </div>
        </div>
    );
};

export default Tabs;
