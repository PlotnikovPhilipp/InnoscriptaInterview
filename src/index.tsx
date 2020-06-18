import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Brain from './brain/brain';
import store from './store';

class App extends React.Component {
    userFigure: string;
    constructor(props: Readonly<{}>) {
        super(props);
        this.userFigure = prompt('For what figure do you want play circle or cross?', '');
    }

    render() {
        return(
            <Provider store={store}>
                <Brain userFigure={this.userFigure}/>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));