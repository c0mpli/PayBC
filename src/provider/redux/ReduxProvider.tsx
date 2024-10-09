'use client'

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Store } from 'redux';

interface Props {
    children: ReactNode;
}

const ReduxProvider: React.FC<Props> = ({ children }) => {
    return (
        <Provider store={store as Store}>
            {children}
        </Provider>
    );
};

export default ReduxProvider;