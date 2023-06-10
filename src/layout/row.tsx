import React from 'react';
import { classes } from '@/utils';
import { LayoutProps, ViewPortSizeType, createProps, RowAttributes } from './layoutUtils';
import styles from './layout.module.scss';

export interface RowProps extends LayoutProps {
  reverse?: boolean,
  start?: ViewPortSizeType,
  center?: ViewPortSizeType,
  end?: ViewPortSizeType,
  top?: ViewPortSizeType,
  middle?: ViewPortSizeType,
  bottom?: ViewPortSizeType,
  around?: ViewPortSizeType,
  between?: ViewPortSizeType,
}

export function Row({ ...props }: RowProps) {
  const rowKeys = [
    'start',
    'center',
    'end',
    'top',
    'middle',
    'bottom',
    'around',
    'between'
  ];
  const modificators = [];

  for (let i = 0; i < rowKeys.length; i += 1) {
    const key = rowKeys[i];
    const value = props[key as RowAttributes];
    if (value) {
      modificators.push(styles[`${key}-${value}`]);
    }
  }

  const classNames = classes(
    props.className,
    styles.row,
    props.reverse && styles.reverse,
    ...modificators
  )

  return React.createElement('div', createProps(props, classNames));
}
