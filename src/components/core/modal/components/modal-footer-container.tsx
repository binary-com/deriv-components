import Button from '@core/button/button';
import useTheme from '@core/theme-context/use-theme';
import { styled } from 'Styles/stitches.config';
import { TModalFooterContainer } from '../types';
import HorizontalLine from './horizontal-line';

const Container = styled('div', {
    variants: {
        type: {
            dialog: {
                padding: '24px',
                '@mobile': {
                    padding: '16px',
                },
            },
            page: {
                padding: '16px 24px',
                '@mobile': {
                    padding: '14px 16px',
                },
            },
        },
        block: {
            true: {
                display: 'block',
                width: '100%',
                '& > button:not(:first-child)': {
                    marginTop: '8px',
                },
            },
            false: {
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                '& > button': {
                    marginLeft: '8px',
                },
            },
        },
    },
    defaultVariants: {
        type: 'dialog',
    },
});

const ModalFooterContainer = ({
    action_buttons,
    type,
    block_action_buttons = false,
    has_footer_separator = false,
}: TModalFooterContainer) => {
    const { isDark } = useTheme();

    if (action_buttons?.length) {
        return (
            <>
                {has_footer_separator && <HorizontalLine dark={isDark} data-testid={'footer-separator'} />}
                <Container block={block_action_buttons} type={type}>
                    {action_buttons?.map((buttonItem) => {
                        return (
                            <Button
                                key={buttonItem.id}
                                data-testid={'action-button'}
                                block={block_action_buttons}
                                color={buttonItem.color}
                                onClick={buttonItem?.onClick}
                            >
                                {buttonItem.text}
                            </Button>
                        );
                    })}
                </Container>
            </>
        );
    }
    return null;
};

export default ModalFooterContainer;
