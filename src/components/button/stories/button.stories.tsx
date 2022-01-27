import type { Meta, Story } from '@storybook/react';
import type { ButtonProps } from '../button';
import Button from '../button';

export default {
    title: 'Button',
} as Meta<ButtonProps>;

const Template: Story<ButtonProps> = (args) => <Button {...args}>Example button</Button>;

export const ButtonComponent = Template.bind({});
ButtonComponent.args = {
    colour: 'primary',
    size: 'small',
    disabled: false,
};
