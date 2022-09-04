import { ReactElement } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export type TTooltipTriggerProps = {
    children: ReactElement;
    setOpenTooltip?: (value: boolean) => void;
};

const TooltipTrigger = ({ children, setOpenTooltip, ...props }: TTooltipTriggerProps) => {
    return (
        <TooltipPrimitive.Trigger
            style={{
                position: 'relative',
            }}
            asChild
            onMouseEnter={() => (setOpenTooltip ? setOpenTooltip(true) : '')}
            onMouseLeave={() => (setOpenTooltip ? setOpenTooltip(false) : '')}
            {...props}
        >
            {children}
        </TooltipPrimitive.Trigger>
    );
};

export default TooltipTrigger;
