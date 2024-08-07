import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function PostSkeleton() {
    return (
        <>
            <div className="container post-container flex-col">
                <div className="post flex-col">
                    <h1 className="title-primary">
                        <Skeleton count={2} />
                    </h1>
                    <div className="image-container">
                        <Skeleton width="100%" height="100%"></Skeleton>
                    </div>
                    <p>
                        <Skeleton count={10}></Skeleton>
                    </p>
                </div>
            </div>
        </>
    );
}
