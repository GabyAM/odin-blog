import './styles/header.css';

export function Header() {
    return (
        <header className="flex-row">
            <div className="container flex-row">
                <div className="logo flex-row">
                    <img src="/logo_alternative.png"></img>
                </div>
                <ul className="header-links flex-row">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/posts">Posts</a>
                    </li>
                </ul>
                <div className="user-section">
                    <a href="/login">Login</a>
                    <a href="/signup">Sign up</a>
                </div>
            </div>
        </header>
    );
}