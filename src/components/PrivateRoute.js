import { useSelector } from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

// import LoadingPage from './common/LoadingPage';

const PrivateRoute = ({component: Component, guest, ...rest}) => {
    const {isAuthenticated} = useSelector(state => state.auth);

    // if(isLoading) return <LoadingPage />;
    
    if(guest){
        return <Route {...rest} render={props => isAuthenticated ? <Redirect to="/" /> : <Component {...props} />} />
    }
    // Private
    return <Route {...rest} render={props => isAuthenticated ? <Component {...props} /> : <Redirect to="/auth/login" />} />
};

export default PrivateRoute;