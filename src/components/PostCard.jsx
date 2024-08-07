import '../styles/postcard.css';
import { Link } from 'react-router-dom';
import postThumbnailPlaceholder from '../assets/post_thumbnail_placeholder.png';
import { IMAGES_URL } from '../constants';

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
                        <Link
                            to={`/user/${author._id}`}
                            className="author-link"
                        >
                            {author.name}
                        </Link>
                    </span>
                </div>
                <p>{summary}</p>
                <span className="comment-count">
                    {`${commentCount} comments`}
                </span>
            </div>
            <Link to={`/post/${id}`}>
                <div className="image-container">
                    <img
                        src={
                            image === 'post_thumbnail_placeholder.png'
                                ? postThumbnailPlaceholder
                                : IMAGES_URL + image
                        }
                    ></img>
                </div>
            </Link>
        </div>
    );
}
