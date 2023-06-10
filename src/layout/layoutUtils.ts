import { HTMLAttributes, ReactNode } from 'react'

export type ViewPortSizeType = 'xl' | 'lg' | 'md' | 'sm' | 'xs'
export type ColumnSizeType =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | boolean

export type OffsetType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export enum RowAttributes {
  start = 'start',
  center = 'center',
  end = 'end',
  top = 'top',
  middle = 'middle',
  bottom = 'bottom',
  around = 'around',
  between = 'between',
  reverse = 'reverse'
}

export enum ColAttributes {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  xsOffset = 'xsOffset',
  smOffset = 'smOffset',
  mdOffset = 'mdOffset',
  lgOffset = 'lgOffset',
  xlOffset = 'xlOffset'
}

export interface LayoutProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
}

// creates an object that contains children and classnames to help create the layout components
export function createProps(props: LayoutProps, classNames: string) {
  const childrenAndProps: any = {}
  Object.keys(props)
    // Col and Row Props will get added as styles to the className
    // the div has no knowledge of what these props do
    .filter(
      (key) =>
        key === 'children' ||
        (!(key in ColAttributes) && !(key in RowAttributes) && key)
    )
    .forEach((key: string) => {
      childrenAndProps[key] = props[key as keyof LayoutProps]
    })

  return { ...childrenAndProps, className: classNames }
}
