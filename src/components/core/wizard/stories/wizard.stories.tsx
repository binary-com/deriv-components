import type { Meta, Story } from '@storybook/react';
import Wizard, { TWizardProps } from '../wizard';

export default {
    title: 'Wizard',
    parameters: { controls: { sort: 'alpha' } },
} as Meta<TWizardProps>;

const Template: Story<TWizardProps> = (args) => <Wizard {...args} />;

export const Light = Template.bind({});
Light.args = {
    //
};
