import { ReactElement } from 'react';
import * as Stitches from '@stitches/react';
import CurvedArrowIcon from '@assets/svg/curved-arrow.svg';
import StraightArrowIcon from '@assets/svg/straight-arrow.svg';
import useTheme from '@core/theme-context/use-theme';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';

type ArrowDirection =
    | 'top_left'
    | 'top_center'
    | 'top_right'
    | 'right_top'
    | 'right_center'
    | 'right_bottom'
    | 'bottom_right'
    | 'bottom_center'
    | 'bottom_left'
    | 'left_top'
    | 'left_center'
    | 'left_bottom';

type ArrowTooltipProps = {
    arrow_direction?: ArrowDirection;
    arrow_color?: string;
    arrow_size?: number;
    class_name?: string;
    class_name_arrow?: string;
    icon?: string;
    is_fixed_width?: boolean;
    tooltip_content: ReactElement;
    open_tooltip: boolean;
};

const TooltipContainer = styled('div', {
    backgroundColor: '$greyLight400',
    color: '$greyLight700',
    borderRadius: '8px',
    width: 'fit-content',
    fontSize: '$2xs',
    lineHeight: '$lineHeight20',
    padding: '1rem',
    margin: 0,
    position: 'relative',
    '@mobile': {
        fontSize: '$3xs',
        lineHeight: '$lineHeight18',
    },
    variants: {
        dark: {
            true: {
                backgroundColor: '$greyDark400',
                color: '$greyLight100',
            },
        },
    },
});

const Icon = styled('img', {
    width: 16,
    height: 16,
    paddingRight: '1rem',
});

const ArrowImage = styled('svg', {
    position: 'absolute',
    xmlnsXlink: 'http://www.w3.org/1999/xlink',
    xmlns: 'http://www.w3.org/2000/svg',
    verticalAlign: 'middle',
    viewBox: '0 0 38 38',
    width: 78,
    height: 78,
    '@mobile': {
        width: 38,
        height: 38,
    },
    variants: {
        arrow_direction: {
            top_left: {
                transform: 'rotate(90deg)',
                bottom: 'calc(100% + 8px)',
                right: 'calc(100% - 16px)',
            },
            top_center: {
                transform: 'translate(-50%, 0%)',
                bottom: 'calc(100% + 8px)',
                left: '50%',
            },
            top_right: {
                transform: ' scaleX(-1) rotate(90deg)',
                bottom: 'calc(100% + 8px)',
                left: 'calc(100% - 16px)',
            },
            right_top: {
                transform: 'rotate(180deg)',
                bottom: 'calc(100% - 16px)',
                left: 'calc(100% + 8px)',
            },
            right_center: {
                transform: 'rotate(90deg) translate(-50%, 0%)',
                top: '50%',
                left: 'calc(100% + 8px)',
                translateY: '50%',
            },
            right_bottom: {
                transform: 'scaleX(-1)',
                top: 'calc(100% - 16px)',
                left: 'calc(100% + 8px)',
            },
            bottom_right: {
                transform: 'rotate(270deg)',
                top: 'calc(100% + 8px)',
                left: 'calc(100% - 16px)',
            },
            bottom_center: {
                transform: 'rotate(180deg) translate(-50%, 0%)',
                top: 'calc(100% + 8px)',
                right: '50%',
            },
            bottom_left: {
                transform: 'scaleX(-1) rotate(270deg)',
                top: 'calc(100% + 8px)',
                right: 'calc(100% - 16px)',
            },
            left_top: {
                transform: 'scaleX(-1) rotate(180deg)',
                bottom: 'calc(100% - 16px)',
                right: 'calc(100% + 8px)',
            },
            left_center: {
                transform: 'rotate(270deg) translate(-50%, 0%)',
                bottom: '50%',
                right: 'calc(100% + 8px)',
                translateY: '50%',
            },
            left_bottom: {
                top: 'calc(100% - 16px)',
                right: 'calc(100% + 8px)',
            },
        },
    },
});

const Flex = styled('div', {
    display: 'flex',
});

const ArrowTooltip = ({
    arrow_direction = 'top_center',
    arrow_color = '$coral500',
    class_name,
    class_name_arrow,
    icon,
    is_fixed_width,
    tooltip_content,
    open_tooltip = true,
    arrow_size,
}: ArrowTooltipProps) => {
    const { isDark } = useTheme();
    const getArrowIcon = () => {
        if (['top_center', 'right_center', 'bottom_center', 'left_center'].includes(arrow_direction))
            return { icon: StraightArrowIcon, viewBox: '0 0 26 40' };

        return { icon: CurvedArrowIcon, viewBox: '0 0 40 40' };
    };
    return (
        <>
            {open_tooltip && (
                <TooltipContainer
                    dark={isDark}
                    css={{
                        width: is_fixed_width ? 280 : 'fit-content',
                        '@mobile': {
                            width: is_fixed_width ? 200 : 'fit-content',
                        },
                    }}
                    className={class_name}
                >
                    <Flex>
                        {icon && <Icon src={icon} />}
                        <div>{tooltip_content}</div>
                    </Flex>
                    <ArrowImage
                        css={{ stroke: arrow_color, width: arrow_size, height: arrow_size }}
                        arrow_direction={arrow_direction}
                        viewBox={getArrowIcon().viewBox}
                        className={class_name_arrow}
                    >
                        <use href={`${getArrowIcon().icon}#tooltip`} />
                    </ArrowImage>
                </TooltipContainer>
            )}
        </>
    );
};

export default ArrowTooltip;

type ArrowTooltipVariantProps = Stitches.VariantProps<typeof ArrowTooltip>;

export const ArrowTooltipStory = modifyVariantsForStory<
    ArrowTooltipVariantProps,
    ArrowTooltipProps,
    typeof ArrowTooltip
>(ArrowTooltip);
