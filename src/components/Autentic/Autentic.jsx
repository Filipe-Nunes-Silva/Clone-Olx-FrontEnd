import { Navigate } from "react-router-dom";
import { isLogged } from "../../helpers/AuthHandler";


export const Autentic = ({children}) =>{

    const isAuth = isLogged();

    if(isAuth){
        return(
            children
        );
    }
    else{
        return <Navigate to='/signin'/>;
    };
};