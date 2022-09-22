import { AxiosResponse } from 'axios';

import { instance } from '../config';

export const cardsAPI = {
  setCardsCard(cardsParams: CardsParamsType) {
    return instance.get<CardsParamsType, AxiosResponse<CardsCardResponseType>>(
      `cards/card`,
      {
        params: cardsParams,
      },
    );
  },
  createCardsCard(params: AddCardsParamsType) {
    return instance.post(`cards/card`, {
      card: {
        ...params,
      },
    });
  },
  editCardsCard(params: EditCardsParamsType) {
    return instance.put(`cards/card`, {
      card: {
        ...params,
      },
    });
  },
  deleteCardsCard(id: string) {
    return instance.delete(`/cards/card`, {
      params: {
        id,
      },
    });
  },
};
export type CardsParamsType = {
  cardAnswer?: string;
  cardQuestion?: string;
  cardsPack_id: string;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};
export type CardType = {
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  shots: number;
  user_id: string;
  created: Date;
  updated: Date;
  _id: string;
};

export type CardsCardResponseType = {
  cards: CardType[];
  packUserId: string;
  packName: string;
  packPrivate: boolean;
  packCreated: string;
  packUpdated: string;
  page: number;
  pageCount: number;
  cardsTotalCount: number;
  minGrade: number;
  maxGrade: number;
  token: string;
  tokenDeathTime: number;
};

export type AddCardsParamsType = {
  cardsPack_id: string;
  question?: string;
  answer?: string;
  grade?: number;
  shots?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
};

export type EditCardsParamsType = {
  _id: string;
  question: string;
  comments: string;
};
