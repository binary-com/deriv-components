import { Story, Meta } from '@storybook/react';
import { Button, ButtonProps } from '../button';

export default {
    title: 'Button',
    component: Button,
    argTypes: {},
} as Meta<typeof Button>;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;
