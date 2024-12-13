import { DEFAULT_PARAMS, tmdbApi } from '@/lib/api/tmdb';
import { NextResponse } from 'next/server';

export async function GET(
	request: Request,
	{ params }: { params: { category: string } },
) {
	try {
		const { category } = await params;
		const { searchParams } = new URL(request.url);

		const queryParams = {
			...DEFAULT_PARAMS,
			language: searchParams.get('language') || DEFAULT_PARAMS.language,
			page: Number(searchParams.get('page')) || DEFAULT_PARAMS.page,
		};

		const response = await tmdbApi().get(`/movie/${category}`, {
			params: queryParams,
		});

		return NextResponse.json(response.data);
	} catch (error) {
		console.log('🚀 ~ error API:', error);
		return NextResponse.json({ error: 'Error fetching movies' }, { status: 500 });
	}
}
