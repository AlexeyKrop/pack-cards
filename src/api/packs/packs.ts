import { instance } from '../config';

export const packsAPI = {
  setCardsPack(currentPage: number, pageSize: number) {
    return instance.get<CardsPackResponseType>(
      `/cards/pack?page=${currentPage}&pageCount=${pageSize}`,
    );
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
