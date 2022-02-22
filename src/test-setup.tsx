import { render, RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

type GlobalProviderProps = {
    children: ReactNode | ReactNode[] | string | string[];
};

// Entry point for all ThemeProviders, Stores, Contexts, etc.
const GlobalProvider = ({ children }: GlobalProviderProps) => {
    return <div>{children}</div>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: GlobalProvider, ...options });

export * from '@testing-library/react';
export { customRender as render };
