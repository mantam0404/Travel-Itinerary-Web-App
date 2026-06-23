import type { ReactNode, CSSProperties, HTMLAttributes, Ref } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ScrollRevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  delay?: number;
  as?: 'div' | 'section' | 'article';
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  ...rest
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const style = {
    '--ln-reveal-delay': `${delay}ms`,
    ...rest.style,
  } as CSSProperties;

  return (
    <Tag
      {...rest}
      ref={ref as Ref<HTMLDivElement>}
      style={style}
      className={`ln-reveal ${isVisible ? 'ln-reveal-visible' : ''} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
