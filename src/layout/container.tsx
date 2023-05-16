import React from 'react'
import { classes } from '@/utils'
import { LayoutProps, createProps } from './layoutUtils'
import styles from './layout.module.scss'

export interface ContainerProps extends LayoutProps {
  debug?: boolean,
  fluid?: boolean,
}

export function Container({
  fluid,
  className,
  debug = false,
  ...props
}: ContainerProps) {
  const classNames = classes(
    fluid ? styles['container-fluid'] : styles.container,
    debug && styles.debug,
    className
  )

  return React.createElement('div', createProps(props, classNames))
}
