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
    background: '$white',
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

const Bullet = styled('div', {
    width: '16px',
    height: '16px',
    border: '2px solid #D6DADB',
    boxSizing: 'border-box',
    borderRadius: '50%',
    background: '$white',

    variants: {
        active: {
            true: {
                border: '2px solid #FF444F',
            },
        },
        complete: {
            true: {
                border: '2px solid #FF444F',
                background: `#FF444F url(${CircularCheckIcon}) no-repeat center`,
            },
        },
        disabled: {
            true: {
                backgroundColor: '#D6D6D6',
                border: '2px solid #D6D6D6',
            },
        },
        dark: {
            true: {},
        },
    },
    compoundVariants: [
        {
            active: true,
            dark: true,
            css: {
                backgroundColor: '#0E0E0E',
                border: '2px solid #FF444F',
            },
        },
        {
            disabled: true,
            dark: true,
            css: {
                backgroundColor: '#3E3E3E',
                border: '2px solid #3E3E3E',
            },
        },
    ],
    defaultVariants: {
        active: false,
        complete: false,
        disabled: false,
        dark: false,
    },
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

const Step = styled('div', {
    width: '100%',
    height: '40px',
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    zIndex: '1',
    position: 'relative',
});

type TStepsProps = {
    steps: TItemsState[];
    current_step: number;
    dark?: boolean;
};

const Steps = React.memo(({ steps, current_step, dark = false }: TStepsProps) => {
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
                const active = idx === current_step;
                const disabled = idx > current_step + 2; // temporary stub, still figuring out when a step must be disabled
                return (
                    <Step key={idx + 1}>
                        <Bullet active={active} complete={step.complete} disabled={disabled} dark={dark} />
                        <label>
                            <Text
                                as="div"
                                type="paragraph-2"
                                bold={active}
                                css={{ color: disabled ? (dark ? '#3E3E3E' : '#999999') : dark ? '$white' : '#333333' }}
                            >
                                {step.header.title}
                            </Text>
                        </label>
                    </Step>
                );
            })}
            <After
                css={{
                    height: `${current_step * (100 / steps.length)}%`,
                }}
            />
        </div>
    );
});

type TItemsState = {
    header: { [key: string]: string };
    cancel_button_name?: string;
    submit_button_name?: string;
    complete?: boolean;
};

export interface TWizardProps {
    has_form?: boolean;
    has_right_panel?: boolean;
    main_content?: React.ReactElement[] | string;
    right_panel_content?: React.ReactElement[] | string;
}

const Wizard = ({
    has_form = true,
    has_right_panel = true,
    main_content = 'text',
    right_panel_content = 'right_panel_content',
}: TWizardProps) => {
    const wizard_title = 'app'; // temporary stub
    const [current_step, setCurrentStep] = React.useState<number>(0);
    const [steps, setSteps] = React.useState<TItemsState[]>([
        // temporary stub
        {
            header: {
                active_title: 'Choose a product',
                title: 'Product',
            },
        },
        {
            header: {
                active_title: 'Add an app',
                title: 'App',
            },
        },
        {
            header: {
                active_title: 'Create a password',
                title: 'Password',
            },
        },
        {
            header: {
                active_title: 'Create a wallet',
                title: 'Wallet',
            },
        },
        {
            header: {
                active_title: 'Personal details',
                title: 'Personal details',
            },
        },
        {
            header: {
                active_title: 'Address information',
                title: 'Address',
            },
        },
        {
            header: {
                active_title: 'Terms of use',
                title: 'Terms of use',
            },
        },
        {
            header: {
                active_title: 'Completed',
                title: 'Complete',
            },
            cancel_button_name: 'Maybe later',
            submit_button_name: 'Deposit',
        },
    ]);

    const nextStep = () => {
        if (current_step + 1 < steps.length) {
            setCurrentStep(current_step + 1);
            setSteps(
                steps.map((step, idx) => (idx === current_step ? { ...steps[current_step], complete: true } : step)),
            );
        }
    };

    const prevStep = () => {
        setCurrentStep(current_step - 1);
    };

    const getBody = () => (
        <>
            <Text as="div" type="subtitle-1" bold>
                {steps[current_step].header.active_title}
            </Text>
            {main_content}
        </>
    );

    return (
        <Container>
            <WizardContainer>
                <LeftPanel>
                    <Title>
                        <Text as="div" type="subtitle-2" bold>
                            Let's get you a new {wizard_title}.
                        </Text>
                    </Title>
                    <Steps steps={steps} current_step={current_step} />
                </LeftPanel>
                <WizardBody>
                    <ContentContainer>
                        {has_form ? <FixedWidthContainer>{getBody()}</FixedWidthContainer> : getBody()}
                        {has_right_panel && <RightPanel>{right_panel_content}</RightPanel>}
                    </ContentContainer>
                    <Footer>
                        <Button color="secondary" size="large" onClick={prevStep} disabled={current_step < 1}>
                            {steps[current_step].cancel_button_name || 'Back'}
                        </Button>
                        <Button size="large" onClick={nextStep}>
                            {steps[current_step].submit_button_name || 'Next'}
                        </Button>
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
