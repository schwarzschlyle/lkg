import type { ReactNode } from 'react';
import { useIsTouch, useMagnetic, usePrefersReducedMotion } from '@/hooks';
import { cx } from '@/lib/cx';
import styles from './Button.module.css';

export type ButtonVariant = 'outline' | 'solid' | 'ghost';

export interface ButtonProps {
  readonly variant?: ButtonVariant;
  /** Pull the button toward the cursor when near (spec §1.4). */
  readonly magnetic?: boolean;
  readonly fullWidth?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
  readonly onClick?: () => void;
  /** Renders an anchor. Omit for a real `<button>`. */
  readonly href?: string;
  /** Only meaningful without `href`. */
  readonly type?: 'submit' | 'button';
  /** Only meaningful without `href`. */
  readonly disabled?: boolean;
}

/**
 * The site's single button. Renders an anchor when given `href` and a real
 * `<button>` otherwise, so in-page jump links stay keyboard- and
 * right-click-friendly while form controls stay semantically correct.
 */
export function Button({
  variant = 'outline',
  magnetic = false,
  fullWidth = false,
  className,
  children,
  onClick,
  href,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouch();
  const magnet = useMagnetic(magnetic && !reducedMotion && !isTouch);

  const classes = cx(
    styles.button,
    variant === 'solid' && styles.solid,
    variant === 'ghost' && styles.ghost,
    fullWidth && styles.fullWidth,
    className,
  );

  if (href !== undefined) {
    return (
      <a
        ref={magnet.ref}
        href={href}
        className={classes}
        onClick={onClick}
        onPointerMove={magnet.onPointerMove}
        onPointerLeave={magnet.onPointerLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={magnet.ref}
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      onPointerMove={magnet.onPointerMove}
      onPointerLeave={magnet.onPointerLeave}
    >
      {children}
    </button>
  );
}
