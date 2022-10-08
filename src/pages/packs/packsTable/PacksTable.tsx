import React from 'react';

import { Button, Table, TableProps } from 'antd';
import { SorterResult } from 'antd/lib/table/interface';
import { useNavigate } from 'react-router-dom';

import { Actions } from '../../../components/actions/Actions';
import { useAppDispatch } from '../../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector/useAppSelector';
import { PATH } from '../../../routing/Pages';
import { setChangeCardId } from '../../../store/reducers/cardsParamsReducer';
import {
  setChangePage,
  setChangePageSize,
  setSortPack,
} from '../../../store/reducers/packsParamsReducer';
import { selectCardsPack } from '../../../store/selectors/selectPacks/selectCardsPack';
import { selectPacksStatus } from '../../../store/selectors/selectPacks/selectPacksStatus';
import {
  selectCardsPacksTotalCount,
  selectCurrentPageCount,
  selectPageSizeCount,
} from '../../../store/selectors/selectPacks/selectParamsPacks';
import { saveState } from '../../../utils/localStorage';

type DataType = {
  key: string;
  name: React.ReactNode;
  cards: number;
  updated: string;
  created: string;
  actions: React.ReactNode;
};
const columns = [
  {
    title: 'Cover',
    dataIndex: 'cover',
    key: 'cover',
    textWrap: 'word-break',
    ellipsis: true,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    textWrap: 'word-break',
    ellipsis: true,
  },
  {
    title: 'Cards',
    dataIndex: 'cards',
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
    title: 'Created By',
    dataIndex: 'created',
    textWrap: 'word-break',
    ellipsis: true,
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    width: 160,
    textWrap: 'word-break',
    ellipsis: true,
  },
];

export const PacksTable: React.FC = () => {
  const cardPacks = useAppSelector(selectCardsPack);
  const cardPacksTotalCount = useAppSelector(selectCardsPacksTotalCount);
  const pageCount = useAppSelector(selectPageSizeCount);
  const currentPage = useAppSelector(selectCurrentPageCount);
  const packStatus = useAppSelector(selectPacksStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const pagination = {
    current: currentPage,
    defaultPageSize: pageCount,
    pageSizeOptions: [4, 8, 16, 32, 64],
    pageCount,
    total: cardPacksTotalCount,
  };

  const onClickHandle: (id: string) => void = id => {
    saveState('cardsId', id);
    dispatch(setChangeCardId({ cardsPack_id: id }));
    navigate(PATH.CARDS);
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
  const dataCard = cardPacks.map(
    ({ _id, name, cardsCount, updated, user_name, user_id, deckCover }) => {
      return {
        key: _id,
        cover: <img src={deckCover} alt="cover" />,
        name: (
          <Button type="text" onClick={() => onClickHandle(_id)}>
            {name}
          </Button>
        ),
        cards: cardsCount,
        updated: new Date(updated).toLocaleDateString(),
        created: user_name,
        actions: <Actions id={_id} user_id={user_id} />,
      };
    },
  );

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
