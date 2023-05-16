import { classes } from '@/utils'
import React from 'react'
import {
    ColAttributes,
    ColumnSizeType,
    LayoutProps,
    OffsetType,
    ViewPortSizeType,
    createProps,
} from './layoutUtils'
import styles from './layout.module.scss'

export interface ColProps extends LayoutProps {
    xl?: ColumnSizeType
    lg?: ColumnSizeType
    md?: ColumnSizeType
    sm?: ColumnSizeType
    xs?: ColumnSizeType
    xlOffset?: OffsetType
    lgOffset?: OffsetType
    mdOffset?: OffsetType
    smOffset?: OffsetType
    xsOffset?: OffsetType
    first?: ViewPortSizeType
    last?: ViewPortSizeType
}

export function Col({ ...props }: ColProps) {
    const classMap = {
        xs: 'col-xs',
        sm: 'col-sm',
        md: 'col-md',
        lg: 'col-lg',
        xl: 'col-xl',
        xsOffset: 'col-xs-offset',
        smOffset: 'col-sm-offset',
        mdOffset: 'col-md-offset',
        lgOffset: 'col-lg-offset',
        xlOffset: 'col-xl-offset',
    }

    const getColClassNames = (p: ColProps) => {
        const getStyle = (key: ColAttributes) => {
            if (Number.isInteger(p[key])) {
                return `${classMap[key]}-${p[key]}`
            }
            if (p[key]) {
                return classMap[key]
            }
            return `${classMap[key]}-hidden`
        }

        return classes(
            props.className,
            p.first && styles[`first-${p.first}`],
            p.last && styles[`last-${p.last}`],
            ...Object.keys(props)
                .filter((key: string) => key && classMap[key as ColAttributes])
                .map((key: string) => styles[getStyle(key as ColAttributes)]),
        )
    }

    return React.createElement('div', createProps(props, getColClassNames(props)))
}
