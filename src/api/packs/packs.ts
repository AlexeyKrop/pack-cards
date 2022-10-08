import { AxiosResponse } from 'axios';

import { instance } from '../config';

export const packsAPI = {
  setCardsPack(packsParams: PacksParamsType) {
    return instance.get<PacksParamsType, AxiosResponse<CardsPackResponseType>>(
      `/cards/pack?`,
      {
        params: packsParams,
      },
    );
  },
  createCardsPack(params: CreateCardsPackParamsType) {
    return instance.post<CreateCardsPackParamsType, AxiosResponse<CardsPackResponseType>>(
      `cards/pack`,
      {
        cardsPack: {
          ...params,
        },
      },
    );
  },
  editCardsPack(params: EditCardsPackParamsType) {
    return instance.put<EditCardsPackParamsType, AxiosResponse<CardsPackResponseType>>(
      `cards/pack`,
      {
        cardsPack: {
          ...params,
        },
      },
    );
  },
  deleteCardsPack(params: DeleteCardsPackParamsType) {
    return instance.delete(`cards/pack`, {
      params,
    });
  },
};
export type PackType = {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  cardsCount: number;
  type: string;
  rating: number;
  created: string;
  updated: string;
  more_id: string;
  __v: number;
  deckCover?: string;
};

export type CardsPackType = PackType[];

export type CardsPackResponseType = {
  cardPacks: CardsPackType;
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};

export type PacksParamsType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number | undefined;
  pageCount?: number | undefined;
  user_id?: string;
};

export type CreateCardsPackParamsType = {
  name?: string;
  deckCover?: string;
  private?: boolean;
};
export type EditCardsPackParamsType = {
  _id: string;
  name?: string;
};
export type DeleteCardsPackParamsType = {
  id: string;
};
