import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface PTagProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  children: ReactNode
  size?: 's' | 'm' | 'l'
}
