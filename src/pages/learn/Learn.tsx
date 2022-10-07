import React, { useEffect, useState } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Radio, RadioChangeEvent } from 'antd';
import { NavLink, useParams } from 'react-router-dom';

import { CardType } from '../../api/cards/cards';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector/useAppSelector';
import { PATH } from '../../routing/Pages';
import { changeGradeTC, setCardsCardTC } from '../../store/reducers/cardsReducer';

import s from './learn.module.css';

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const getCard: (cards: CardType[]) => any = cards => {
  // eslint-disable-next-line no-magic-numbers
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      // eslint-disable-next-line no-magic-numbers
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);

      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 },
  );

  return cards[res.id + 1];
};

export const Learn: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const cards = useAppSelector(state => state.cards.cards);
  const pack = useAppSelector(state =>
    state.packs.cardPacks.find(pack => pack._id === id),
  );
  const [value, setValue] = useState<number>(1);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [first, setFirst] = useState<boolean>(true);
  const [card, setCard] = useState<CardType>({
    answer: 'answer fake',
    question: 'question fake',
    cardsPack_id: '',
    grade: 0,
    shots: 0,
    user_id: '',
    created: '',
    updated: '',
    _id: 'fake',
  });

  useEffect(() => {
    if (first) {
      dispatch(setCardsCardTC(id));
      setFirst(false);
    }
    if (cards.length > 0) setCard(getCard(cards));
  }, [first, id, cards, dispatch]);

  const onNext: () => void = () => {
    setIsChecked(false);

    if (cards.length > 0) {
      setCard(getCard(cards));
    }

    dispatch(changeGradeTC(card._id, value));
  };
  const onChange: (e: RadioChangeEvent) => void = e => {
    setValue(+e.target.value);
  };

  return (
    <>
      <NavLink className={s.link} to={PATH.PACKS}>
        {' '}
        <ArrowLeftOutlined />
        <span className={s.navigateText}>Back to Packs List</span>
      </NavLink>
      <h2 className={s.title}>Learn {pack && pack.name}</h2>
      <div className={s.wrapper}>
        <div className={s.content}>
          <div className={s.questions}>
            <strong>Question</strong>: {card.question}
          </div>
          <div>
            <Button className={s.btn} onClick={() => setIsChecked(true)}>
              check
            </Button>
          </div>
          {isChecked && (
            <>
              <div className={s.answer}>
                <strong>Answer</strong>:{card.answer}?
              </div>
              <div className={s.grade}>
                {grades.map((g, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Radio.Group key={`grade-${i}`} onChange={onChange} value={value}>
                    <Radio value={i}>{g}</Radio>
                  </Radio.Group>
                  // <Button key={`grade-${i}`} onClick={() => {}}>
                  //   {g}
                  // </Button>
                ))}{' '}
              </div>
              <Button className={s.button} onClick={onNext}>
                next
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
