import cn from 'classnames';
import React from 'react';

import styles from '@/styles/main/table.module.scss';

import Tooltip from '../tooltip/Tooltip';
import type { TableColumn, TableProps } from './Table.types';

export default function Table<DataType>(props: TableProps<DataType>) {
  return (
    <div className={styles.tableWrapper}>
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
          {props.data.map((row: any) => {
            return (
              <tr
                key={`row-${row[props.keyField]}`}
                className={cn({
                  // @ts-ignore
                  [styles.newRowAnimation]: props.enterAnimated,
                })}
              >
                {Object.keys(props.columns).map((column) => {
                  const { format: formatter, tooltip } = props.columns[
                    column as keyof DataType
                  ] as TableColumn;

                  return (
                    <td
                      key={`col-${column}`}
                      title={tooltip ? row[column] : null}
                    >
                      {formatter ? formatter(row[column]) : row[column]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
