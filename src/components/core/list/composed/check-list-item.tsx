import SelectedTickIconSVG from '@assets/svg/checked-tick-icon.svg';
import DefaultTickIconSVG from '@assets/svg/default-tick-icon.svg';
import { FC } from 'react';
import { styled } from 'Styles/stitches.config';
import StyledLi from '../base/base-list-item';
import { TCheckListItemProps } from '../types';

const CheckedLi = styled(StyledLi, {
    variants: {
        checked: {
            true: {
                listStyleImage: `url(${SelectedTickIconSVG})`,
            },
            false: {
                listStyleImage: `url(${DefaultTickIconSVG})`,
            },
        },
        crossed: {
            true: {
                textDecoration: 'line-through',
            },
            false: {
                textDecoration: 'none',
            },
        },
        dark: {
            true: {},
        },
    },
    defaultVariants: {
        checked: false,
        crossed: false,
    },
    compoundVariants: [
        {
            dark: true,
            crossed: true,
            css: {
                color: '$greyDark200',
            },
        },
        {
            dark: false,
            crossed: true,
            css: {
                color: '$greyLight600',
            },
        },
    ],
});

const CheckListItem: FC<TCheckListItemProps> = ({ children, checked, crossed, dark = false }) => (
    <CheckedLi type={'checklist'} checked={checked} crossed={crossed} dark={dark}>
        {children}
    </CheckedLi>
);

export default CheckListItem;
