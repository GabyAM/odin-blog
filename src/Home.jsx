export function Home() {
    return (
        <>
            <div className="hero flex-col">
                <div className="container flex-col">
                    <a href="/login">Login</a>
                    <div className="hero-main-content flex-col">
                        <div className="hero-text flex-col">
                            <div className="logo">
                                <img src="/logo.png"></img>
                            </div>
                            <h1 className="title-primary">
                                This is a headline
                            </h1>
                        </div>
                        <button className="rounded-button">Read</button>
                    </div>
                </div>
            </div>
            <main className="flex-col container">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="featured-posts flex-col">
                    <h2 className="title-primary">Featured posts</h2>
                    <div>
                        <div className="featured-posts-grid">
                            <div className="featured-post main-post">
                                <div className="post-text flex-col">
                                    <h3 className="title-primary">
                                        How i made this blog
                                    </h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                                <div className="image-container">
                                    <img src=""></img>
                                </div>
                            </div>
                            <div className="featured-post">
                                <div className="post-text flex-col">
                                    <h3 className="title-primary">
                                        Post title
                                    </h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                            </div>
                            <div className="featured-post">
                                <div className="post-text flex-col">
                                    <h3 className="title-primary">
                                        Post title
                                    </h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="rounded-button inverted">
                        See all posts
                    </button>
                </div>
            </main>
            <footer>
                <div className="container">
                    <div className="logo">
                        <img src="/logo.png"></img>
                    </div>
                    <nav className="flex-col">
                        <h2>Repositories</h2>
                        <ul className="flex-col">
                            <a href="https://github.com/GabyAM/odin-blog">
                                <li>Blog</li>
                            </a>
                            <a href="https://github.com/GabyAM/odin-blog-api">
                                <li>API</li>
                            </a>
                            <a href="/">
                                <li>Admin dashboard</li>
                            </a>
                        </ul>
                    </nav>
                </div>
            </footer>
        </>
    );
}
