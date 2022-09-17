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
import {
  selectCardsPacksTotalCount,
  selectCurrentPageCount,
  selectPageSizeCount,
} from '../../../store/selectors/selectParamsPacks';

type DataType = {
  key: string;
  question: string;
  answer: string;
  updated: string;
  grade: number;
};
const columns = [
  {
    title: 'Question',
    dataIndex: 'question',
    key: 'name',
    textWrap: 'word-break',
    ellipsis: true,
  },
  {
    title: 'Answer',
    dataIndex: 'answer',
    textWrap: 'word-break',
    ellipsis: true,
  },
  {
    title: 'Last Updated',
    dataIndex: 'updated',
    sorter: true,
    textWrap: 'word-break',
    ellipsis: true,
  },
  {
    title: 'Grade',
    dataIndex: 'grade',
    textWrap: 'word-break',
    ellipsis: true,
  },
];

export const CardsTable: React.FC = () => {
  const cards = useAppSelector(state => state.cards.cards);
  const cardPacksTotalCount = useAppSelector(selectCardsPacksTotalCount);
  const pageCount = useAppSelector(selectPageSizeCount);
  const currentPage = useAppSelector(selectCurrentPageCount);
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
  const dataCard = cards.map(({ _id, updated, grade, question, answer }) => {
    return {
      key: _id,
      question,
      answer,
      updated: new Date(updated).toLocaleDateString(),
      grade,
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
