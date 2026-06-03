'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '@/src/redux/store';

export function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
