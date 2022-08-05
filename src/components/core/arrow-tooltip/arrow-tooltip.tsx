import * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';
import { keyframes } from '@stitches/react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import CurvedArrowIcon from '@assets/svg/curved-arrow.svg';
import StraightArrowIcon from '@assets/svg/straight-arrow.svg';
import BreadCrumbIcon from '@assets/svg/breadcrumb-seperator.svg';

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
    dark: boolean;
    arrow_direction: ArrowDirection;
};

const TooltipContainer = styled('div', {
    backgroundColor: '#D6DADB',
    borderRadius: '8px',
    width: 'fit-content',
    margin: 0,
    position: 'relative',
    left: 100, // to remove
    top: 100,
});

const Svg = styled('svg', {
    xmlnsXlink: 'http://www.w3.org/1999/xlink',
    xmlns: 'http://www.w3.org/2000/svg',
    verticalAlign: 'middle',
    width: 40,
    height: 40,
    fill: '$coral500',
});

const ArrowImage = styled('img', {
    position: 'absolute',
    width: 40,
    height: 40,
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

const ArrowTooltip = ({ dark, arrow_direction = 'top_center' }: ArrowTooltipProps) => {
    const getArrowIcon = () => {
        if (['top_center', 'right_center', 'bottom_center', 'left_center'].includes(arrow_direction))
            return StraightArrowIcon;

        return CurvedArrowIcon;
    };
    return (
        <>
            <TooltipContainer>
                <div style={{ padding: 16 }}>
                    <span>this si sample text contetnt</span>
                </div>
                <ArrowImage src={getArrowIcon()} arrow_direction={arrow_direction} />
            </TooltipContainer>
            {/* <Svg>
                            <use href={`${CurvedArrowIcon}#tooltip`} />
                        </Svg> */}
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
