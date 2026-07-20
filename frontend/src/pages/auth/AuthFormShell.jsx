import { Button, InputField, Typography } from '../../components/ui';

export default function AuthFormShell({
  fields,
  actionLabel,
  helperLinks,
  onSubmit,
  status,
  submitDisabled = false,
  footerNote
}) {
  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      {fields}

      {status ? (
        <div className={`rounded-2xl border px-4 py-3 text-sm ${status.type === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-green-200 bg-green-50 text-green-700'}`}>
          {status.message}
        </div>
      ) : null}

      <Button type="submit" size="lg" className="w-full" disabled={submitDisabled}>
        {actionLabel}
      </Button>

      {helperLinks ? <div className="flex flex-wrap items-center gap-3 text-sm">{helperLinks}</div> : null}

      {footerNote ? <Typography variant="caption" className="text-center text-[var(--color-muted)]">{footerNote}</Typography> : null}
    </form>
  );
}

export { InputField };