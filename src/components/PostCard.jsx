import { useEffect, useState } from 'react';
import '../styles/postcard.css';
import { Link } from 'react-router-dom';

export function PostCard({ id, title, author, summary, commentCount, image }) {
    return (
        <div className="post-card grey-card">
            <div className="post-card-text flex-col">
                <div>
                    <Link to={`/post/${id}`}>
                        <h2 className="title-primary">{title}</h2>
                    </Link>
                    <span>
                        By{' '}
                        <a href="#" className="author-link">
                            {author.name}
                        </a>
                    </span>
                </div>
                <p>{summary}</p>
                <span className="comment-count">
                    {`${commentCount} comments`}
                </span>
            </div>
            <Link to={`/post/${id}`}>
                <div className="image-container">
                    <img src={`http://localhost:3000${image}`}></img>
                </div>
            </Link>
        </div>
    );
}
