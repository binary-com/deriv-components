import type { Meta, Story } from '@storybook/react';
import type { ButtonProps } from '../button';
import Button from '../button';

export default {
    title: 'Button',
    argTypes: {
        color: {
            control: {
                type: 'select',
                options: {
                    primary: 'primary',
                    primary_light: 'primary-light',
                    secondary: 'secondary',
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

export const Primary = Template.bind({});
Primary.args = {
    block: false,
    color: 'primary',
    size: 'medium',
    disabled: false,
};

export const PrimaryLight = Template.bind({});
PrimaryLight.args = {
    block: false,
    color: 'primary-light',
    size: 'medium',
    disabled: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
    block: false,
    color: 'secondary',
    size: 'medium',
    disabled: false,
};
