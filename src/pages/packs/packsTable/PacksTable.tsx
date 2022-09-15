import React from 'react';

import { Table, TablePaginationConfig } from 'antd';

import { useAppDispatch } from '../../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector/useAppSelector';
import {
  setChangePage,
  setChangePageSize,
} from '../../../store/reducers/packsParamsReducer';
import { selectCardsPack } from '../../../store/selectors/selectCardsPack';
import {
  selectCardsPacksTotalCount,
  selectCurrentPageCount,
  selectPageSizeCount,
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
  const pageCount = useAppSelector(selectPageSizeCount);
  const currentPage = useAppSelector(selectCurrentPageCount);
  const dispatch = useAppDispatch();
  const onChangeHandle: (pagination: TablePaginationConfig) => void = pagination => {
    const { current, pageSize } = pagination;

    dispatch(setChangePage({ currentPage: current }));
    dispatch(setChangePageSize({ pageCount: pageSize }));
  };

  const pagination = {
    current: currentPage,
    defaultPageSize: pageCount,
    pageSizeOptions: [4, 8, 16, 32, 64],
    pageCount,
    total: cardPacksTotalCount - pageCount!,
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
    <div>
      {dataCard.length > pageCount! && (
        <Table
          columns={columns}
          onChange={onChangeHandle}
          dataSource={dataCard}
          pagination={pagination}
        />
      )}
    </div>
  );
};
