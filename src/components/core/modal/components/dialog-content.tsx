import Text from '@core/text/text';
import useTheme from '@core/theme-context/use-theme';
import { forwardRef } from 'react';
import { styled } from 'Styles/stitches.config';
import { TDialogContentProps } from '../types';
import ModalContentContainer from './modal-content-container';
import ModalFooterContainer from './modal-footer-container';
import TextTitle from './text-title';

const ContentContainer = styled('div', {
    padding: ' 0 24px',
    '@mobile': {
        padding: '0 16px',
    },
});

const DialogContent = forwardRef<HTMLDivElement, TDialogContentProps>(
    ({ title, content, action_buttons, has_close_button = true, block_action_buttons, ...rest }, ref) => {
        const { isDark } = useTheme();

        return (
            <ModalContentContainer dark={isDark} type={'dialog'} ref={ref} {...rest}>
                <TextTitle type={'dialog'} has_close_button={has_close_button}>
                    {title}
                </TextTitle>
                <ContentContainer>
                    <Text type={'paragraph-2'}>{content}</Text>
                </ContentContainer>
                <ModalFooterContainer
                    action_buttons={action_buttons}
                    type={'dialog'}
                    block_action_buttons={block_action_buttons}
                />
            </ModalContentContainer>
        );
    },
);

DialogContent.displayName = 'DialogContent';
export default DialogContent;

export type DialogContentType = {
    DialogContent: typeof DialogContent;
};
