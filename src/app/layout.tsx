import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from '@/components/atoms/sonner';
import { Navbar } from '@/components/molecules/navbar';
import { ThemeProvider } from '@/providers/theme-provider';
import { AuthProvider } from '@/context/auth/provider';
import { FavoritesProvider } from '@/context/favorite-movie/provider';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'Quickbet ',
	description: '- The best place to search for movies',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-muted`}
			>
				<AuthProvider>
					<FavoritesProvider>
						<ThemeProvider enableSystem attribute='class' defaultTheme='system'>
							<Navbar />
							{children}
							<Toaster position='top-right' richColors />
						</ThemeProvider>
					</FavoritesProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
