import React from 'react';
import classNames from 'classnames';
import Text from '@core/text/text';
import { TListItem } from './types';
import { styled } from 'Styles/stitches.config';

type TItems = {
    className?: string;
    dark: boolean;
    handleSelect: (item: TListItem) => void;
    is_align_text_center: boolean;
    items: TListItem[];
    nodes?: React.MutableRefObject<Map<string, React.MutableRefObject<HTMLDivElement>['current']>>['current'];
    onKeyPressed: (e: React.KeyboardEvent<HTMLDivElement>, item: TListItem) => void;
    value: string;
};

/* 
    ItemContainer - This acts as a wrapper and styles item value
*/
const ItemContainer = styled('div', {
    cursor: 'pointer',
    paddingX: '1rem',
    paddingY: '0.625rem',
    outline: 'none',

    variants: {
        dark: {
            true: {
                '&:not(.nohover):hover, &:not(.nohover):focus': {
                    //find color
                    backgroundColor: '#242828',
                },
            },
            false: {
                '&:not(.nohover):hover, &:not(.nohover):focus': {
                    backgroundColor: '$greyLight300',
                },
            },
        },
        selected: {
            true: {
                backgroundColor: '$greyLight400',
                fontWeight: 'bold',
            },
        },
        disbaled: {
            true: {
                color: '$greyLight600',
                cursor: 'default',
                opacity: 0.3,
            },
        },
        is_align_text_center: {
            true: {
                textAlign: 'center',
            },
        },
    },

    compoundVariants: [
        {
            dark: true,
            selected: true,
            css: {
                backgroundColor: '$greyDark500',
            },
        },
    ],
});

const Items = ({ items, ...props }: TItems) => {
    return (
        <>
            {items.map((item, idx) => {
                return <Item key={idx} item={item} {...props} />;
            })}
        </>
    );
};

const Item = ({
    className,
    dark,
    handleSelect,
    is_align_text_center,
    item,
    nodes,
    onKeyPressed,
    value,
}: Omit<TItems, 'items'> & { item: TListItem }) => {
    const item_ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleKeyPress: React.KeyboardEventHandler<HTMLDivElement> = (e) => onKeyPressed(e, item);
        const removeListeners = () => {
            nodes?.delete(item.value);
            item_ref.current?.removeEventListener('keydown', handleKeyPress);
        };

        if (item.disabled) removeListeners();
        else {
            item_ref.current?.addEventListener('keydown', handleKeyPress);
            if (item_ref.current) {
                nodes?.set(item.value.toString(), item_ref.current);
            }
        }

        return () => removeListeners();
    }, [item, nodes, onKeyPressed]);

    return (
        <ItemContainer
            className={classNames(className, {
                nohover: value === item.value || item.disabled,
            })}
            dark={dark}
            data-testid="dti_list_item"
            disbaled={item.disabled}
            id={item.value}
            onClick={handleSelect.bind(null, item)}
            ref={item_ref}
            selected={value === item.value}
            tabIndex={item.disabled ? undefined : 0}
        >
            <Text
                align={is_align_text_center ? 'center' : 'left'}
                color={dark && value === item.value ? 'prominent' : 'general'}
                css={{ margin: 0 }}
                type="paragraph-2"
            >
                {item.text}
            </Text>
        </ItemContainer>
    );
};

export default Items;
