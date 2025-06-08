import { NextRequest, NextResponse } from 'next/server';

const HASHNODE_API_URL = 'https://gql.hashnode.com';

const GET_PUBLICATION_POSTS_QUERY = `
  query Publication($host: String!, $first: Int!) {
    publication(host: $host) {
      isTeam
      title
      posts(first: $first) {
        edges {
          node {
            id
            title
            brief
            slug
            coverImage {
              url
            }
            publishedAt
            url
            tags {
              name
              slug
            }
            author {
              name
              profilePicture
            }
            readTimeInMinutes
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const host = searchParams.get('host');
    const first = parseInt(searchParams.get('first') || '10', 10);

    if (!host) {
      return NextResponse.json({ error: 'Host is required' }, { status: 400 });
    }

    const response = await fetch(HASHNODE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_PUBLICATION_POSTS_QUERY,
        variables: { host, first },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from Hashnode API');
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }

    const publication = data.data?.publication;
    if (!publication) {
      return NextResponse.json({ error: 'Publication not found' }, { status: 404 });
    }

    interface HashnodePost {
      node: {
        id: string;
        title: string;
        brief: string;
        url: string;
        coverImage?: { url: string };
        publishedAt: string;
        author: { name: string; profilePicture: string };
        readTimeInMinutes: number;
        tags: Array<{ name: string; slug: string }>;
      };
    }

    const posts = publication.posts.edges.map((edge: HashnodePost) => ({
      id: edge.node.id,
      title: edge.node.title,
      brief: edge.node.brief,
      url: edge.node.url,
      coverImage: edge.node.coverImage?.url,
      dateAdded: edge.node.publishedAt,
      author: edge.node.author,
      readTime: edge.node.readTimeInMinutes,
      tags: edge.node.tags || [],
    }));

    return NextResponse.json(
      {
        posts,
        publication: {
          title: publication.title,
          isTeam: publication.isTeam,
        },
        pageInfo: publication.posts.pageInfo,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Hashnode API error:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
