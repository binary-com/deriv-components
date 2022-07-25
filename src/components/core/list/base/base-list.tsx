import { forwardRef } from 'react';
import { OrderedList, UnorderedList } from '../composed/derived-lists';
import { ListItemProps } from '../types';

const BaseList = forwardRef<HTMLUListElement | HTMLOListElement, ListItemProps>(({ type, children, ...rest }, ref) => {
    if (type === 'numbered') {
        return (
            <OrderedList {...rest} ref={ref as React.ForwardedRef<HTMLOListElement>}>
                {children}
            </OrderedList>
        );
    }
    return (
        <UnorderedList {...rest} ref={ref as React.ForwardedRef<HTMLUListElement>}>
            {children}
        </UnorderedList>
    );
});

export default BaseList;
