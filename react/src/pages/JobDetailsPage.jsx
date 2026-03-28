import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { jobs } from '../data/jobs';

function StarRating({ rating }) {
    return (
        <span className="stars">
            {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className={`star ${s <= Math.round(rating) ? '' : 'empty'}`}>★</span>
            ))}
        </span>
    );
}

function CompanyLogo({ logo, color, size = 44 }) {
    return (
        <div className="company-logo" style={{ background: color, width: size, height: size, fontSize: size * 0.3 }}>
            {logo}
        </div>
    );
}

export default function JobDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const job = jobs.find((j) => j.id === Number(id));

    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [relatedJobs, setRelatedJobs] = useState(
        jobs.filter((j) => j.id !== Number(id)).slice(0, 4)
    );

    // Live search debounce
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(query), 300);
        return () => clearTimeout(timer);
    }, [query]);

    // Filter related jobs based on live search
    const filteredRelated = debouncedQuery
        ? jobs
            .filter(
                (j) =>
                    j.id !== Number(id) &&
                    (j.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                        j.company.toLowerCase().includes(debouncedQuery.toLowerCase()))
            )
            .slice(0, 4)
        : relatedJobs;

    const removeRelated = (removeId) =>
        setRelatedJobs((prev) => prev.filter((j) => j.id !== removeId));

    if (!job) {
        return (
            <div>
                <Navbar />
                <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
                    <p style={{ fontSize: '18px', marginBottom: '16px' }}>Job not found.</p>
                    <button className="btn-apply" onClick={() => navigate('/')}>Back to Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="details-page">
            <Navbar />

            {/* Search bar below nav */}
            <div className="details-search-bar">
                <div className="search-bar" style={{ maxWidth: '560px', width: '100%' }}>
                    <div className="search-field">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            placeholder="Job title, Keywords, or Company name"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                        {debouncedQuery && (
                            <span className="live-badge">
                                <span className="live-dot" />LIVE
                            </span>
                        )}
                    </div>
                    <div className="search-divider" />
                    <div className="search-location">
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                            <circle cx="12" cy="9" r="2.5" />
                        </svg>
                        <input placeholder="Location" />
                    </div>
                    <button className="btn-search" onClick={() => navigate('/')}>Search</button>
                </div>
            </div>

            {/* Back Button */}
            <button className="back-btn" onClick={() => navigate(-1)}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
                Back
            </button>

            {/* Main layout */}
            <div className="details-layout">
                {/* Job Detail Card */}
                <div className="detail-card">
                    <div className="detail-card-top">
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                            <CompanyLogo logo={job.companyLogo} color={job.logoColor} size={56} />
                            <div className="detail-title-group">
                                <h1 className="detail-title">{job.title}</h1>
                                <div className="detail-company">
                                    {job.company}
                                    <StarRating rating={job.rating} />
                                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{job.rating.toFixed(1)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="detail-top-actions">
                            <button className="icon-btn" title="Bookmark">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                </svg>
                            </button>
                            <button className="icon-btn" title="Share">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                </svg>
                            </button>
                            <button className="btn-apply">Apply now</button>
                        </div>
                    </div>

                    <div className="detail-body">
                        {/* Meta column */}
                        <div className="detail-meta-col">
                            <div className="detail-meta-item">
                                <div className="meta-label">Job type:</div>
                                <div className="meta-value">{job.type.join(', ')}</div>
                            </div>
                            <div className="detail-meta-item">
                                <div className="meta-label">Location:</div>
                                <div className="meta-value">{job.location}</div>
                            </div>
                            <div className="detail-meta-item">
                                <div className="meta-label">Experience:</div>
                                <div className="meta-value">{job.experience}</div>
                            </div>
                            <div className="detail-meta-item">
                                <div className="meta-label">Salary:</div>
                                <div className="meta-value" style={{ color: '#16a34a' }}>{job.salary}</div>
                            </div>
                            <div className="detail-meta-item">
                                <div className="meta-label">Number of Applicants:</div>
                                <div className="meta-value">{job.applicants}</div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="detail-content">
                            <h3>Job description</h3>
                            <p>{job.description}</p>
                            <h3>Key Responsibilities</h3>
                            <ul>
                                {job.responsibilities.map((r, i) => (
                                    <li key={i}>{r}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Related Jobs */}
                <aside className="related-jobs-panel">
                    <h2>Related Jobs</h2>
                    {debouncedQuery && (
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                            Results for "{debouncedQuery}"
                        </p>
                    )}
                    {filteredRelated.length > 0 ? (
                        filteredRelated.map((j) => (
                            <div
                                key={j.id}
                                className="related-job-item"
                                onClick={() => navigate(`/job/${j.id}`)}
                            >
                                <div
                                    className="company-logo"
                                    style={{ background: j.logoColor, width: 34, height: 34, fontSize: 11, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, flexShrink: 0 }}
                                >
                                    {j.companyLogo}
                                </div>
                                <div className="related-job-info">
                                    <div className="related-job-title">{j.title}</div>
                                    <div className="related-job-company">{j.company}</div>
                                    <div className="related-job-meta">
                                        {j.type.map((t) => <span key={t} className="related-tag">{t}</span>)}
                                        <span className="related-tag salary-tag">{j.salary}</span>
                                    </div>
                                </div>
                                {!debouncedQuery && (
                                    <button
                                        className="related-close"
                                        onClick={e => { e.stopPropagation(); removeRelated(j.id); }}
                                    >×</button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', padding: '10px 0' }}>
                            No related jobs found.
                        </p>
                    )}
                </aside>
            </div>
        </div>
    );
}
