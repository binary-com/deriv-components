import { Children, ReactElement, cloneElement, useState } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import TooltipContent from './tooltip-content';
import TooltipTrigger from './tooltip-trigger';

export type TooltipProps = {
    children: ReactElement[];
};

const Tooltip = ({ children }: TooltipProps) => {
    const [open_tooltip, setOpenTooltip] = useState(false);
    return (
        <TooltipPrimitive.Root open={open_tooltip}>
            {Children.map(children, (child) => {
                if (child && !child.props.setOpenTooltip) {
                    return cloneElement(child, { setOpenTooltip });
                }
                return child;
            })}
        </TooltipPrimitive.Root>
    );
};

export default Tooltip;
Tooltip.Content = TooltipContent;
Tooltip.Trigger = TooltipTrigger;
Tooltip.Provider = TooltipPrimitive.Provider;
