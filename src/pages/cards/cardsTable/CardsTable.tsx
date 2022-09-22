import React from 'react';

import { Rate, Table, TableProps } from 'antd';
import { SorterResult } from 'antd/lib/table/interface';

import { useAppDispatch } from '../../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector/useAppSelector';
import {
  setChangeCardsPage,
  setChangeCardsPageSize,
  setSortCards,
} from '../../../store/reducers/cardsParamsReducer';
import { selectCardsStatus } from '../../../store/selectors/selectCards/selectCardsStatus';
import { selectCardsTotalCount } from '../../../store/selectors/selectCards/selectCardsTotalCount';
import {
  selectCardsCurrentPageCount,
  selectCardsPageSizeCount,
} from '../../../store/selectors/selectCards/selectParamsCards';

type DataType = {
  key: string;
  question: string;
  answer: string;
  updated: string;
  grade: React.ReactNode;
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
  const cardsTotalCount = useAppSelector(selectCardsTotalCount);
  const pageCount = useAppSelector(selectCardsPageSizeCount);
  const currentPage = useAppSelector(selectCardsCurrentPageCount);
  const status = useAppSelector(selectCardsStatus);
  const dispatch = useAppDispatch();
  const pagination = {
    current: currentPage,
    defaultPageSize: pageCount,
    pageSizeOptions: [4, 8, 16, 32, 64],
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

    if (order === 'ascend') {
      dispatch(setSortCards({ value: '1' }));
    }
    if (order === 'descend') {
      dispatch(setSortCards({ value: '0' }));
    }
    dispatch(setChangeCardsPageSize({ pageCount: pageSize }));
    dispatch(setChangeCardsPage({ currentPage: current }));
  };

  const dataCard = cards.map(({ _id, updated, question, grade, answer }) => {
    return {
      key: _id,
      question,
      answer,
      updated: new Date(updated).toLocaleDateString(),
      grade: <Rate disabled value={grade} />,
    };
  });

  return (
    <Table
      loading={status === 'loading'}
      columns={columns}
      onChange={onChangeHandle}
      dataSource={dataCard}
      pagination={pagination}
    />
  );
};
