import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FunctionComponent } from 'react';
import Home from './features/home/Home';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { Container } from 'react-bootstrap';

type AppProps = {};

library.add(fas, far);

const App: FunctionComponent<AppProps> = () => (
    <div className="App">
        <Container fluid>
            <Home />
        </Container>
    </div>
);

export default App;
