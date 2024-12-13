'use client';
// main tools
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// types
import { ComponentProps, FC, ReactNode } from 'react';

interface ThemeProviderProps extends ComponentProps<typeof NextThemesProvider> {
	children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
	children,
	...props
}) => {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
