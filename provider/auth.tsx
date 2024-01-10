import { ReactNode, createContext, useContext, useEffect, useState } from "react"

type User = {
    username : string,
    role : string,
    email : string

}


type AuthContextType ={
    user : null | User,
    loading : boolean,
    login : ({email, password} : {email : string, password : string}, callback : (str : string) => void) => void,
    register : ({username, password, email, repassword} : {username : string, password : string, email : string, repassword : string}, callback : (str : string) => void) => void,
}
export const AuthContext = createContext<AuthContextType>({
    user : null,
    loading : false,
    login : () => {},
    register : () => {}

})

export default function Auth({children} : {children : ReactNode}) {
    const [user, setUser] = useState<null | User>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        try {

        }catch(err) {

        }
    }, [])

    async function login({email, password}, callback : (str : string) => void) {
        try {
            setUser({
                username : "Frasydi",
                email : "Frasydi137@Gmail.com",
                role : ""
            })
        }catch(err) {
            console.log(err)
        }
    }
    async function register({username, password, email, repassword}, callback : (str : string) => void) {
        try {
            setUser({
                username : "Frasydi",
                email : "Frasydi137@Gmail.com",
                role : ""
            })
        }catch(err) {
            console.log(err)
        }
    }
    useEffect(() => {
    }, [])

    return(
        <AuthContext.Provider value={{
            user, loading, login, register
        }}>
            {children}
        </AuthContext.Provider>
    )
}