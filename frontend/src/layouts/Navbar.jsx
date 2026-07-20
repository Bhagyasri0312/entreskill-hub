import { Link } from 'react-router-dom';

export default function Navbar({ brand = 'EntreSkill Hub', onMenuClick, actions }) {
  return (
    <header className="layout-navbar">
      <div className="layout-container">
        <div className="layout-navbar-inner">
          <div className="flex items-center gap-3">
            {onMenuClick ? (
              <button
                type="button"
                onClick={onMenuClick}
                className="layout-button layout-button--secondary lg:hidden"
                aria-label="Open sidebar"
              >
                <span className="h-0.5 w-5 bg-current" />
                <span className="h-0.5 w-5 bg-current" />
                <span className="h-0.5 w-5 bg-current" />
              </button>
            ) : null}

            <Link to="/" className="layout-brand text-lg font-extrabold tracking-tight">
              {brand}
            </Link>
          </div>

          <div className="flex items-center gap-3">{actions}</div>
        </div>
      </div>
    </header>
  );
}