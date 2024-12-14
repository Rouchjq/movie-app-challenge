// main tools
import { useState } from 'react';

// components
import { Dialog, DialogContent, DialogTitle } from '@/components/atoms/dialog';
import { Tabs, TabsContent } from '@/components/atoms/tabs';
import { Typography } from '@/components/atoms/typography';
import { Col } from '@/components/atoms/col';
import { Row } from '@/components/atoms/row';
import { SignUpForm } from './signup-form';
import { LoginForm } from './login-form';

// icons
import { X } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AuthDialogProps {
	isOpen: boolean;
	onClose: () => void;
}

export const AuthDialog = ({ isOpen, onClose }: AuthDialogProps) => {
	const [activeTab, setActiveTab] = useState<'login' | 'signup'>('signup');

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent
				className={cn(
					'bg-zinc-900/50 backdrop-blur-sm border-zinc-800',
					' lg:max-w-[60vw] h-[90vh] overflow-auto lg:h-[70vh]',
				)}
			>
				<DialogTitle className='hidden'>Quickbet Movies</DialogTitle>
				<Row className='h-max lg:h-full flex-wrap-reverse lg:flex-wrap relative'>
					<div className='hidden absolute top-3 left-3 p-6 lg:flex items-center'>
						<button
							onClick={onClose}
							className='text-gray-400 hover:text-white flex items-center gap-2'
						>
							<X size={20} />
							<span>Back</span>
						</button>
					</div>
					<Col
						xs={12}
						lg={7}
						className='h-max lg:h-full flex flex-col justify-center gap-5'
					>
						<div className='px-6 pb-12 '>
							<Tabs
								value={activeTab}
								className='w-full'
								defaultValue={activeTab}
								onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}
							>
								<div className='flex justify-center gap-3 mb-8'>
									<button
										className={`py-2 px-6 rounded-lg font-medium transition-colors ${
											activeTab === 'signup'
												? 'bg-yellow-500 text-black'
												: 'bg-zinc-800 text-white hover:bg-zinc-700'
										}`}
										onClick={() => setActiveTab('signup')}
									>
										Sign up
									</button>
									<button
										className={`py-2 px-6 rounded-lg font-medium transition-colors ${
											activeTab === 'login'
												? 'bg-yellow-500 text-black'
												: 'bg-zinc-800 text-white hover:bg-zinc-700'
										}`}
										onClick={() => setActiveTab('login')}
									>
										Sign In
									</button>
								</div>

								<TabsContent value='signup'>
									<SignUpForm onSuccess={onClose} />
								</TabsContent>

								<TabsContent value='login'>
									<LoginForm onSuccess={onClose} />
								</TabsContent>
							</Tabs>
						</div>

						<div className='p-4 border-t border-zinc-800 text-center text-sm text-gray-400 flex items-center justify-center'>
							For any questions, reach out to support@quickbetmovies.com
						</div>
					</Col>
					<Col xs={12} lg={5} className='h-max lg:h-full p-5'>
						<div className='p-10 h-full flex flex-col justify-between items-center  rounded-md bg-[#1C1C1C] overflow-hidden'>
							<div>
								<Typography
									as='h1'
									weight='bold'
									variant='lead'
									className='text-center mb-3'
								>
									Welcome to Quickbet Movies!
								</Typography>
								<Typography variant='h2' className='text-center'>
									🎬 Ready to unlock a universe of cinematic delights? Sign up now and
									start your journey with us!
								</Typography>
							</div>
							<div className='h-full w-full'>
								<Image
									priority
									width={300}
									height={300}
									alt='character auth'
									className='w-full h-full object-contain'
									src={
										activeTab === 'login'
											? '/assets/login-img.png'
											: '/assets/register-img.png'
									}
								/>
							</div>
						</div>
					</Col>
				</Row>
			</DialogContent>
		</Dialog>
	);
};
