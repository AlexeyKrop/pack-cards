import React from 'react';

import { Table, TablePaginationConfig } from 'antd';

import { useAppSelector } from '../../../hooks/useAppSelector/useAppSelector';
import { selectCardsPack } from '../../../store/selectors/selectCardsPack';
import {
  selectCardsPacksTotalCount,
  selectCurrentPageCount,
  selectPageCount,
} from '../../../store/selectors/selectParamsPacks';

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
  const cardPacksTotalCount = useAppSelector(selectCardsPacksTotalCount);
  const pageCount = useAppSelector(selectPageCount);
  const currentPage = useAppSelector(selectCurrentPageCount);

  const onChangeHandle: (pagination: TablePaginationConfig) => void = pagination => {
    console.log(pagination);
  };

  const pagination = {
    current: currentPage,
    defaultPageSize: pageCount,
    pageSizeOptions: [4, 8, 16, 32, 64],
    pageCount,
    total: cardPacksTotalCount,
  };

  const dataCard = cardPacks.map(({ _id, name, cardsCount, updated, user_name }) => {
    return {
      key: _id,
      name,
      cards: cardsCount,
      updated,
      created: user_name,
      actions: name,
    };
  });

  return (
    <Table
      columns={columns}
      onChange={onChangeHandle}
      dataSource={dataCard}
      pagination={pagination}
    />
  );
};
