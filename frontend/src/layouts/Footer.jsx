export default function Footer({ brand = 'EntreSkill Hub', links, copyright }) {
  return (
    <footer className="layout-footer">
      <div className="layout-container">
        <div className="layout-footer-inner">
          <p className="layout-footer-brand m-0 font-medium">{brand}</p>

          {links ? <nav className="flex flex-wrap gap-4">{links}</nav> : null}

          <p className="m-0">{copyright ?? `© ${new Date().getFullYear()} ${brand}`}</p>
        </div>
      </div>
    </footer>
  );
}