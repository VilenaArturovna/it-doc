import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store/store';
import { Provider } from 'react-redux';

import { createRoot } from 'react-dom/client';

import locale from 'antd/locale/ru_RU';
import dayjs from 'dayjs';

import 'dayjs/locale/ru';
import { ConfigProvider } from 'antd';

dayjs.locale('ru');

const root = createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <App />
      </ConfigProvider>
    </Provider>
  </BrowserRouter>,
);
