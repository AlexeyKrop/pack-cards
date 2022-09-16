import React from 'react';

import { Table, TableProps } from 'antd';

import { useAppDispatch } from '../../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector/useAppSelector';
import {
  setChangePage,
  setChangePageSize,
} from '../../../store/reducers/packsParamsReducer';
import { selectCardsPack } from '../../../store/selectors/selectCardsPack';
import { selectPacksStatus } from '../../../store/selectors/selectPacksStatus';
import {
  selectCardsPacksTotalCount,
  selectCurrentPageCount,
  selectPageSizeCount,
} from '../../../store/selectors/selectParamsPacks';

type DataType = {
  key: string;
  name: string;
  cards: number;
  updated: string;
  created: string;
  actions: string;
};
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Cards',
    dataIndex: 'cards',
  },
  {
    title: 'Last Updated',
    dataIndex: 'updated',
    sorter: true,
  },
  {
    title: 'Created By',
    dataIndex: 'created',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
  },
];

export const PacksTable: React.FC = () => {
  const cardPacks = useAppSelector(selectCardsPack);
  const cardPacksTotalCount = useAppSelector(selectCardsPacksTotalCount);
  const pageCount = useAppSelector(selectPageSizeCount);
  const currentPage = useAppSelector(selectCurrentPageCount);
  const packStatus = useAppSelector(selectPacksStatus);
  const dispatch = useAppDispatch();
  const pagination = {
    current: currentPage,
    defaultPageSize: pageCount,
    pageSizeOptions: [4, 8, 16, 32, 64],
    pageCount,
    total: cardPacksTotalCount,
  };
  const onChangeHandle: TableProps<DataType>['onChange'] = (pagination, filters) => {
    const { current, pageSize } = pagination;

    dispatch(setChangePageSize({ pageCount: pageSize }));
    dispatch(setChangePage({ currentPage: current }));
    // console.log(`total: ${total}`);
    console.log('params', filters);
  };
  const dataCard = cardPacks.map(({ _id, name, cardsCount, updated, user_name }) => {
    return {
      key: _id,
      name,
      cards: cardsCount,
      updated: new Date(updated).toLocaleDateString(),
      created: user_name,
      actions: name,
    };
  });

  // console.log(`pageCount: ${pageCount}`);
  // console.log(`dataCard: ${dataCard.length}`);

  return (
    <Table
      // sorter={(a: any, b: any) => console.log(a, b)}
      loading={packStatus === 'loading'}
      columns={columns}
      onChange={onChangeHandle}
      dataSource={dataCard}
      pagination={pagination}
    />
  );
};
