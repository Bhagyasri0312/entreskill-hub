import { useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function DashboardLayout({
  children,
  sidebarProps,
  navbarProps,
  footerProps,
  className = ''
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className={`layout-shell flex min-h-screen flex-col ${className}`.trim()}>
      <Navbar
        {...navbarProps}
        onMenuClick={() => setMobileSidebarOpen(true)}
      />

      <div className="layout-container flex-1 py-6 sm:py-8">
        <div className="layout-grid">
          <div className="hidden lg:block">
            <Sidebar {...sidebarProps} />
          </div>

          <div className="layout-surface layout-main-panel">
            {children}
          </div>
        </div>
      </div>

      <Footer {...footerProps} />

      {mobileSidebarOpen ? (
        <Sidebar
          {...sidebarProps}
          mobileOpen
          onClose={() => setMobileSidebarOpen(false)}
        />
      ) : null}
    </div>
  );
}