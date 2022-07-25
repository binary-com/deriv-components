import * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

type RadioGroupProps = {
    dark?: boolean;
    handleChange: (value: string) => void;
    selected_value: string;
    options: {
        label: string;
        value: string;
        name?: string;
        id?: string;
    }[];
};

const StyledRadio = styled(RadioGroupPrimitive.Item, {
    all: 'unset',
    backgroundColor: 'white',
    width: 16,
    height: 16,
    borderRadius: '50%',
    boxSizing: 'border-box',
    '&[data-state|="unchecked"]': {
        border: '2px solid $greyLight600',
    },
    variants: {
        dark: {
            true: {
                '&[data-state|="unchecked"]': {
                    border: '2px solid $greyDark200',
                },
            },
        },
    },
});

const StyledIndicator = styled(RadioGroupPrimitive.Indicator, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
    position: 'relative',
    borderRadius: '50%',
    '&::after': {
        content: '""',
        display: 'block',
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'white',
    },
});

const Flex = styled('div', { display: 'flex', marginBottom: '16px', alignItems: 'center' });

const Label = styled('label', {
    userSelect: 'none',
    paddingLeft: 8,
    fontSize: '$2xs',
    lineHeight: '$lineHeight20',
    fontWeight: '$regular',
    color: '$greyLight700',
    '@mobile': {
        lineHeight: '$lineHeight18',
        fontSize: '$3xs',
    },
    variants: {
        dark: {
            true: {
                color: '$greyDark100',
            },
        },
    },
});

export const RadioGroup = ({ dark, options, selected_value, handleChange }: RadioGroupProps) => (
    <RadioGroupPrimitive.Root defaultValue={selected_value} onValueChange={handleChange}>
        {options.map((option, index) => (
            <Flex key={index}>
                <StyledRadio value={option.value} dark={dark}>
                    <StyledIndicator />
                </StyledRadio>
                <Label dark={dark}>{option.label}</Label>
            </Flex>
        ))}
    </RadioGroupPrimitive.Root>
);

export default RadioGroup;

type RadioGroupVariantProps = Stitches.VariantProps<typeof RadioGroup>;

export const RadioGroupStory = modifyVariantsForStory<RadioGroupVariantProps, RadioGroupProps, typeof RadioGroup>(
    RadioGroup,
);
