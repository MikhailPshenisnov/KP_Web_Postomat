import {Header} from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import './index.css';
import {useEffect, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./redux/Hooks.tsx";
import {setLogin, setIsLoggedIn, setAccessLvl} from "./redux/UserSlice.tsx";
import {CheckAccessLvlApi, GetUserApi, SetEmptyCookiesApi} from "./api/AppApi.tsx";
import {StartPage} from "./components/StartPage.tsx";
import {ReceivePage} from "./components/ReceivePage.tsx";
import {LoginPage} from "./components/LoginPage.tsx";

export function App() {
    const user = useAppSelector((state) => state.user);
    const [tmpUserData, setTmpUserData] = useState<{ login: string }>({login: user.login});
    const dispatch = useAppDispatch();
    const [tmpAccessLvl, setTmpAccessLvl] = useState<{ accessLvl: string }>({accessLvl: user.accessLvl.toString()})


    useEffect(() => {
        SetEmptyCookiesApi();
        GetUserApi().then((res) => {
            setTmpUserData(res.data);
        });
        CheckAccessLvlApi().then((res) => {
            setTmpAccessLvl(res.data);
        })
    }, [])

    useEffect(() => {
        dispatch(setLogin(tmpUserData.login));
        console.log(`"${tmpUserData.login}"`)
        if (tmpUserData.login != "") {
            dispatch(setIsLoggedIn(true));
        } else {
            dispatch(setIsLoggedIn(false));
        }
    }, [tmpUserData]);

    useEffect(() => {
        dispatch(setAccessLvl(parseInt(tmpAccessLvl.accessLvl)));
    }, [tmpAccessLvl]);


    return (
        <div className='wrapper'>
            <BrowserRouter>
                <Header userState={user}/>
                <Routes>
                    <Route path="/" element={<Navigate to="/home"/>}/>

                    <Route path="/home" element={
                        <StartPage/>
                    }/>

                    <Route path="/receive" element={
                        <ReceivePage/>
                    }/>

                    <Route path="/help" element={
                        <div className="help">
                            <h2>Популярные вопросы:</h2>
                            <h3>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt faucibus
                                tincidunt.
                                Nulla auctor rutrum sapien, vel cursus tortor elementum blandit. Suspendisse pulvinar
                                eget
                                lorem sit amet tincidunt. Nunc vitae eleifend urna. In vitae posuere risus, eget
                                suscipit
                                lacus.
                                Praesent diam tellus, iaculis vel pulvinar quis, consequat eu nulla. Vestibulum non
                                accumsan
                                metus. Fusce tellus ipsum, volutpat eget ligula nec, fermentum posuere velit. Phasellus
                                vitae enim
                                mi.
                            </h3>
                        </div>
                    }/>

                    <Route path="/delivery" element={
                        <>
                            {/*<LoginPage/>*/}
                            {/* КНОПКА ПОЛУЧИТЬ ЗАКАЗ*/}
                        </>
                    }/>

                    <Route path="/deliverylogin" element={
                        <LoginPage path="/delivery" accessLvl={0}/>
                    }/>

                    <Route path="/admin" element={
                        <>
                            {/*<PersonalPage/>*/}
                            {/* КНОПКА ПОЛУЧИТЬ ЗАКАЗ*/}
                        </>
                    }/>

                    <Route path="/adminlogin" element={
                        <LoginPage path="/admin" accessLvl={1}/>
                    }/>

                    <Route path="*" element={<Navigate to="/home"/>}/>
                </Routes>

                <Footer/>
            </BrowserRouter>
        </div>
    )
}

export default App;
