import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Authorization({unAuth, children}) {

    const dispatch = useDispatch();


    const [isAuth, setUser] = useState(null);
    
    
    
    //const user = useSelector(state => state.users.user);
    // console.log(user,isAuth);
    
    useEffect(() => {
        //setUser(!!JSON.parse(sessionStorage.getItem('user')));
       // console.log(isAuth,JSON.parse(sessionStorage.getItem('user')));
    },[])
    
    if (isAuth === null) return null;
    return isAuth === false ? {...children} : {...unAuth};
}
