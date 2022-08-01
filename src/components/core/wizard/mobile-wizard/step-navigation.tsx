import Text from '@core/text/text';
import React from 'react';
import { styled } from 'Styles/stitches.config';
import { StepNavigationProps } from '../types';

const StepContainer = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '16px',
});

const ProcessCircle = styled('div', {
    margin: '16px auto',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    position: 'relative',
    display: 'grid',
    placeItems: 'center',
});

const Inner = styled('div', {
    content: '',
    position: 'absolute',
    height: '84%',
    width: '84%',

    borderRadius: '50%',
    fontSize: '10px',
    color: '#FF444F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    variants: {
        dark: {
            true: {
                backgroundColor: '#0E0E0E',
            },
            false: {
                backgroundColor: '#F2F3F4',
            },
        },
    },
});

type MobileStepNavigationProps = Partial<StepNavigationProps> & {
    next_step_index?: number;
};

const StepNavigation = React.memo(({ steps, current_step_index, dark, next_step_index }: MobileStepNavigationProps) => {
    const [progress_angel, setProgressAngel] = React.useState<string>();
    const filtered_steps = steps?.filter((step) => !step.is_hidden && !step.is_disabled);
    const total_steps_count: number = filtered_steps ? filtered_steps.length : 0;
    const current = steps?.filter((step, idx) => idx === current_step_index)[0];
    const next_current = steps?.filter((step, idx) => idx === next_step_index)[0];

    const current_step_key = filtered_steps
        ?.map((a, idx) => {
            if (a.title === current?.title) {
                return idx;
            }
        })
        .find((a) => a);

    const current_step_number = !current_step_key ? 1 : current_step_key + 1;

    React.useEffect(() => {
        setProgressAngel(`conic-gradient(
                #FF444F ${current_step_number * (360 / total_steps_count)}deg,
                #D6DADB ${current_step_number * (360 / total_steps_count)}deg)`);
    }, [current_step_index]);

    return (
        <StepContainer data-testid="step-navigation">
            <ProcessCircle style={{ background: `${progress_angel}` }}>
                <Inner dark={dark}>
                    <Text as="label" type="paragraph-1" bold style={{ color: dark ? '#FFFFFF' : '$greyLight700' }}>
                        {current_step_number}/{total_steps_count}
                    </Text>
                </Inner>
            </ProcessCircle>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Text as="label" type="paragraph-1" bold style={{ color: dark ? '#FFFFFF' : '$greyLight700' }}>
                    {current?.title}
                </Text>
                {!!next_current && (
                    <Text as="label" style={{ fontSize: '14px', color: '#999999', fontWeight: '400' }}>
                        Next: {next_current.title}
                    </Text>
                )}
            </div>
        </StepContainer>
    );
});

export default StepNavigation;
