import useTheme from '@core/theme-context/use-theme';
import { forwardRef } from 'react';
import { TPageContentProps } from '../types';
import ModalContentContainer from './modal-content-container';
import ModalFooterContainer from './modal-footer-container';
import TextTitle from './text-title';

const PageContent = forwardRef<HTMLDivElement, TPageContentProps>(
    (
        {
            title,
            has_close_button,
            children,
            has_title_separator = false,
            has_footer_separator = false,
            action_buttons,
            block_action_buttons,
            should_prevent_close_on_click_outside = false,
            onInteractOutside,
        },
        ref,
    ) => {
        const { isDark } = useTheme();

        return (
            <ModalContentContainer
                dark={isDark}
                type={'page'}
                onInteractOutside={(event) => {
                    if (should_prevent_close_on_click_outside) {
                        event?.preventDefault();
                    } else {
                        onInteractOutside?.(event);
                    }
                }}
                ref={ref}
            >
                <TextTitle type={'page'} has_close_button={has_close_button} has_title_separator={has_title_separator}>
                    {title}
                </TextTitle>
                {children}
                <ModalFooterContainer
                    block_action_buttons={block_action_buttons}
                    action_buttons={action_buttons}
                    has_footer_separator={has_footer_separator}
                    type={'page'}
                />
            </ModalContentContainer>
        );
    },
);

PageContent.displayName = 'PageContent';

export default PageContent;

export type PageContentType = {
    PageContent: typeof PageContent;
};
