import { Children, ReactElement, useEffect, useRef, useState } from 'react';
import type { HtmlHTMLAttributes } from 'react';
import * as Stitches from '@stitches/react';
import { modifyVariantsForStory } from 'Styles/type-utils';
import { styled } from 'Styles/stitches.config';
import type { TabProps } from './tab';
import Tab from './tab';
export interface TabsProps extends HtmlHTMLAttributes<HTMLDivElement> {
    active_index?: number;
    contained?: boolean;
    dark?: boolean;
    size?: 'default' | 'small';
    children?: ReactElement<TabProps> | ReactElement<TabProps>[];
}

const List = styled('ul', {
    display: 'flex',
    padding: 0,
});

const Tabs = ({ children, active_index = 0, contained, dark, size, ...props }: TabsProps) => {
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
        <div {...props}>
            <List ref={tabs_ref}>
                {Children.map(children, (child: any, idx: number) => {
                    const { icon, label } = child.props;
                    const active = idx === active_tab_index;
                    return (
                        <Tab
                            active={active}
                            ref={active ? active_tab_ref : null}
                            contained={contained}
                            dark={dark}
                            icon={icon}
                            key={idx}
                            label={label}
                            size={size}
                            onClick={() => setActiveTabIndex(idx)}
                        />
                    );
                })}
            </List>
            <div>
                {Children.map(children, (child: any, idx: number) => {
                    if (idx === active_tab_index) return child.props.children;
                })}
            </div>
        </div>
    );
};

export default Tabs;

type TabsVariantProps = Stitches.VariantProps<typeof Tabs>;

export const TabsStory = modifyVariantsForStory<TabsVariantProps, TabsProps, typeof Tabs>(Tabs);
