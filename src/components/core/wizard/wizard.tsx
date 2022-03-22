import Button from '@core/button/button';
import type * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';
import Text from '@core/text/text';
import CircularCheckIcon from '@assets/svg/circular-check-icon.svg';
import React from 'react';

const Container = styled('div', {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.72)',
});

const WizardContainer = styled('div', {
    position: 'relative',
    width: '1040px',
    height: '640px',
    left: 'calc(50% - 1040px / 2)',
    top: 'calc(50% - 640px / 2)',
    background: '#FFFFFF',
    borderRadius: '16px',
    display: 'flex',
    overflow: 'hidden',
});

const LeftPanel = styled('div', {
    width: '256px',
    height: '640px',
    background: '#F2F3F4',
    boxSizing: 'border-box',
    padding: '24px',
});
const Title = styled('div', {
    marginBottom: '24px',
});

const WizardBody = styled('div', {
    width: '784px',
    height: '640px',
});

const ContentContainer = styled('div', {
    width: '784px',
    height: '568px',
    position: 'relative',
    boxSizing: 'border-box',
    padding: '24px',
});

const FixedWidthContainer = styled('div', {
    width: '472px',
    height: '568px',
    boxSizing: 'border-box',
    padding: '24px',
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
});

const RightPanel = styled('div', {
    width: '312px',
    height: '568px',
    boxSizing: 'border-box',
    padding: '24px',
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    borderLeft: '2px solid #F2F3F4',
});

const Footer = styled('div', {
    width: '784px',
    height: '72px',
    boxSizing: 'border-box',
    padding: '16px 24px',
    borderTop: '2px solid #F2F3F4',
    display: 'flex',
    justifyContent: 'end',
    gap: '8px',
});

const InactiveBullet = styled('div', {
    width: '16px',
    height: '16px',
    border: '2px solid #D6DADB',
    boxSizing: 'border-box',
    borderRadius: '50%',
    background: '#FFFFFF',
});

const ActiveBullet = styled('div', {
    width: '16px',
    height: '16px',
    border: '2px solid #FF444F',
    boxSizing: 'border-box',
    borderRadius: '50%',
    background: '#FFFFFF',
});

const Before = styled('div', {
    bottom: '20px',
    content: '',
    left: '7px',
    position:
        'absolute' /* positioning must be absolute here, and relative positioning must be applied to the parent */,
    top: '20px',
    borderLeft: '2px solid #D6DADB',
});

const After = styled('div', {
    borderLeft: '2px solid #FF444F',
    bottom: '20px',
    content: '',
    left: '7px',
    position:
        'absolute' /* positioning must be absolute here, and relative positioning must be applied to the parent */,
    top: '20px',
    transition: 'height 0.3s ease',
});

const CheckIcon = styled('img', {
    width: '16px',
    height: '16px',
});

const StepContainer = styled('div', {
    width: '100%',
    height: '40px',
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    zIndex: '1',
    position: 'relative',
});

const Step = ({
    active = false,
    complete,
    name,
    ref,
}: {
    active?: boolean;
    complete?: boolean;
    name: string;
    ref: React.RefObject<HTMLLabelElement>;
}) => (
    <StepContainer>
        {complete ? (
            <CheckIcon src={CircularCheckIcon} alt="check_icon" />
        ) : active ? (
            <ActiveBullet />
        ) : (
            <InactiveBullet />
        )}
        <label ref={ref}>
            <Text as="div" type="paragraph-2" bold={active}>
                {name}
            </Text>
        </label>
    </StepContainer>
);

const Steps = React.memo(() => {
    const current_step = 2;
    let active = false;

    const steps = ['Product', 'App', 'Password', 'Wallet', 'Personal details'];

    const el_completed_bar = React.useRef<HTMLDivElement>(null);
    const first_identifier = React.useRef<HTMLLabelElement>(null);

    const animateCompleteBar = () => {
        const el_first_identifier = first_identifier.current || {
            offsetTop: 0,
            clientHeight: 1,
        };
        const each = 100 / steps.length;
        if (el_completed_bar.current) {
            el_completed_bar.current.style.height = `${current_step * each}%`;
            el_completed_bar.current.style.transform = `translateX(${
                el_first_identifier.offsetTop + el_first_identifier.clientHeight / 2
            }px)`;
        }
    };

    React.useEffect(() => {
        animateCompleteBar();
    });

    return (
        <div
            style={{
                position: 'relative',
            }}
        >
            <Before
                css={{
                    height: `calc(100% * ${steps.length - 1} / ${steps.length})`,
                }}
            />
            {steps.map((step, idx) => {
                active = idx === current_step;
                return (
                    <Step
                        key={idx + 1}
                        ref={first_identifier}
                        active={active}
                        complete={idx < current_step}
                        name={step}
                    />
                );
            })}
            <After ref={el_completed_bar} />
        </div>
    );
});

export interface TWizardProps {
    has_form?: boolean;
    has_right_panel?: boolean;
    children?: React.ReactElement[] | string;
}

const Wizard = ({ has_form = true, has_right_panel = true, children = 'text' }: TWizardProps) => {
    return (
        <Container>
            <WizardContainer>
                <LeftPanel>
                    <Title>
                        <Text as="div" type="subtitle-2" bold>
                            Title
                        </Text>
                    </Title>
                    <Steps />
                </LeftPanel>
                <WizardBody>
                    <ContentContainer>
                        {has_form ? <FixedWidthContainer>{children}</FixedWidthContainer> : children}
                        {has_right_panel && <RightPanel>{children}</RightPanel>}
                    </ContentContainer>
                    <Footer>
                        <Button color="secondary" size="large">
                            Left Button
                        </Button>
                        <Button size="large">Right Button</Button>
                    </Footer>
                </WizardBody>
            </WizardContainer>
        </Container>
    );
};

export default Wizard;

type NativeDivProps = React.ComponentPropsWithoutRef<'div'>;

// Only export/use these in Storybook since they are just for the Stitchs x SB handshake
// Can be here or in the story
// We need to Omit css as Emotions global css typedef clashes with the Stitches css typedef
// Storybook currently uses v10+ of Emotion, this issue is fixed in Emotion v11+
// TODO: Remove Omit once Storybook's Emotion is running on v11+
type WizardVariantProps = Stitches.VariantProps<typeof Wizard> & Omit<NativeDivProps, 'css'>;
interface WizardProps extends WizardVariantProps {}
// Use this as the type in Story; i.e. `ComponentMeta<typeof ButtonStory>`
export const TextStory = modifyVariantsForStory<WizardVariantProps, WizardProps, typeof Wizard>(Wizard);
