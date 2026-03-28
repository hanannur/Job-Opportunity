import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/image.png';

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <filter id="logo-blue-filter">
                    <feColorMatrix type="matrix" values="0.898 0 0 0 0.102  0 0.765 0 0 0.235  0 0 0 0 1  0 0 0 1 0" />
                </filter>
            </svg>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <img src={logo} alt="JOBSPHEERE" style={{ height: '40px', width: 'auto', display: 'block', filter: 'url(#logo-blue-filter)' }} />
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
