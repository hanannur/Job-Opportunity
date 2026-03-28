import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
                <span className="jo">JO</span><span className="b-box">B</span><span className="spheere">SPHEERE</span>
            </Link>

            <ul className="navbar-links">
                <li><Link to="/" className="active">Job Search</Link></li>
                <li><a href="#">My Applications</a></li>
                <li><a href="#">Companies</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>

            <div className="navbar-actions">
                <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
                <button className="btn-signin" onClick={() => navigate('/signup')}>Sign In</button>
            </div>
        </nav>
    );
}
