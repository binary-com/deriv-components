import type * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';
import BreadcrumnSeperatorIcon from '@assets/svg/breadcrumb-seperator.svg';

type BreadcrumbProps = {
    items: string[];
    dark: boolean;
    handleOnClick: (item: string) => any;
};

const ListItem = styled('li', {
    color: '$greyLight600',
    float: 'left',
    fontSize: '$2xs',
    listStyleType: 'none',
    lineHeight: '$lineHeight20',
    '&:hover': {
        color: '$greyLight700',
        cursor: 'default',
    },
    variants: {
        dark: {
            true: {
                color: '$greyDark200',
                '&:hover': {
                    color: '$greyDark100',
                },
            },
        },
        active: {
            true: {
                color: '$greyLight700',
            },
        },
    },
    compoundVariants: [
        {
            active: true,
            dark: true,
            css: {
                color: '$greyLight100',
                '&:hover': {
                    color: '$greyLight100',
                },
            },
        },
    ],
    '@mobile': {
        lineHeight: '$lineHeight18',
    },
});

const Svg = styled('svg', {
    xmlnsXlink: 'http://www.w3.org/1999/xlink',
    xmlns: 'http://www.w3.org/2000/svg',
    fill: '$greyLight600',
    verticalAlign: 'middle',
    width: 16,
    height: 16,
    margin: '0 0.5rem',
    variants: {
        dark: {
            true: {
                fill: '$greyDark200',
            },
        },
    },
    '@mobile': {
        margin: '0 0.25rem',
    },
});

const Breadcrumb = ({ items, dark, handleOnClick }: BreadcrumbProps) => {
    return (
        <>
            {items.map((item: string, idx: number) => (
                <ListItem key={idx} active={idx === items.length - 1} dark={dark}>
                    <span onClick={() => handleOnClick(item)}>{item}</span>
                    {idx < items.length - 1 && (
                        <Svg viewBox="0 0 7 16" dark={dark}>
                            <use href={`${BreadcrumnSeperatorIcon}#breadcrumb`} />
                        </Svg>
                    )}
                </ListItem>
            ))}
        </>
    );
};

export default Breadcrumb;

type BreadcrumbVariantProps = Stitches.VariantProps<typeof Breadcrumb>;

export const BreadcrumbStory = modifyVariantsForStory<BreadcrumbVariantProps, BreadcrumbProps, typeof Breadcrumb>(
    Breadcrumb,
);
