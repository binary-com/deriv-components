import Text from '@core/text/text';
import useTheme from '@core/theme-context/use-theme';
import { Title as PrimitiveTitle } from '@radix-ui/react-dialog';
import { forwardRef } from 'react';
import { styled } from 'Styles/stitches.config';
import { TTextTitleProps } from '../types';
import CloseIconButton from './close-icon-button';
import HorizontalLine from './horizontal-line';

const StyledTitle = styled(PrimitiveTitle, {
    margin: 0,
    flex: 1,
});

const TitleContainer = styled('div', {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
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
    },
    defaultVariants: {
        type: 'dialog',
    },
});

const TextTitle = forwardRef<HTMLDivElement, TTextTitleProps>(
    ({ children, icon_src, type, has_close_button = false, has_title_separator = false, ...rest }, ref) => {
        const { isDark } = useTheme();

        return (
            <>
                <TitleContainer type={type} ref={ref} {...rest}>
                    {icon_src && <img src={icon_src} alt={'title-icon'} />}
                    <StyledTitle asChild>
                        <Text bold type={'paragraph-1'}>
                            {children}
                        </Text>
                    </StyledTitle>
                    {has_close_button && <CloseIconButton type={type} is_absolute={false} />}
                </TitleContainer>
                {has_title_separator && <HorizontalLine dark={isDark} data-testid={'title-separator'} />}
            </>
        );
    },
);
TextTitle.displayName = 'foo';

export default TextTitle;

export type TextTitleType = { TextTitle: typeof TextTitle };
