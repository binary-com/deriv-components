import React from 'react';
import Button from '../../button/button';
import Text from '../../text/text';

type TTestFormProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    dark?: boolean;
};

export const TestForm: React.FC<TTestFormProps | { [key: string]: unknown }> = ({ dark, onClick, children }) => {
    return (
        <div>
            <Text
                as="div"
                type="paragraph-1"
                bold={false}
                css={{ color: dark ? '#C2C2C2' : '#333333', marginBottom: '24px' }}
            >
                Form
            </Text>
            <Button onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}>{children}</Button>
        </div>
    );
};
