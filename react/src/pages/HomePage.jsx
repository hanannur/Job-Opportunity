import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api';

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
        <div
            className="company-logo"
            style={{ background: color, width: size, height: size, fontSize: size * 0.3 }}
        >
            {logo}
        </div>
    );
}

export default function HomePage() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [debouncedLocation, setDebouncedLocation] = useState('');
    const [saved, setSaved] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [dateFilter, setDateFilter] = useState('Any time');
    const [jobTypes, setJobTypes] = useState([]);
    const [expLevel, setExpLevel] = useState('Any');
    const [salaryMax, setSalaryMax] = useState(2000);
    const [currency, setCurrency] = useState('Dollar');

    // Fetch jobs from backend
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await api.get('/jobs?page=1');
                const rawJobs = res.data.results || [];
                // Map TheMuse returned data to match our UI component
                const mappedJobs = rawJobs.map((job) => ({
                    id: job.id,
                    title: job.name,
                    company: job.company?.name || 'Unknown Company',
                    companyLogo: (job.company?.name || 'U').charAt(0).toUpperCase(),
                    logoColor: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`,
                    location: job.locations && job.locations.length > 0 ? job.locations[0].name : 'Remote',
                    type: job.levels && job.levels.length > 0 ? job.levels.map(l => l.name) : ['Full-time'],
                    salary: 'Competitive',
                    description: (job.contents || '').replace(/(<([^>]+)>)/gi, "").substring(0, 150) + '...'
                }));
                setJobs(mappedJobs);
                setLoading(false);
            } catch (err) {
                console.error('Error loading jobs:', err);
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    // Live search debounce — 300ms
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
            setDebouncedLocation(location);
        }, 300);
        return () => clearTimeout(timer);
    }, [query, location]);

    const toggleJobType = (type) => {
        setJobTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    const resetFilters = () => {
        setQuery('');
        setLocation('');
        setDebouncedQuery('');
        setDebouncedLocation('');
        setDateFilter('Any time');
        setJobTypes([]);
        setExpLevel('Any');
        setSalaryMax(2000);
        setCurrency('Dollar');
    };

    const removeSaved = (id) => setSaved((prev) => prev.filter((j) => j.id !== id));

    const filteredJobs = jobs.filter((job) => {
        const q = debouncedQuery.toLowerCase();
        const loc = debouncedLocation.toLowerCase();

        const matchesQuery =
            !q ||
            job.title.toLowerCase().includes(q) ||
            job.company.toLowerCase().includes(q) ||
            job.description.toLowerCase().includes(q);

        const matchesLocation =
            !loc || job.location.toLowerCase().includes(loc);

        const matchesType =
            jobTypes.length === 0 || jobTypes.some((t) => job.type.includes(t));

        const matchesSalary = true; // simplified

        return matchesQuery && matchesLocation && matchesType && matchesSalary;
    });

    return (
        <div>
            <Navbar />

            {/* Hero */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Find Your Dream<br />Job with Ease</h1>
                    <p>Search, Apply, and Track Job Applications<br />All in One Place</p>
                </div>
                <div className="hero-illustration">
                    <svg viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Monitor / Screen */}
                        <rect x="60" y="20" width="200" height="150" rx="12" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.3" strokeWidth="2" />
                        <rect x="72" y="32" width="176" height="126" rx="8" fill="white" fillOpacity="0.1" />
                        {/* Screen lines */}
                        <rect x="84" y="46" width="80" height="8" rx="4" fill="white" fillOpacity="0.5" />
                        <rect x="84" y="62" width="120" height="6" rx="3" fill="white" fillOpacity="0.3" />
                        <rect x="84" y="76" width="100" height="6" rx="3" fill="white" fillOpacity="0.3" />
                        <rect x="84" y="90" width="110" height="6" rx="3" fill="white" fillOpacity="0.3" />
                        <rect x="84" y="110" width="60" height="24" rx="8" fill="white" fillOpacity="0.6" />
                        {/* Stand */}
                        <rect x="148" y="170" width="24" height="30" rx="4" fill="white" fillOpacity="0.2" />
                        <rect x="120" y="198" width="80" height="8" rx="4" fill="white" fillOpacity="0.2" />
                        {/* 3D Person */}
                        <circle cx="248" cy="90" r="24" fill="white" fillOpacity="0.9" />
                        <circle cx="248" cy="78" r="14" fill="#FBBF24" />
                        <rect x="228" y="100" width="40" height="50" rx="12" fill="white" fillOpacity="0.8" />
                        <rect x="218" y="104" width="16" height="36" rx="8" fill="white" fillOpacity="0.7" />
                        <rect x="286" y="104" width="16" height="36" rx="8" fill="white" fillOpacity="0.7" />
                        <rect x="232" y="148" width="14" height="40" rx="7" fill="white" fillOpacity="0.6" />
                        <rect x="254" y="148" width="14" height="40" rx="7" fill="white" fillOpacity="0.6" />
                        {/* Floating elements */}
                        <circle cx="42" cy="60" r="16" fill="white" fillOpacity="0.12" />
                        <circle cx="290" cy="180" r="20" fill="white" fillOpacity="0.1" />
                        <rect x="20" y="140" width="24" height="24" rx="6" fill="white" fillOpacity="0.1" />
                    </svg>
                </div>
            </section>

            {/* 3-column layout */}
            <div className="home-layout">
                {/* Filter Panel */}
                <aside className="filter-panel">
                    <h2>Filter</h2>

                    <div className="filter-group">
                        <label>Date Posted</label>
                        <select className="filter-select" value={dateFilter} onChange={e => setDateFilter(e.target.value)}>
                            <option>Any time</option>
                            <option>Last 24 Hours</option>
                            <option>Last 3 Days</option>
                            <option>Last Week</option>
                            <option>Last Month</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Job Type</label>
                        <div className="checkbox-list">
                            {['Full-time', 'Part-time', 'Contract', 'Volunteer', 'Internship', 'Remote', 'Hybrid', 'On-Site'].map((t) => (
                                <label className="checkbox-item" key={t}>
                                    <input type="checkbox" checked={jobTypes.includes(t)} onChange={() => toggleJobType(t)} />
                                    {t}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Location</label>
                        <div className="location-input">
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                <circle cx="12" cy="9" r="2.5" />
                            </svg>
                            <input placeholder="Enter your location" />
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Experience Level</label>
                        <select className="filter-select" value={expLevel} onChange={e => setExpLevel(e.target.value)}>
                            <option>Any</option>
                            <option>Entry Level</option>
                            <option>Intermediate</option>
                            <option>Senior</option>
                            <option>Expert</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Salary Range</label>
                        <div className="salary-range">
                            <input type="range" className="salary-slider" min="0" max="5000" value={salaryMax} onChange={e => setSalaryMax(Number(e.target.value))} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                                <span>$0</span><span>${salaryMax.toLocaleString()}</span>
                            </div>
                            <div className="salary-manual">
                                <span>Input Manually</span>
                            </div>
                            <div className="salary-manual">
                                <span>From</span>
                                <input className="salary-input" placeholder="0" />
                                <span>To</span>
                                <input className="salary-input" placeholder="5000" />
                            </div>
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Currency</label>
                        <select className="filter-select" value={currency} onChange={e => setCurrency(e.target.value)}>
                            <option>Dollar</option>
                            <option>Euro</option>
                            <option>Pound</option>
                            <option>Naira</option>
                        </select>
                    </div>

                    <button className="btn-reset-filter" onClick={resetFilters}>Reset all filter</button>
                </aside>

                {/* Jobs Center */}
                <main className="jobs-center">
                    {/* Search Bar */}
                    <div className="jobs-search-bar">
                        <div className="search-bar">
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
                                <input
                                    placeholder="Location"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                />
                            </div>
                            <button className="btn-search">Search</button>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                        {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
                        {(debouncedQuery || debouncedLocation) && (
                            <span style={{ color: 'var(--blue)', fontWeight: 600 }}>
                                {' '}for "{[debouncedQuery, debouncedLocation].filter(Boolean).join('" in "')}"
                            </span>
                        )}
                    </div>

                    {/* Job Cards */}
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <div
                                className="job-card"
                                key={job.id}
                                onClick={() => navigate(`/job/${job.id}`)}
                            >
                                <div className="job-card-header">
                                    <CompanyLogo logo={job.companyLogo} color={job.logoColor} />
                                    <div className="job-card-title-group">
                                        <div className="job-card-title">{job.title}</div>
                                        <div className="job-card-company">{job.company}</div>
                                    </div>
                                    <div className="job-card-actions">
                                        <button className="icon-btn" onClick={e => e.stopPropagation()} title="Save job">
                                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                            </svg>
                                        </button>
                                        <button className="icon-btn" onClick={e => e.stopPropagation()} title="Share">
                                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="job-tags">
                                    {job.type.map((t) => <span key={t} className="tag">{t}</span>)}
                                    <span className="tag salary">{job.salary}</span>
                                </div>

                                <p className="job-card-desc">{job.description}</p>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                            </svg>
                            <p>No jobs found matching your search.</p>
                            <p style={{ fontSize: '13px', marginTop: '6px' }}>Try different keywords or reset filters.</p>
                        </div>
                    )}
                </main>

                {/* Saved Jobs */}
                <aside className="saved-jobs-panel">
                    <h2>Saved Jobs</h2>
                    {saved.map((job) => (
                        <div
                            className="saved-job-item"
                            key={job.id}
                            onClick={() => navigate(`/job/${job.id}`)}
                        >
                            <CompanyLogo logo={job.companyLogo} color={job.logoColor} size={36} />
                            <div className="saved-job-info">
                                <div className="saved-job-title">{job.title}</div>
                                <div className="saved-job-company">{job.company}</div>
                                <div className="saved-job-meta">{job.type} · {job.salary}</div>
                            </div>
                            <button
                                className="saved-job-close"
                                onClick={e => { e.stopPropagation(); removeSaved(job.id); }}
                            >×</button>
                        </div>
                    ))}
                </aside>
            </div>
        </div>
    );
}
