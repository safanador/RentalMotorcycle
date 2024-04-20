import { ReactNode } from 'react';
import Link from 'next/link';
import { Loader } from '@/components/Loader';
import styles from "./styles.module.scss"

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  href?: string;
  isLoading?: boolean;
  buttonText: string;
}

const Button = ({ children, className = '', href , isLoading , buttonText}: ButtonProps) => {
  if ( typeof href === 'string' ) {
    return (
      <Link href={href}>
        <a className={`inline-block rounded bg-slate-600 py-2.5 px-6 text-sm font-bold uppercase text-white hover:bg-slate-500 hover:text-white ${className}`}>
          { children }
        </a>
      </Link>
    );
  }
  
  return (
    <button className={styles.submitButton} type='submit' disabled={isLoading}>
      {isLoading ? <Loader /> : buttonText}
    </button>
  )
}
export default Button;