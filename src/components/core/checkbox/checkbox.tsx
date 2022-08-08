import { useState, useEffect, HtmlHTMLAttributes } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';
import CheckIconSVG from '@assets/svg/checkbox-icon.svg';
import CheckIndetermineIconSVG from '@assets/svg/checkbox-indetermine-icon.svg';
import useTheme from '@core/theme-context/use-theme';

export const CheckBox = CheckboxPrimitive.Root;

export interface CheckboxProps extends HtmlHTMLAttributes<HTMLInputElement> {
    indetermine?: boolean;
    check?: boolean;
    handleChange?: (check: boolean) => void;
    size?: 'default' | 'small';
    disabled?: boolean;
    name?: string;
    label?: string;
}

const Label = styled('label', {
    color: '$greyLight700',
    padding: '0 0.5rem',
    '&:hover': {
        cursor: 'pointer',
    },
    variants: {
        size: {
            default: {
                fontSize: '$2xs',
                lineHeight: '$lineHeight20',
                fontWeight: '$regular',
                '@mobile': {
                    lineHeight: '$lineHeight18',
                    fontSize: '$3xs',
                },
            },
            small: {
                fontSize: '$3xs',
                lineHeight: '$lineHeight18',
                fontWeight: '$regular',
                '@mobile': {
                    lineHeight: '$lineHeight14',
                    fontSize: '$4xs',
                },
            },
        },
        dark: {
            true: {
                color: '$greyDark100',
            },
        },
        disabled: {
            true: {
                cursor: 'default',
                opacity: 0.32,
            },
        },
    },
});

const Container = styled('div', {
    display: 'flex',
    alignItems: 'center',
});

const StyledCheckbox = styled(CheckBox, {
    backgroundColor: 'transparent',
    width: '1rem',
    height: '1rem',
    borderRadius: '$small',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid $greyLight600',
    transition: 'all 0.15s ease-in',
    boxSizing: 'border-box',
    '&:hover': {
        cursor: 'pointer',
    },
    variants: {
        dark: {
            true: {
                border: '2px solid $greyDark200',
            },
        },
        checked: {
            true: {
                border: '2px solid $coral500',
                backgroundColor: '$coral500',
            },
        },
        indetermine_checkbox: {
            true: {
                border: '2px solid $coral500',
                backgroundColor: '$coral500',
            },
        },
    },
    compoundVariants: [
        {
            dark: true,
            checked: true,
            css: {
                border: '2px solid $coral500',
                backgroundColor: '$coral500',
            },
        },
        {
            dark: true,
            indetermine_checkbox: true,
            css: {
                border: '2px solid $coral500',
                backgroundColor: '$coral500',
            },
        },
    ],
});

const CheckboxIcon = styled('img', {
    variants: {
        checked: {
            true: { color: '$greyLight100', width: '12px', height: '9px' },
        },
        indetermine_checkbox: {
            true: { color: '$greyLight100', width: '12px' },
        },
    },
});

const Checkbox = ({
    children,
    indetermine,
    check = false,
    handleChange,
    size = 'default',
    disabled,
    id,
    name,
}: CheckboxProps) => {
    const [checked, setChecked] = useState(check);
    const [indetermine_checkbox, setindetermineCheckbox] = useState(indetermine);
    const { isDark } = useTheme();

    const handleSelectionChange = () => {
        if (!disabled) {
            if (handleChange) handleChange(!checked);
            setChecked((prev_state) => !prev_state);
        }
    };

    useEffect(() => setChecked(check), [check]);

    useEffect(() => setindetermineCheckbox(indetermine), [indetermine]);

    const icon_src = checked ? CheckIconSVG : indetermine_checkbox && CheckIndetermineIconSVG;
    return (
        <Container>
            <StyledCheckbox
                defaultChecked={checked}
                checked={checked}
                indetermine_checkbox={indetermine_checkbox}
                dark={isDark}
                disabled={disabled}
                css={disabled ? { cursor: 'default', opacity: 0.32 } : {}}
                id={id}
                name={name}
                onClick={handleSelectionChange}
            >
                {icon_src && (
                    <CheckboxIcon src={icon_src} checked={checked} indetermine_checkbox={indetermine_checkbox} />
                )}
            </StyledCheckbox>
            <Label size={size} dark={isDark} onClick={handleSelectionChange} disabled={disabled}>
                {children}
            </Label>
        </Container>
    );
};

export default Checkbox;

type CheckboxVariantProps = Stitches.VariantProps<typeof Checkbox>;

export const CheckboxStory = modifyVariantsForStory<CheckboxVariantProps, CheckboxProps, typeof Checkbox>(Checkbox);
