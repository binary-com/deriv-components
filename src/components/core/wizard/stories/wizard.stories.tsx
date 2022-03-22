import type { Meta, Story } from '@storybook/react';
import Wizard, { TWizardProps } from '../wizard';

export default {
    title: 'Wizard',
    parameters: { controls: { sort: 'alpha' } },
} as Meta<TWizardProps>;

const Template: Story<TWizardProps> = (args) => <Wizard {...args} />;

export const DefaultLightLarge = Template.bind({});
DefaultLightLarge.args = {
    //
};

export const DefaultDarkLarge = Template.bind({});
DefaultDarkLarge.args = {
    //
};
