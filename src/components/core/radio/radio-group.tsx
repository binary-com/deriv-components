import * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

const StyledRadio = styled(RadioGroupPrimitive.Item, {
    all: 'unset',
    backgroundColor: 'white',
    width: 25,
    height: 25,
    borderRadius: '100%',
    boxShadow: `0 2px 10px black`,
    '&:hover': { backgroundColor: 'violet' },
    '&:focus': { boxShadow: `0 0 0 2px black` },
});

const StyledIndicator = styled(RadioGroupPrimitive.Indicator, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
    '&::after': {
        content: '""',
        display: 'block',
        width: 11,
        height: 11,
        borderRadius: '50%',
        backgroundColor: 'violet',
    },
});

type RadioGroupProps = {
    dark?: boolean;
};

// Exports
export const RadioGroup = RadioGroupPrimitive.Root;
export const RadioGroupRadio = StyledRadio;
export const RadioGroupIndicator = StyledIndicator;

// Your app...
const Flex = styled('div', { display: 'flex' });

const Label = styled('label', {
    color: 'white',
    fontSize: 15,
    lineHeight: 1,
    userSelect: 'none',
    paddingLeft: 15,
});

export const RadioGroupDemo = ({ dark }: RadioGroupProps) => (
    <form>
        <RadioGroup defaultValue="default" aria-label="View density">
            <Flex css={{ margin: '10px 0', alignItems: 'center' }}>
                <RadioGroupRadio value="default" id="r1">
                    <RadioGroupIndicator />
                </RadioGroupRadio>
                <Label htmlFor="r1">Default</Label>
            </Flex>
            <Flex css={{ margin: '10px 0', alignItems: 'center' }}>
                <RadioGroupRadio value="comfortable" id="r2">
                    <RadioGroupIndicator />
                </RadioGroupRadio>
                <Label htmlFor="r2">Comfortable</Label>
            </Flex>
            <Flex css={{ margin: '10px 0', alignItems: 'center' }}>
                <RadioGroupRadio value="compact" id="r3">
                    <RadioGroupIndicator />
                </RadioGroupRadio>
                <Label htmlFor="r3">Compact</Label>
            </Flex>
        </RadioGroup>
    </form>
);

export default RadioGroupDemo;

type RadioGroupVariantProps = Stitches.VariantProps<typeof RadioGroup>;

export const RadioGroupStory = modifyVariantsForStory<RadioGroupVariantProps, RadioGroupProps, typeof RadioGroup>(
    RadioGroup,
);
