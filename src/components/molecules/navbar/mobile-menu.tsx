// main tools
import Link from 'next/link';

// components
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/atoms/sheet';
import { Typography } from '@/components/atoms/typography';
import { DialogTitle } from '@/components/atoms/dialog';
import { Button } from '@/components/atoms/button';

// utils
import { cn } from '@/lib/utils';

// icons
import { LogOut, MenuIcon, Moon, Sun } from 'lucide-react';

// styles
import classes from './style.module.css';

// types
import type { FC } from 'react';
import { routes } from './utils';
import { UserType } from '@/types/models/auth';

type MobileMenuProps = {
	pathname: string;
	user: UserType | null;
	handleTheme: () => void;
	handleLogout: () => void;
	isAuthenticated: boolean;
	setIsAuthOpen: (value: boolean) => void;
};

export const MobileMenu: FC<MobileMenuProps> = ({
	user,
	pathname,
	handleTheme,
	handleLogout,
	setIsAuthOpen,
	isAuthenticated,
}) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline' size='icon' className='lg:hidden bg-yellow1'>
					<MenuIcon className='h-8 w-8' />
					<span className='sr-only'>Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				side='left'
				className='bg-accent flex flex-col justify-between'
			>
				<DialogTitle className='hidden'>menu mobile</DialogTitle>
				<div>
					<div className='mb-5'>
						{isAuthenticated && user ? (
							<DropdownMenu>
								<DropdownMenuTrigger className='flex items-center justify-center gap-2  w-full'>
									<Avatar>
										<AvatarImage src='' alt='profilePicture' />
										<AvatarFallback>{user.name}</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent side='bottom' className='w-56 bg-background'>
									<DropdownMenuItem onClick={handleLogout}>
										<LogOut />
										<span>Log out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Button variant='outline' size='sm' onClick={() => setIsAuthOpen(true)}>
								Sign in
							</Button>
						)}
					</div>

					<div className='grid w-full gap-3 mb-5 '>
						{routes.map((route) => (
							<Link
								href={route.url}
								prefetch={false}
								key={route.url}
								className={cn(
									'flex items-center',
									pathname === '/quest' && classes.currentPath_mobile,
								)}
							>
								<Typography
									as='span'
									weight='semibold'
									className='text-lg'
									textColor='accent-foreground'
								>
									{route.name}
								</Typography>
							</Link>
						))}
					</div>
				</div>

				<div className='flex items-center justify-center gap-2'>
					<Typography as='span' weight='semibold' textColor='accent-foreground'>
						Toggle theme
					</Typography>
					<Button variant='outline' size='icon' alone onClick={handleTheme}>
						<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
						<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
};
