import React from 'react';

import { Table, TableProps } from 'antd';
import { SorterResult } from 'antd/lib/table/interface';

import { useAppDispatch } from '../../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector/useAppSelector';
import { setChangeCardsPage } from '../../../store/reducers/cardsParamsReducer';
import { setSortPack } from '../../../store/reducers/packsParamsReducer';
import {
  selectCurrentPageCount,
  selectPageSizeCount,
} from '../../../store/selectors/selectPacks/selectParamsPacks';

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
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount);
  const pageCount = useAppSelector(selectPageSizeCount);
  const currentPage = useAppSelector(selectCurrentPageCount);
  const dispatch = useAppDispatch();
  const pagination = {
    current: currentPage,
    defaultPageSize: pageCount,
    pageSizeOptions: [8, 16, 32, 64, 128],
    pageCount,
    total: cardsTotalCount,
  };

  // @ts-ignore
  const onChangeHandle: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter: SorterResult<DataType>,
  ) => {
    const { current, pageSize } = pagination;
    const { order } = sorter;

    console.log(pageSize, current);
    if (order === 'ascend') {
      dispatch(setSortPack({ value: '1' }));
    }
    if (order === 'descend') {
      dispatch(setSortPack({ value: '0' }));
    }
    dispatch(setChangeCardsPage({ currentPage: current }));
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
