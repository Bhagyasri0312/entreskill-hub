export default function Loader({ label = 'Loading' }) {
  return (
    <div className="layout-loader flex items-center justify-center gap-3 py-10">
      <span className="layout-loader-spinner h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}