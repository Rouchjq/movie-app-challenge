'use client';

// main tools
import Image from 'next/image';

// components
import { Card, CardContent } from '@/components/atoms/card';
import { Typography } from '@/components/atoms/typography';
import { Row } from '@/components/atoms/row';
import { Col } from '@/components/atoms/col';

// lib
import { getImageUrl } from '@/lib/api/tmdb';

// types
import type { MovieDetailsType } from '@/types/models/movie';
import type { FC } from 'react';

interface MovieStatsProps {
	movie: MovieDetailsType;
}

export const MovieStats: FC<MovieStatsProps> = ({ movie }) => {
	return (
		<section className='container mx-auto px-4 py-12  flex flex-col items-center justify-center'>
			<div className='flex flex-wrap gap-3 mb-8'>
				{movie.genres.map((genre) => (
					<div
						key={genre.id}
						className='px-4 py-1 rounded-full border border-yellow-500 '
					>
						<Typography className='text-sm text-yellow-500'>{genre.name}</Typography>
					</div>
				))}
			</div>

			<Row className='w-full mb-12' justify='center' gap={4}>
				<Card className='bg-foreground/10 backdrop-blur-sm border border-yellow-500 w-full max-w-xs'>
					<CardContent className='p-4'>
						<Typography className='text-yellow-600 text-md mb-1 text-center'>
							Status
						</Typography>
						<Typography className=' text-center'>{movie.status}</Typography>
					</CardContent>
				</Card>

				<Card className='bg-foreground/10 backdrop-blur-sm border border-yellow-500 w-full max-w-xs'>
					<CardContent className='p-4'>
						<Typography className='text-yellow-600 text-md mb-1 text-center'>
							Budget
						</Typography>
						<Typography className=' text-center'>
							${movie.budget.toLocaleString()}
						</Typography>
					</CardContent>
				</Card>

				<Card className='bg-foreground/10 backdrop-blur-sm border border-yellow-500 w-full max-w-xs'>
					<CardContent className='p-4'>
						<Typography className='text-yellow-600 text-md mb-1 text-center'>
							Revenue
						</Typography>
						<Typography className='text-center'>
							${movie.revenue.toLocaleString()}
						</Typography>
					</CardContent>
				</Card>
			</Row>

			<Row className='w-full mb-12'>
				{movie.production_companies
					.filter((company) => company.logo_path)
					.map((company) => (
						<Col key={company.id} xs={12} sm={12} md={8} lg={6} className='p-5'>
							<Card className='bg-yellow-500 border-yellow-600'>
								<CardContent className='p-4'>
									<div className='relative h-20 mb-2'>
										<Image
											fill
											src={getImageUrl(company.logo_path, 'poster', 'w185')!}
											alt={company.name}
											className='object-contain'
										/>
									</div>
									<Typography className='text-center text-lg text-black'>
										{company.name}
									</Typography>
								</CardContent>
							</Card>
						</Col>
					))}
			</Row>
		</section>
	);
};
