import {
	Pagination,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationContent,
	PaginationEllipsis,
	PaginationPrevious,
} from '@/components/atoms/pagination';
import { Typography } from '@/components/atoms/typography';
import { MovieCard } from '@/components/molecules/movie-card';
import { MovieType } from '@/types/models/movie';
import { Row } from '@/components/atoms/row';
import { Col } from '@/components/atoms/col';

// types
import type { ResponseType } from '@/types/models/tmdb';
import type { FC } from 'react';

type PopularPageContentProps = {
	data: ResponseType;
};

export const PopularPageContent: FC<PopularPageContentProps> = ({ data }) => {
	return (
		<div className='p-4'>
			<div>
				<Typography variant='h1' weight='semibold' className='mb-5'>
					Popular Movies
				</Typography>
			</div>
			<Row>
				{data.results.map((item: MovieType) => (
					<Col xs={12} md={4} lg={3} xl={2} key={item.id} className='mb-5'>
						<MovieCard movie={item} />
					</Col>
				))}
			</Row>
			<div>
				<Pagination>
					<PaginationContent>
						{data.page > 1 && (
							<>
								<PaginationItem>
									<PaginationPrevious href={`/popular?page=${data.page - 1}`} />
								</PaginationItem>

								<PaginationItem>
									<PaginationLink href={`/popular?page=${data.page - 1}`}>
										{data.page - 1}
									</PaginationLink>
								</PaginationItem>
							</>
						)}
						<PaginationItem>
							<PaginationLink href='#' isActive>
								{data.page}
							</PaginationLink>
						</PaginationItem>

						{data.page < data.total_pages && (
							<>
								<PaginationItem>
									<PaginationLink href={`/popular?page=${data.page + 1}`}>
										{data.page + 1}
									</PaginationLink>
								</PaginationItem>

								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>

								<PaginationItem>
									<PaginationNext href={`/popular?page=${data.page + 1}`} />
								</PaginationItem>
							</>
						)}
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
};
