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
import {DeliveryPage} from "./components/DeliveryPage.tsx";

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
                            <h1>Популярные вопросы:</h1>
                            <br/><br/>

                            <h2>1) Получение заказа:</h2>
                            <br/>
                            <h3>Для получения заказа нажмите на большую кнопку "Получить заказ" на экране.</h3>
                            <br/>
                            <h3>Перейдя таким образом в раздел получения заказа, введите код, который вы получили для
                                получения заказа, и нажмите на кнопку под полем ввода.</h3>
                            <br/>
                            <h3>Если возникнет ошибка - вы увидите соответствующее сообщение. Чаще всего проблема в
                                ошибке в коде для получении заказа, пожалуйста перепроверьте его.</h3>
                            <br/><br/>

                            <h2>2) Доставка заказов:</h2>
                            <br/>
                            <h3>Для доставки заказа нажмите кнопку "Доставка" вверху справа.</h3>
                            <br/>
                            <h3>Перейдя таким образом в меню входа в раздел доставки заказов, войдите в свой аккаунт
                                сотрудника.</h3>
                            <br/>
                            <h3>После успешного входа, вы будете перенаправлены в меню доставки заказов. Здесь вы можете
                                ввести данные о доставляемом заказе и разместить его в постамат.</h3>
                            <br/>
                            <h3>Если возникнут какие-либо ошибки - вы увидите соответствующее сообщение. Если проблема в
                                сведениях заказа, то перепроверьте их корректность еще раз. Если же нет доступных ячеек,
                                то свяжитесь с администратором системы по телефону 8(800)555-35-35, и сообщите о данной
                                проблеме.</h3>
                            <br/>
                            <h3>Доставив заказ, не забывайте выйти из аккаунта. Хоть этот процесс и проиходит
                                автоматически после перехода в любой раздел, кроме раздела поддержки, все равно стоит
                                проверять корректность выхода, от этого зависит безопасность заказов пользователей.</h3>
                            <br/><br/>
                        </div>
                    }/>

                    <Route path="/delivery" element={
                        <DeliveryPage/>
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
