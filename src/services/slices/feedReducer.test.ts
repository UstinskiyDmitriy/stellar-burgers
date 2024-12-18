import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import feedReducer, { getFeedThunk, getOrdersThunk } from './feedSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      feed: feedReducer
    }
  });

const mockedError = 'mocked error';

const mockedFeedPayload = {
  orders: {
    _id: '660e7df397ede0001d0643df',
    ingredients: [
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Space флюоресцентный бургер',
    createdAt: '2024-04-04T10:16:19.376Z',
    updatedAt: '2024-04-04T10:16:19.994Z',
    number: 37593
  },
  total: 37601,
  totalToday: 45
};

const mockedOrdersPayload = {
  _id: '660e7df397ede0001d0643df',
  ingredients: [
    '643d69a5c3f7b9001cfa0943',
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa093d'
  ],
  status: 'done',
  name: 'Space флюоресцентный бургер',
  createdAt: '2024-04-04T10:16:19.376Z',
  updatedAt: '2024-04-04T10:16:19.994Z',
  number: 37593
};

describe('Тесты экшенов ленты', () => {
  describe('Тесты экшена получения ленты', () => {
    test('Тест экшена ожидания ответ после запроса ленты', () => {
      const store = setupStore();
      store.dispatch({ type: getFeedThunk.pending.type });
      const state = store.getState();
      expect(state.feed.isLoading).toBeTruthy();
      expect(state.feed.error).toBeNull();
    });

    test('Тест экшена ошибки после запроса ленты', () => {
      const store = setupStore();
      store.dispatch({
        type: getFeedThunk.rejected.type,
        error: { message: mockedError }
      });
      const state = store.getState();
      expect(state.feed.isLoading).toBeFalsy();
      expect(state.feed.error).toBe(mockedError);
    });

    test('Тест экшена успешного ответа получения ленты', () => {
      const store = setupStore();
      store.dispatch({
        type: getFeedThunk.fulfilled.type,
        payload: mockedFeedPayload
      });
      const state = store.getState();
      expect(state.feed.isLoading).toBeFalsy();
      expect(state.feed.error).toBeNull();
      expect(state.feed.orders).toEqual(mockedFeedPayload.orders);
      expect(state.feed.total).toBe(mockedFeedPayload.total);
      expect(state.feed.totalToday).toBe(mockedFeedPayload.totalToday);
    });
  });

  describe('Тесты экшена получения ленты ЛК', () => {
    test('Тест экшена ожидания ответ после запроса ленты', () => {
      const store = setupStore();
      store.dispatch({ type: getOrdersThunk.pending.type });
      const state = store.getState();
      expect(state.feed.isLoading).toBeTruthy();
      expect(state.feed.error).toBeNull();
    });

    test('Тест экшена ошибки после запроса ленты', () => {
      const store = setupStore();
      store.dispatch({
        type: getOrdersThunk.rejected.type,
        error: { message: mockedError }
      });
      const state = store.getState();
      expect(state.feed.isLoading).toBeFalsy();
      expect(state.feed.error).toBe(mockedError);
    });

    test('Тест экшена успешного ответа получения ленты', () => {
      const store = setupStore();
      store.dispatch({
        type: getOrdersThunk.fulfilled.type,
        payload: mockedOrdersPayload
      });
      const state = store.getState();
      expect(state.feed.isLoading).toBeFalsy();
      expect(state.feed.error).toBeNull();
      expect(state.feed.orders).toEqual(mockedOrdersPayload);
    });
  });
});
