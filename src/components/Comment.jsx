import React, { useEffect, useRef, useState } from 'react';
import '../styles/comment.css';
import { Link } from 'react-router-dom';
import { CommentForm } from './CommentForm';
import { useAuth } from '../hooks/useAuth';
import { RepliesIcon, ReplyIcon } from './Icons';
import { CommentSkeleton } from './CommentSkeleton';
import { fetchCommentReplies, submitCommentReply } from '../api/comment';
import { useComments } from '../hooks/useComments';
import { SectionError } from './SectionError';
import { formatDateToDistance } from '../utils/date';
import avatarPlaceholder from '../assets/profile.png';
import { IMAGES_URL } from '../constants';

export function Comment({ comment, depth = 1 }) {
    const { encodedToken: token, token: currentUser } = useAuth();
    const text = useRef(null);
    const [isOverflown, setIsOverflown] = useState(false);
    const [textHidden, setTextHidden] = useState(true);
    const [isReplying, setIsReplying] = useState(false);

    const shouldFetchComments = depth < 3 && comment.comments.length > 0;
    const {
        comments,
        fetchedCount: commentCount,
        isLoading,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        addComment: addReply
    } = useComments(
        comment._id,
        comment.comments.length,
        fetchCommentReplies,
        submitCommentReply,
        shouldFetchComments
    );

    useEffect(() => {
        if (text.current) {
            const textHeight = text.current.getBoundingClientRect().height;
            setIsOverflown(textHeight > 160);
        }
    }, []);

    const commentRef = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    shouldFetchComments &&
                    !comments
                ) {
                    fetchNextPage();
                    console.log('bottom!');
                }
            },
            { root: null, rootMargin: '0px', threshold: 1.0 }
        );

        let refValue = null;
        if (commentRef.current) {
            observer.observe(commentRef.current);
            refValue = commentRef.current;
        }

        return () => {
            if (refValue) {
                observer.unobserve(refValue);
            }
        };
    }, [fetchNextPage, commentRef, comment._id, shouldFetchComments, comments]);

    const isDeleted = comment.user === null;
    const hasMoreReplies =
        depth % 3 === 0 && comment.comments.length > commentCount;
    return (
        <div
            className={
                'comment-container flex-col' +
                (commentCount > 0 ? ' parent-comment' : '')
            }
        >
            <div
                className={
                    'comment' +
                    (!textHidden ? ' expanded' : '') +
                    (isDeleted ? ' deleted' : '')
                }
            >
                {isDeleted ? (
                    <span>This comment was removed</span>
                ) : (
                    <>
                        <div className="image-container">
                            <img
                                src={
                                    comment.user.image === 'profile.png'
                                        ? avatarPlaceholder
                                        : IMAGES_URL + comment.user.image
                                }
                            ></img>
                        </div>
                        <div ref={text} className="text">
                            <div className="upper-section flex-row">
                                <Link to={`/user/${comment.user._id}`}>
                                    <span>{comment.user.name}</span>
                                </Link>
                                {comment.user.is_banned && (
                                    <span className="banned-label">
                                        BANNED USER
                                    </span>
                                )}
                                <span className="timestamp-label">
                                    {formatDateToDistance(comment.createdAt)}
                                </span>
                            </div>
                            <p
                                className={
                                    isOverflown && textHidden ? 'overflown' : ''
                                }
                            >
                                {comment.text}
                            </p>
                            {isOverflown && (
                                <button
                                    className="toggle-comment-length"
                                    onClick={() => setTextHidden(!textHidden)}
                                >
                                    {textHidden ? 'Show more' : 'Show less '}
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
            {(isReplying || token || hasMoreReplies) && (
                <div className="replies-section">
                    {isReplying ? (
                        <CommentForm
                            isOnComment={true}
                            onClose={() => setIsReplying(false)}
                            onSubmit={addReply}
                        ></CommentForm>
                    ) : (
                        <div className="replies-actions flex-row">
                            {token && (
                                <button
                                    className="secondary-button smaller rounded action-button flex-row"
                                    onClick={() => setIsReplying(!isReplying)}
                                >
                                    <ReplyIcon
                                        width="1.2em"
                                        height="1.2em"
                                    ></ReplyIcon>
                                    <span>Reply</span>
                                </button>
                            )}
                            {hasMoreReplies && (
                                <Link
                                    className="outlined-button-400 light-outline rounded smaller action-button flex-row"
                                    to={`/comment/${comment._id}`}
                                >
                                    <RepliesIcon
                                        width="1.2em"
                                        height="1.2em"
                                    ></RepliesIcon>
                                    <span>See replies</span>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            )}
            {isLoading && comment.comments.length > 0 && (
                <>
                    <CommentSkeleton></CommentSkeleton>
                    <CommentSkeleton></CommentSkeleton>
                    <CommentSkeleton></CommentSkeleton>
                </>
            )}
            {error ? (
                <div className="comment-container">
                    <SectionError size="medium"></SectionError>
                </div>
            ) : (
                comments &&
                comments.pages.map((page, index) => (
                    <React.Fragment key={index}>
                        {page.results.map((reply) => {
                            if (typeof reply === 'object')
                                return (
                                    <Comment
                                        key={reply._id}
                                        comment={reply}
                                        depth={depth + 1}
                                    ></Comment>
                                );
                        })}
                    </React.Fragment>
                ))
            )}
            {isFetchingNextPage && (
                <>
                    <CommentSkeleton></CommentSkeleton>
                    <CommentSkeleton></CommentSkeleton>
                    <CommentSkeleton></CommentSkeleton>
                </>
            )}
            {depth < 3 && hasNextPage && (
                <button
                    className="more-replies-button"
                    onClick={() => {
                        if (!isFetchingNextPage) {
                            fetchNextPage();
                        }
                    }}
                >
                    More replies
                </button>
            )}
            <div className="bottom-marker" ref={commentRef}></div>
        </div>
    );
}
