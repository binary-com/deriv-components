import React, { Children, ReactElement } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

export const DialogTrigger = DialogPrimitive.Trigger;

export interface ModalTriggerProps {
    children?: ReactElement | ReactElement[];
}

const ModalTrigger = ({ children }: ModalTriggerProps) => {
    return (
        <React.Fragment>
            {Children?.map(children, (child) => {
                return <DialogTrigger>{child}</DialogTrigger>;
            })}
        </React.Fragment>
    );
};

export default ModalTrigger;
