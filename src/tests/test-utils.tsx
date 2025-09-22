import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { configureStore } from '@reduxjs/toolkit';
import billsReducer from '../store/billsSlice';
import i18n from './test-i18n';

export function renderWithProviders(ui: React.ReactElement) {
  const store = configureStore({
    reducer: { bills: billsReducer },
  });

  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
    </Provider>
  );
}
