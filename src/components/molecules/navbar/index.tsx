'use client';

// main tools
import Image from 'next/image';
import Link from 'next/link';

// components
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from '@/components/atoms/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/avatar';
import { Typography } from '@/components/atoms/typography';
import { Button } from '@/components/atoms/button';
import { MobileMenu } from './mobile-menu';

// hooks
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

// libs
import { cn } from '@/lib/utils';
import { routes } from './utils';

// icons
import { LogOut, Moon, Sun } from 'lucide-react';

// styles
import classes from './style.module.css';

// types
import type { FC } from 'react';

export const Navbar: FC = () => {
	const pathname = usePathname();
	const { setTheme, theme } = useTheme();
	const handleLogout = () => {
		console.log('logout');
	};

	const handleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

	return (
		<nav className='flex items-center justify-between px-10 bg-background h-[10vh]'>
			<div className='flex items-center gap-10'>
				<div>
					<Link href='/'>
						<Image
							width={150}
							height={150}
							alt='quickbet logo'
							src='/assets/logo.svg'
						/>
					</Link>
				</div>

				<div className='hidden lg:flex gap-4 h-full'>
					{routes.map((route) => (
						<Link
							href={route.url}
							prefetch={false}
							key={route.url}
							className={cn(
								'flex items-center ',
								pathname === route.url && classes.currentPath,
							)}
						>
							<Typography as='span' weight='semibold' textColor='card' size='sm'>
								{route.name}
							</Typography>
						</Link>
					))}
				</div>
			</div>

			<div className='hidden lg:flex gap-2'>
				<Button variant='outline' size='icon' alone onClick={handleTheme}>
					<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger className='flex items-center gap-2'>
						<Avatar>
							<AvatarImage
								src='/assets/images/login/monkey-22.webp' // todo: Borrar
								alt='profilePicture'
							/>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div>
							<Typography as='span' weight='semibold'>
								username
							</Typography>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent side='bottom' className='w-56 bg-muted '>
						<DropdownMenuItem onClick={handleLogout}>
							<LogOut />
							<span>Log out</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<MobileMenu
				handleLogout={handleLogout}
				pathname={pathname}
				handleTheme={handleTheme}
			/>
		</nav>
	);
};
