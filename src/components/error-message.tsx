import { FC } from 'react';
import { Typography } from './atoms/typography';
import { Button } from './atoms/button';

// components/ErrorMessage.tsx
type ErrorMessageProps = {
	endpoint: string;
	retry?: () => void;
	errorMessage?: string;
};

export const ErrorMessage: FC<ErrorMessageProps> = ({
	endpoint,
	retry,
	errorMessage,
}) => (
	<div className='p-4 my-4 bg-red-50 border border-red-200 rounded-lg'>
		<div className='flex flex-col items-center text-center'>
			<Typography size='lg' weight='semibold' className='text-red-700 mb-2'>
				Oops! Something went wrong
			</Typography>
			<Typography className='text-red-600'>
				We couldn&apos;t load {endpoint}. Please try again later.
			</Typography>
			{errorMessage && (
				<Typography className='text-red-600'>{errorMessage}</Typography>
			)}
			{retry && (
				<Button
					onClick={retry}
					className='mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
				>
					Try Again
				</Button>
			)}
		</div>
	</div>
);
