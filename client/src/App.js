import React from 'react';
import 'materialize-css';
import {useRoutes} from './routes';
import {BrowserRouter as Router} from 'react-router-dom'
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';
import {NavBar} from './components/navbar';
import {Loader} from './components/loader';

function App() {
    const {token, login, logOut, userId, ready} = useAuth();
    const isAuth  = !!token;
    const routes = useRoutes(isAuth);

    if(!ready) {
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{
            token, login, logOut, userId, isAuth
        }}>
            <Router>
                <div className="container">
                    {isAuth && <NavBar/>}
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
  );
}

export default App;
