import * as React from 'react';
import Main from './Main';
import Join from './Join';
import DaumPostcode from 'react-daum-postcode';

const App = () => {
    return (
        <div>
            <Main />
            <Join />
        </div>
    );
};

export default App;