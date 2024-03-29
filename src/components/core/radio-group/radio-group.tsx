import { HtmlHTMLAttributes } from 'react';
import * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import useTheme from '@core/theme-context/use-theme';

type TRadioButtonOptions = {
    label: string;
    value: string;
    name?: string;
    id: string;
};

export interface RadioGroupProps extends HtmlHTMLAttributes<HTMLButtonElement> {
    handleChange: (value: string) => void;
    selected_value: string;
    disabled?: boolean;
    options: TRadioButtonOptions[];
}

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
    cursor: 'pointer',
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
    cursor: 'pointer',
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
        disabled: {
            true: {
                opacity: '$opacity-32',
                cursor: 'default',
            },
        },
    },
});

export const RadioGroup = ({ options, selected_value, disabled, handleChange, ...props }: RadioGroupProps) => {
    const { isDark } = useTheme();
    return (
        <RadioGroupPrimitive.Root defaultValue={selected_value} onValueChange={handleChange}>
            {options.map((option) => (
                <Flex key={option.id}>
                    <StyledRadio
                        value={option.value}
                        dark={isDark}
                        disabled={disabled}
                        css={disabled ? { opacity: '$opacity-32', cursor: 'default' } : {}}
                        id={option.id}
                        {...props}
                    >
                        <StyledIndicator />
                    </StyledRadio>
                    <Label dark={isDark} disabled={disabled} htmlFor={option.id}>
                        {option.label}
                    </Label>
                </Flex>
            ))}
        </RadioGroupPrimitive.Root>
    );
};

export default RadioGroup;

type RadioGroupVariantProps = Stitches.VariantProps<typeof RadioGroup>;

export const RadioGroupStory = modifyVariantsForStory<RadioGroupVariantProps, RadioGroupProps, typeof RadioGroup>(
    RadioGroup,
);
