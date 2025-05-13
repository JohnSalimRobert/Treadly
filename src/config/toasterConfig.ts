export const toasterOptions = {
    className: 'font-[var(--font-threadly)] text-sm shadow-md rounded-lg',
    style: {
      background: 'var(--color-threadly-background)',
      color: 'var(--color-threadly-text)',
      borderLeft: '4px solid var(--color-threadly-primary)',
      padding: '0.75rem 1rem',
    },
    success: {
      style: {
        background: 'var(--color-threadly-success)',
        color: 'white',
        borderLeft: '4px solid var(--color-threadly-success)',
      },
    },
    error: {
      style: {
        background: 'var(--color-threadly-error)',
        color: 'white',
        borderLeft: '4px solid var(--color-threadly-error)',
      },
    },
  }