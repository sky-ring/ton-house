import cn from 'classnames';
import React from 'react';

import styles from '@/styles/main/table.module.scss';

import Tooltip from '../tooltip/Tooltip';
import type { TableColumn, TableProps } from './Table.types';

export default function Table<DataType>(props: TableProps<DataType>) {
  return (
    <table
      className={cn({
        // @ts-ignore
        [styles.table]: true,
        [props.className]: !!props.className,
      })}
    >
      <thead>
        <tr>
          {Object.entries(props.columns).map((column) => {
            const columnData = column[1] as TableColumn;

            return (
              <th key={column[0]}>
                {columnData.title}
                {columnData.info !== undefined ? (
                  <Tooltip text={columnData.info} />
                ) : null}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {props.data.map((row: DataType, index) => (
          <tr key={`row-${index}`}>
            {Object.values(row).map((value, idx) => (
              <td key={`col-${idx}`}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
