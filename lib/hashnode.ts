import type { BlogPost } from '@/types';

export async function fetchHashnodeBlogsByHost(
  host: string,
  first: number = 10
): Promise<{
  posts: BlogPost[];
  publication: { title: string; isTeam: boolean };
  pageInfo: { hasNextPage: boolean; endCursor: string };
}> {
  try {
    const response = await fetch(`/api/hashnode?host=${host}&first=${first}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Hashnode blogs:', error);
    return {
      posts: [],
      publication: { title: '', isTeam: false },
      pageInfo: { hasNextPage: false, endCursor: '' },
    };
  }
}
