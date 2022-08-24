import { Close as PrimitiveClose } from '@radix-ui/react-dialog';

import CloseIconDarkSVG from '@assets/svg/ic-close-dark.svg';
import CloseIconLightSVG from '@assets/svg/ic-close-light.svg';
import { styled } from 'Styles/stitches.config';
import useTheme from '@core/theme-context/use-theme';
import { TCloseIconButtonProps } from '../types';

const IconButton = styled('button', {
    all: 'unset',
    fontFamily: 'inherit',
    borderRadius: '100%',
    height: 25,
    width: 25,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    variants: {
        is_absolute: {
            true: {
                position: 'absolute',
            },
            false: {},
        },
        type: {
            dialog: {},
            page: {},
        },
    },
    compoundVariants: [
        {
            is_absolute: true,
            type: 'dialog',
            css: {
                top: 24,
                right: 24,
                '@mobile': {
                    top: 16,
                    right: 16,
                },
            },
        },
        {
            is_absolute: true,
            type: 'page',
            css: {
                top: 16,
                right: 24,
                '@mobile': {
                    top: 14,
                    right: 16,
                },
            },
        },
    ],
    defaultVariants: {
        is_absolute: true,
        type: 'dialog',
    },
});

const CloseIconDark = () => <img src={CloseIconDarkSVG} alt={'close-icon'} />;
const CloseIconLight = () => <img src={CloseIconLightSVG} alt={'close-icon'} />;

const CloseIconButton = ({ type, is_absolute = true }: TCloseIconButtonProps) => {
    const { isDark } = useTheme();

    return (
        <PrimitiveClose asChild>
            <IconButton type={type} is_absolute={is_absolute} aria-label="close" data-testid={'close-button'}>
                {isDark ? <CloseIconDark /> : <CloseIconLight />}
            </IconButton>
        </PrimitiveClose>
    );
};

export default CloseIconButton;

export type CloseIconButtonType = { CloseIconButton: typeof CloseIconButton };
