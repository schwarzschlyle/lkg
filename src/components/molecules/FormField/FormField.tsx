import { useId } from 'react';
import { cx } from '@/lib/cx';
import styles from './FormField.module.css';

export interface FormFieldProps {
  readonly name: string;
  readonly label: string;
  readonly placeholder?: string;
  readonly type?: 'text' | 'email';
  /** Render a textarea instead of a single-line input. */
  readonly multiline?: boolean;
  readonly rows?: number;
  readonly required?: boolean;
}

/** A labelled input or textarea. The label is always a real `<label for>`. */
export function FormField({
  name,
  label,
  placeholder,
  type = 'text',
  multiline = false,
  rows = 3,
  required = false,
}: FormFieldProps) {
  const id = useId();

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          placeholder={placeholder}
          required={required}
          className={cx(styles.control, styles.textarea)}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={styles.control}
        />
      )}
    </div>
  );
}
