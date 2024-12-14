import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Typography } from '@/components/atoms/typography';
import { useAuth } from '@/hooks/use-auth';

interface SignUpFormProps {
	onSuccess: () => void;
}

export const LoginForm = ({ onSuccess }: SignUpFormProps) => {
	const { loginUser } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const success = await loginUser('user@example.com', 'password');
		if (success) onSuccess();
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			<div className='space-y-2 text-center '>
				<Typography as='span' variant='small'>
					We love having you back
				</Typography>
			</div>
			<div className='space-y-2'>
				<Input
					required
					type='email'
					placeholder='Enter your email'
					className='bg-zinc-800 border-zinc-700 text-white'
				/>
			</div>
			<div className='space-y-2'>
				<Input
					required
					type='password'
					placeholder='Create a password'
					className='bg-zinc-800 border-zinc-700 text-white'
				/>
			</div>
			<Button
				type='submit'
				className='w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium'
			>
				Sign In
			</Button>
		</form>
	);
};
