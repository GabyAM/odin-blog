import { useState } from 'react';
import { CheckedBookmarkIcon, UncheckedBookmarkIcon } from './Icons';
import { Link } from 'react-router-dom';
import postThumbnailPlaceholder from '../assets/post_thumbnail_placeholder.png';
import { IMAGES_URL } from '../constants';

export function SavedPost({ post, onUnsave }) {
    const [isHoveringButton, setIsHoveringButton] = useState(false);
    return (
        <div className="saved-post">
            <div className="image-container">
                <Link to={`/post/${post._id}`}>
                    <img
                        src={
                            post.image === 'post_thumbnail_placeholder.png'
                                ? postThumbnailPlaceholder
                                : IMAGES_URL + post.image
                        }
                    ></img>
                </Link>
            </div>
            <div className="text-section">
                <h3>
                    <Link to={`/post/${post._id}`}>{post.title}</Link>
                </h3>
                <span className="info-span">
                    By{' '}
                    <Link to={`/user/${post.author._id}`}>
                        {post.author.name}
                    </Link>
                </span>
            </div>
            <button
                onMouseEnter={() => setIsHoveringButton(true)}
                onMouseLeave={() => setIsHoveringButton(false)}
                onClick={() => onUnsave(post._id)}
                className="single-icon-container"
            >
                {isHoveringButton ? (
                    <UncheckedBookmarkIcon></UncheckedBookmarkIcon>
                ) : (
                    <CheckedBookmarkIcon></CheckedBookmarkIcon>
                )}
            </button>
        </div>
    );
}
