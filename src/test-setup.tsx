import ThemeProvider from '@core/theme-context/theme-provider';
import { render, RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

type GlobalProviderProps = {
    children: ReactNode | ReactNode[] | string | string[];
};

// Entry point for all ThemeProviders, Stores, Contexts, etc.
const GlobalProvider = ({ children }: GlobalProviderProps) => {
    return <ThemeProvider>{children}</ThemeProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: GlobalProvider, ...options });

const resizeWindow = (x: number, y: number) => {
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event('resize'));
};

export * from '@testing-library/react';
export { customRender as render, resizeWindow };
