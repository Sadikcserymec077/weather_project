import './LoadingSkeleton.css';

export default function LoadingSkeleton() {
    return (
        <div className="loading-skeleton" id="loading-skeleton">
            <div className="loading-skeleton__hero">
                <div className="skeleton-pulse skeleton-block skeleton-block--title"></div>
                <div className="skeleton-pulse skeleton-block skeleton-block--subtitle"></div>
                <div className="loading-skeleton__hero-row">
                    <div className="skeleton-pulse skeleton-block skeleton-block--circle"></div>
                    <div className="skeleton-pulse skeleton-block skeleton-block--temp"></div>
                </div>
            </div>

            <div className="loading-skeleton__section">
                <div className="skeleton-pulse skeleton-block skeleton-block--heading"></div>
                <div className="loading-skeleton__cards">
                    {[1, 2, 3].map((i) => (
                        <div className="skeleton-pulse skeleton-block skeleton-block--card" key={i}></div>
                    ))}
                </div>
            </div>

            <div className="loading-skeleton__section">
                <div className="skeleton-pulse skeleton-block skeleton-block--heading"></div>
                <div className="loading-skeleton__scroll">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div className="skeleton-pulse skeleton-block skeleton-block--hour" key={i}></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
