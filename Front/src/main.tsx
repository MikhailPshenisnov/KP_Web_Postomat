import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./redux/Store.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App/>
    </Provider>
)
