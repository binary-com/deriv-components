import React from 'react';
import { styled } from 'Styles/stitches.config';
import StyledLi from '../base/base-list-item';
import { TCompoundListItemProps } from '../types';

const CompoundLi = styled(StyledLi, {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 16px',
    margin: '8px 8px',
    alignItems: 'center',
    borderRadius: '4px',
    '& .compound--title': {
        padding: '0px 16px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        '& .title--text': {
            fontSize: '1em',
        },
        '& .subtitle--text': {
            fontSize: '0.8em',
            color: '$greyLight600',
        },
    },
    '& .compound--label': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
    },
    variants: {
        label: {
            default: {
                '& .compount--label__text': {
                    backgroundColor: 'transparent',
                },
            },
            pill: {
                '& .compount--label__text': {
                    backgroundColor: '$greyLight200',
                    borderRadius: '4px',
                    padding: '5px 8px',
                    fontWeight: 'bold',
                },
            },
        },
        dark: {
            true: {
                '&:hover': {
                    backgroundColor: '$greyDark500',
                },
                '&:active': {
                    backgroundColor: '$greyDark400',
                    color: '$greyLight100',
                },
            },
            false: {
                '&:hover': {
                    backgroundColor: '$greyLight300',
                },
                '&:active': {
                    backgroundColor: '$greyLight400',
                },
            },
        },
    },
    compoundVariants: [
        {
            dark: true,
            label: 'pill',
            css: {
                '& .compount--label__text': {
                    backgroundColor: '$greyDark800',
                    borderRadius: '4px',
                    padding: '5px 8px',
                    fontWeight: 'bold',
                },
            },
        },
    ],
    defaultVariants: {
        label: 'default',
        dark: false,
    },
});

const CompoundListItem = ({ item, dark, onClickItem, label = 'default', classNameItems }: TCompoundListItemProps) => {
    return (
        <CompoundLi
            className={classNameItems || ''}
            type={'compound'}
            label={label}
            dark={dark}
            onClick={(event: React.MouseEvent<HTMLLIElement>) => onClickItem?.(item, event)}
        >
            {item.icon_src && <img src={item.icon_src} alt="icon" />}
            <div className="compound--title">
                <div className="title--text" data-testid={'title'}>
                    {item.title}
                </div>
                <div className="subtitle--text" data-testid={'subtitle'}>
                    {item.subtitle}
                </div>
            </div>
            <div className="compound--label">
                <div className="compount--label__text" data-testid={'label'}>
                    {item.label}
                </div>
                {item.action_icon_element || null}
            </div>
        </CompoundLi>
    );
};

export default CompoundListItem;
