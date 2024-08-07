import React, { useEffect } from 'react';
import { Header } from './Header';
import { PostCard } from './PostCard';
import '../styles/posts.css';
import { PostCardSkeleton } from './PostCardSkeleton';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/post';
import { PageError } from './PageError';
import he from 'he';
import { mapPagesResults } from '../utils/map';

export function Posts() {
    const {
        data: posts,
        isLoading,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isFetchNextPageError
    } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam }) => fetchPosts(pageParam),
        initialPageParam: null,
        getNextPageParam: (lastPage) => {
            return lastPage.metadata.nextPageParams;
        },
        select: (posts) =>
            mapPagesResults(posts, (post) => ({
                ...post,
                title: he.unescape(post.title),
                summary: he.unescape(post.summary),
                author: {
                    ...post.author,
                    name: he.unescape(post.author.name)
                }
            }))
    });
    useEffect(() => {
        function handleScroll() {
            if (
                window.innerHeight + window.scrollY + 1 >=
                document.body.offsetHeight
            ) {
                if (!isFetchingNextPage && !error) {
                    fetchNextPage();
                }
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [fetchNextPage, isFetchingNextPage, error]);

    return (
        <>
            <Header sticky={true}></Header>
            {error ? (
                <PageError error={error}></PageError>
            ) : (
                <div className="posts container">
                    <div className="search-bar"></div>
                    <div className="posts flex-col">
                        {isLoading ? (
                            <>
                                <PostCardSkeleton></PostCardSkeleton>
                                <PostCardSkeleton></PostCardSkeleton>
                                <PostCardSkeleton></PostCardSkeleton>
                            </>
                        ) : (
                            <>
                                {posts?.pages?.map((page, index) => (
                                    <React.Fragment key={index}>
                                        {page.results.map((post) => (
                                            <PostCard
                                                key={post._id}
                                                id={post._id}
                                                title={post.title}
                                                author={post.author}
                                                summary={post.summary}
                                                image={post.image}
                                                commentCount={
                                                    post.comment_count
                                                }
                                            ></PostCard>
                                        ))}
                                    </React.Fragment>
                                ))}
                                {isFetchingNextPage && (
                                    <PostCardSkeleton></PostCardSkeleton>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
