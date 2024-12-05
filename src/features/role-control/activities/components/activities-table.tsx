import { Table, type TableProps } from 'antd';
import dayjs from 'dayjs';

import ActivitiesTableOperators from '~/features/role-control/activities/components/activities-table-operators';

import { DateFormats } from '~/constants/dateFormats';
import type { Activity } from '~/features/role-control/activities/types/Activity';

interface Props extends TableProps<Activity> {
  showOperators?: boolean;
}

const ActivitiesTable = (props: Props) => {
  const { showOperators = true, ...tableProps } = props;

  const columns: TableProps<Activity>['columns'] = [
    {
      title: '',
      key: 'operators',
      dataIndex: 'operators',
      width: 100,
      align: 'center' as const,
      render: (_: unknown, record: Activity) => <ActivitiesTableOperators activity={record} />,
    },
    {
      title: 'Code',
      key: 'Code',
      dataIndex: 'Code',
    },
    {
      title: 'Quyền',
      key: 'Name',
      dataIndex: 'Name',
    },
    {
      title: 'Mô tả',
      key: 'Description',
      dataIndex: 'Description',
    },
    {
      title: 'Ngày tạo',
      key: 'CreatedDate',
      dataIndex: 'CreatedDate',
      render: (datetime: string) => <span>{dayjs(datetime).format(DateFormats.VI_DATE)}</span>,
    },
  ];

  const filteredColumns = columns.filter((col) => {
    if (showOperators) return true;
    return col.key !== 'operators';
  });

  return <Table rowKey='Id' columns={filteredColumns} {...tableProps} />;
};

export default ActivitiesTable;
