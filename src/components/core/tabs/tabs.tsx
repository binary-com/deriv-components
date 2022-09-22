import { HtmlHTMLAttributes, ReactElement } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';
import TabsList, { TabsTrigger } from './tabs-list';

export interface TabsProps extends HtmlHTMLAttributes<HTMLDivElement> {
    contained?: boolean;
    size?: 'default' | 'small';
    default_selected: string;
    children?: ReactElement[];
}

const StyledTabs = styled(TabsPrimitive.Root, {
    display: 'flex',
    flexDirection: 'column',
});

const StyledContent = styled(TabsPrimitive.Content, {});

const Tabs = ({ contained = false, size = 'default', default_selected, children, ...props }: TabsProps) => {
    return (
        <div {...props}>
            <StyledTabs defaultValue={default_selected}>{children}</StyledTabs>
        </div>
    );
};

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = StyledContent;

export default Tabs;

type TabsVariantProps = Stitches.VariantProps<typeof Tabs>;

export const TabsStory = modifyVariantsForStory<TabsVariantProps, TabsProps, typeof Tabs>(Tabs);
