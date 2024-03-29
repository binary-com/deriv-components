import type { Story } from '@storybook/react';
import Accordion, { AccordionProps } from '../accordion';
import { AccordionContentProps } from '../accordion-content';
import { AccordionTitleProps } from '../accordion-title';

const onToggle = (expand: boolean) => expand;

export default {
    title: 'Accordion',
    component: Accordion,
    argTypes: {
        size: {
            control: {
                type: 'select',
                options: {
                    medium: 'medium',
                    small: 'small',
                },
            },
            description: 'Controls the size of accordion.',
            defaultValue: 'medium',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' },
            },
        },
        type: {
            control: {
                type: 'select',
                options: {
                    'Bottom Border': 'bottomBorder',
                    Container: 'container',
                    'Container With Border': 'containerWithBorder',
                    'Container With Shadow': 'containerWithShadow',
                },
            },
            description: 'Controls the types of accordion.',
            defaultValue: 'bottomBorder',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'bottomBorder' },
            },
        },
        elevation_type: {
            control: {
                type: 'select',
                options: {
                    xs: 'xs',
                    sm: 'sm',
                    md: 'md',
                    lg: 'lg',
                    xl: 'xl',
                    xxl: 'xxl',
                    xxxl: 'xxxl',
                },
            },
            description: 'Controls the types of elevation.',
            defaultValue: 'xs',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'xs' },
            },
        },
        expand_section: {
            description: 'If set to `true`, accordion will be open.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        title_content: {
            defaultValue: <div>Title</div>,
        },
        main_content: {
            defaultValue: <div>Content</div>,
        },
        onToggle: {
            defaultValue: onToggle,
        },
    },
};

const Template: Story<AccordionProps & AccordionTitleProps & AccordionContentProps> = (args) => {
    return (
        <Accordion
            type={args.type}
            elevation_type={args.elevation_type}
            expand_section={args.expand_section}
            onToggle={onToggle}
        >
            <Accordion.Title size={args.size}>
                <p>Title</p>
            </Accordion.Title>
            <Accordion.Content size={args.size}>
                <p>Content</p>
            </Accordion.Content>
        </Accordion>
    );
};

export const DefaultAccordion = Template.bind({});
DefaultAccordion.args = {};
