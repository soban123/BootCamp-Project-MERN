import React, { useState, useEffect } from 'react';

import Routes from './Router';
import MyStore from './store';
import { AuthAction } from './store/Actions';

const App = () => {
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token')
    useEffect(() => {
        onDidmount();
    }, [])
    const onDidmount = async () => {
        const userId = await localStorage.getItem('userId')
        if (token && userId) {
            await MyStore.dispatch(AuthAction.autoLogin({ token, _id: userId }));
        }

        setLoading(false)
    }

    if (!loading)
        return <Routes token={token} />
    return <div />
};

export default App;
