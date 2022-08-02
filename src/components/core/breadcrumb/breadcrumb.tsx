import * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';
import BreadcrumnSeperatorIcon from '@assets/svg/breadcrumb-seperator.svg';
import { useContext } from 'react';
import ThemeContext from '@core/theme-context/theme-context';

type BreadcrumbProps = {
    items: string[];
    handleOnClick: (item: string) => void;
};

const BreadcrumbContainer = styled('ul', {
    margin: 0,
    padding: 0,
});

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
        fontSize: '$3xs',
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

const Breadcrumb = ({ items, handleOnClick }: BreadcrumbProps) => {
    const { isDark } = useContext(ThemeContext);
    return (
        <BreadcrumbContainer>
            {items.map((item: string, idx: number) => (
                <ListItem key={item} active={idx === items.length - 1} dark={isDark}>
                    <span onClick={() => handleOnClick(item)}>{item}</span>
                    {idx < items.length - 1 && (
                        <Svg dark={isDark}>
                            <use href={`${BreadcrumnSeperatorIcon}#breadcrumb`} />
                        </Svg>
                    )}
                </ListItem>
            ))}
        </BreadcrumbContainer>
    );
};

export default Breadcrumb;

type BreadcrumbVariantProps = Stitches.VariantProps<typeof Breadcrumb>;

export const BreadcrumbStory = modifyVariantsForStory<BreadcrumbVariantProps, BreadcrumbProps, typeof Breadcrumb>(
    Breadcrumb,
);
