import { Link } from 'react-router-dom';

export default function Sidebar({
  title = 'Navigation',
  items = [],
  footer,
  mobileOpen = false,
  onClose
}) {
  const content = (
    <aside className="layout-surface layout-sidebar-panel">
      <div className="flex h-full flex-col gap-6">
        <div className="flex items-center justify-between lg:hidden">
          <p className="layout-sidebar-title m-0 text-sm font-semibold uppercase tracking-[0.2em]">
            {title}
          </p>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="layout-button layout-button--secondary"
              aria-label="Close sidebar"
            >
              Close
            </button>
          ) : null}
        </div>

        <div className="hidden lg:block">
          <p className="layout-sidebar-title m-0 text-sm font-semibold uppercase tracking-[0.2em]">
            {title}
          </p>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="layout-sidebar-link flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition"
                >
                  {item.icon ? <span className="layout-sidebar-icon">{item.icon}</span> : null}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {footer ? <div>{footer}</div> : null}
      </div>
    </aside>
  );

  if (!mobileOpen) {
    return <div className="hidden lg:block">{content}</div>;
  }

  return (
    <div className="layout-mobile-sidebar">
      <div className="layout-mobile-sidebar-panel layout-surface">{content}</div>
    </div>
  );
}