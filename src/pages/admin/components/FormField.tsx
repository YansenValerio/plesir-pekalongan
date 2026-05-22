import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

const fieldStyle = {
  background: 'rgba(255,255,255,.06)',
  border: '1px solid rgba(255,255,255,.15)',
  color: '#fff',
}

interface BaseProps {
  label: string
  error?: string
  hint?: string
  required?: boolean
}

interface InputProps extends BaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style'> {
  as?: 'input'
}

interface TextareaProps extends BaseProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className' | 'style'> {
  as: 'textarea'
  rows?: number
}

type Props = InputProps | TextareaProps

export default function FormField({ label, error, hint, required, as: As = 'input', ...props }: Props) {
  const sharedClass = 'w-full rounded-lg px-3 py-2 text-sm outline-none transition-colors'

  return (
    <div>
      <label className="block text-white/70 text-xs font-semibold uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {As === 'textarea' ? (
        <textarea
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={sharedClass}
          style={fieldStyle}
          rows={(props as TextareaProps).rows ?? 4}
        />
      ) : (
        <input
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
          className={sharedClass}
          style={fieldStyle}
        />
      )}
      {hint && <p className="text-white/40 text-xs mt-1">{hint}</p>}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}
