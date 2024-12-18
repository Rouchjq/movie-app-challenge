import { DEFAULT_PARAMS, tmdbApi } from '@/lib/api/tmdb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    const queryParams = {
      ...DEFAULT_PARAMS,
      query,
      language: searchParams.get('language') || DEFAULT_PARAMS.language,
      page: Number(searchParams.get('page')) || DEFAULT_PARAMS.page,
    };

    const response = await tmdbApi().get('/search/movie', {
      params: queryParams,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Error searching movies' },
      { status: 500 }
    );
  }
} 