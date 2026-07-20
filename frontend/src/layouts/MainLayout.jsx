import Footer from './Footer';
import Navbar from './Navbar';

export default function MainLayout({ children, navbarProps, footerProps, className = '' }) {
  return (
    <div className={`layout-shell flex min-h-screen flex-col ${className}`.trim()}>
      <Navbar {...navbarProps} />

      <main className="flex-1">
        <div className="layout-container py-6 sm:py-8">{children}</div>
      </main>

      <Footer {...footerProps} />
    </div>
  );
}