import Cookies from "js-cookie";

export const isLogged = ()=>{
    //Função .get verifica se existe o cookie chamado 'token'
    let token = Cookies.get('token');
    return token !== undefined;
};

export const doLogin = (token,rememberPassword = false)=>{
    if(rememberPassword){
        //Função .set cria um cookie novo
        Cookies.set( 'token',token,{ expires:30 });
        //Com esse parametro expires podemos dizer quantos dias esse cookie dura
    }
    else{
        Cookies.set( 'token',token);
        //Aqui sem o parametro expires o cookir some assim que fechar o navegador
    };
};

export const doLogout = ()=>{
    Cookies.remove('token');
};