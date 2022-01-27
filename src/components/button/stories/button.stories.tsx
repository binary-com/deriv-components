import type { ButtonHTMLAttributes } from 'react';
import type { Meta, Story } from '@storybook/react';
import { Button as ButtonComponent } from '..';

export default {
    title: 'Button',
} as Meta<ButtonHTMLAttributes<HTMLButtonElement>>;

const Template: Story<ButtonHTMLAttributes<HTMLButtonElement>> = (args) => (
    <ButtonComponent size="medium" colour="secondary" {...args}>
        Example button
    </ButtonComponent>
);

export const Button = Template.bind({});
