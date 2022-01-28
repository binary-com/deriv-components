import type { Meta, Story } from '@storybook/react';
import type { ButtonProps } from '../button';
import Button from '../button';

export default {
    title: 'Button',
    parameters: {
        // docs: readme,
    },
    argTypes: {
        color: {
            control: {
                type: 'select',
                options: {
                    primary: 'primary',
                    primary_light: 'primary-light',
                    secondary: 'secondary',
                    tertiary: 'tertiary',
                },
            },
        },
        size: {
            control: {
                type: 'select',
                options: {
                    small: 'small',
                    medium: 'medium',
                    large: 'large',
                },
            },
        },
    },
} as Meta<ButtonProps>;

const Template: Story<ButtonProps> = (args) => <Button {...args}>Example button</Button>;

export const Default = Template.bind({});
Default.args = {
    block: false,
    color: 'primary',
    size: 'small',
    disabled: false,
};
