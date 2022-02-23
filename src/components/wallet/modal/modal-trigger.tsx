import { Children, ReactElement } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

export const DialogTrigger = DialogPrimitive.Trigger;

export interface ModalTriggerProps {
    children?: ReactElement | ReactElement[];
}

const ModalTrigger = ({ children }: ModalTriggerProps) => {
    return (
        <>
            {Children?.map(children, (child) => {
                return <DialogTrigger>{child}</DialogTrigger>;
            })}
        </>
    );
};

export default ModalTrigger;
