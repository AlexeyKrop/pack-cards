import React from 'react';

import { Table, TablePaginationConfig } from 'antd';

import { useAppSelector } from '../../../hooks/useAppSelector/useAppSelector';
import { selectCardsPack } from '../../../store/selectors/selectCardsPack';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Cards',
    dataIndex: 'cards',
    sorter: {
      compare: (a: any, b: any) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: 'Last Updated',
    dataIndex: 'updated',
    sorter: {
      compare: (a: any, b: any) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: 'Created By',
    dataIndex: 'created',
    sorter: {
      compare: (a: any, b: any) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    sorter: {
      compare: (a: any, b: any) => a.english - b.english,
      multiple: 1,
    },
  },
];

export const PacksTable: React.FC = () => {
  const cardPacks = useAppSelector(selectCardsPack);
  // eslint-disable-next-line camelcase
  const dataCard = cardPacks.map(({ _id, name, cardsCount, updated, user_name }) => {
    return {
      // eslint-disable-next-line no-underscore-dangle
      key: _id,
      name,
      cards: cardsCount,
      updated,
      // eslint-disable-next-line camelcase
      created: user_name,
      actions: name,
    };
  });
  const onChange: (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: any,
    extra: any,
  ) => void = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return <Table columns={columns} dataSource={dataCard} onChange={onChange} />;
};
