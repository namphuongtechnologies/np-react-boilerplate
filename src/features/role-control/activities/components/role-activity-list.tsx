import { useState, type FC, type HTMLAttributes, type PropsWithChildren } from 'react';
import { Checkbox, Table, type TableProps } from 'antd';
import { produce } from 'immer';

interface RoleActivity {
  Id: string;
  ActivityName: string;
  C: boolean;
  R: boolean;
  U: boolean;
  D: boolean;
}

interface Props extends Omit<TableProps, 'onChange' | 'dataSource'> {
  editing?: boolean;
  onChange?: (dataSource: RoleActivity[]) => void;
  dataSource?: RoleActivity[];
}

interface OnCheckedChangeInfo {
  record: RoleActivity;
  checked: boolean;
  dataIndex: keyof RoleActivity;
}

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: 'checkbox';
  record: RoleActivity;
  index: number;
  onCheckedChange?: (info: OnCheckedChangeInfo) => void;
}

const EditableCell: FC<PropsWithChildren<EditableCellProps>> = (props) => {
  const {
    editing,
    dataIndex,
    inputType,
    record,
    children,
    onCheckedChange = () => {},
    ...tdProps
  } = props;

  const inputNode =
    inputType === 'checkbox' ? (
      <Checkbox
        checked={record[dataIndex as keyof RoleActivity] as boolean}
        disabled={!editing}
        onChange={(e) =>
          onCheckedChange({
            record,
            checked: e.target.checked,
            dataIndex: dataIndex as keyof RoleActivity,
          })
        }
      />
    ) : (
      children
    );

  return <td {...tdProps}>{inputNode}</td>;
};

const RoleActivityList = (props: Props) => {
  const {
    editing,
    dataSource: dataSourceProp,
    onChange: onChangeProp = () => {},
    ...tableProps
  } = props;
  const [dataSourceState, setDataSourceState] = useState(dataSourceProp ?? []);

  const dataSource = dataSourceProp ?? dataSourceState;
  const onChange = onChangeProp ?? setDataSourceState;

  const onCheckedChange = (info: OnCheckedChangeInfo) => {
    const newDataSource = produce(dataSource, (draft) => {
      const record = draft.find((item) => item.Id === info.record.Id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (record as any)[info.dataIndex] = info.checked;
    });
    onChange(newDataSource);
  };

  const columns = [
    {
      title: 'Quyền',
      dataIndex: 'ActivityName',
      key: 'ActivityName',
    },
    {
      title: 'Xem',
      dataIndex: 'R',
      key: 'R',
      editable: true,
      width: 120,
      align: 'center' as const,
    },
    {
      title: 'Thêm',
      dataIndex: 'C',
      key: 'C',
      editable: true,
      width: 120,
      align: 'center' as const,
    },
    {
      title: 'Cập nhật',
      dataIndex: 'U',
      key: 'U',
      editable: true,
      width: 120,
      align: 'center' as const,
    },
    {
      title: 'Xóa',
      dataIndex: 'D',
      key: 'D',
      editable: true,
      width: 120,
      align: 'center' as const,
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record: unknown) => ({
        record,
        inputType: 'checkbox',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: editing,
        onCheckedChange,
      }),
    };
  });

  return (
    <Table
      rowKey='Id'
      components={{ body: { cell: EditableCell } }}
      bordered
      dataSource={dataSource}
      columns={mergedColumns}
      {...tableProps}
    />
  );
};

export default RoleActivityList;
