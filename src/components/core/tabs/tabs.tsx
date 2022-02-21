import { ReactNode, useEffect, useRef, useState } from 'react';
import Tab from './tab';
import css from './tabs.module.scss';

export interface TabsProps {
    active_index?: number;
    contained?: boolean;
    dark?: boolean;
    children?: ReactNode[];
}

const Tabs = ({ children, active_index = 0, contained, dark }: TabsProps) => {
    const tabs_ref = useRef<HTMLUListElement | null>(null);
    const active_tab_ref = useRef<HTMLLIElement | null>(null);
    const [active_tab_index, setActiveTabIndex] = useState(active_index);

    const scrollIntoActiveTab = () => {
        const active_tab_bounds = active_tab_ref?.current?.getBoundingClientRect();

        if (active_tab_bounds) tabs_ref?.current?.scrollTo(active_tab_bounds.left, active_tab_bounds.y);
    };

    useEffect(() => {
        if (active_index >= 0 && active_index !== active_tab_index) {
            setActiveTabIndex(active_index);
        }

        scrollIntoActiveTab();
    }, [active_index]);

    useEffect(() => {
        scrollIntoActiveTab();
    }, [active_tab_index]);

    return (
        <div className={css.tabs}>
            <ul className={css.list} ref={tabs_ref}>
                {children?.map((child: any, idx: number) => {
                    const { icon, label } = child.props;
                    const active = idx === active_tab_index;

                    return (
                        <Tab
                            active={active}
                            active_tab_ref={active ? active_tab_ref : null}
                            contained={contained}
                            dark={dark}
                            icon={icon}
                            key={idx}
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
