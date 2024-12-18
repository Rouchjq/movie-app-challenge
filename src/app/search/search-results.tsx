// componets
import {
	Pagination,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationContent,
	PaginationEllipsis,
	PaginationPrevious,
} from '@/components/atoms/pagination';
import { MovieCard } from '@/components/molecules/movie-card';
import { Typography } from '@/components/atoms/typography';
import { Row } from '@/components/atoms/row';
import { Col } from '@/components/atoms/col';

// types
import type { ResponseType } from '@/types/models/tmdb';
import type { FC } from 'react';

type SearchResultsProps = {
	data: ResponseType;
	searchQuery: string;
};

export const SearchResults: FC<SearchResultsProps> = ({
	data,
	searchQuery,
}) => {
	return (
		<div className='p-4'>
			<div>
				<Typography variant='h1' weight='semibold' className='mb-5'>
					Search Results for &quot;{searchQuery}&quot;
				</Typography>
				<Typography className='text-muted-foreground mb-8'>
					Found {data.total_results} results
				</Typography>
			</div>

			<Row>
				{data.results
					.filter((item) => item.poster_path)
					.map((item) => (
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
									<PaginationPrevious
										href={`/search?query=${searchQuery}&page=${data.page - 1}`}
									/>
								</PaginationItem>
								<PaginationItem>
									<PaginationLink
										href={`/search?query=${searchQuery}&page=${data.page - 1}`}
									>
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
									<PaginationLink
										href={`/search?query=${searchQuery}&page=${data.page + 1}`}
									>
										{data.page + 1}
									</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
								<PaginationItem>
									<PaginationNext
										href={`/search?query=${searchQuery}&page=${data.page + 1}`}
									/>
								</PaginationItem>
							</>
						)}
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
};
