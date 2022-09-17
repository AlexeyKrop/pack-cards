import React from 'react';

import { Table, TableProps } from 'antd';
import { SorterResult } from 'antd/lib/table/interface';

import { useAppDispatch } from '../../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector/useAppSelector';
import {
  setChangePage,
  setChangePageSize,
  setSortPack,
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
    key: 'name',
  },
  {
    title: 'Cards',
    dataIndex: 'cards',
    key: 'type',
  },
  {
    title: 'Last Updated',
    dataIndex: 'updated',
    sorter: true,
    key: 'updated',
  },
  {
    title: 'Created By',
    dataIndex: 'created',
    key: 'created',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
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

  // @ts-ignore
  const onChangeHandle: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter: SorterResult<DataType>,
  ) => {
    const { current, pageSize } = pagination;
    const { order } = sorter;

    if (order === 'ascend') {
      dispatch(setSortPack({ value: '1' }));
    }
    if (order === 'descend') {
      dispatch(setSortPack({ value: '0' }));
    }
    dispatch(setChangePageSize({ pageCount: pageSize }));
    dispatch(setChangePage({ currentPage: current }));
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

  return (
    <Table
      loading={packStatus === 'loading'}
      columns={columns}
      onChange={onChangeHandle}
      dataSource={dataCard}
      pagination={pagination}
    />
  );
};
