import {useEffect, useState} from "react";
import {CheckAccessLvlApi, GetOrderApi, GetUserApi, LogoutUserApi} from "../api/AppApi.tsx";
import {useAppDispatch, useAppSelector} from "../redux/Hooks.tsx";
import {setAccessLvl, setIsLoggedIn, setLogin} from "../redux/UserSlice.tsx";

export function ReceivePage() {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [secretCode, setSecretCode] = useState<string>("");

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    const [tmpUserData, setTmpUserData] = useState<{ login: string }>({login: user.login});
    const [tmpAccessLvl, setTmpAccessLvl] = useState<{ accessLvl: string }>({accessLvl: user.accessLvl.toString()})


    useEffect(() => {
        if (user.accessLvl == 0) {
            LogoutUserApi().then(() => {
                GetUserApi()
                    .then((res) => {
                        setTmpUserData(res.data);
                    });
            }).then(() => {
                CheckAccessLvlApi().then((res) => {
                    setTmpAccessLvl(res.data);
                });
            });
        }
    }, []);

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
        <div className="receive-page">
            <div className="err-message">
                {errorMessage !== "" && (
                    <b>{errorMessage}</b>
                )}
            </div>
            <input className="secret-code-input" type="text" placeholder="Введите код получения заказа..."
                   onChange={(e) => setSecretCode(e.target.value)}/>
            <div className="receive-order" onClick={() => {
                GetOrderApi(secretCode)
                    .then((res) => {
                        if (res.data !== "") {
                            setErrorMessage(res.data)
                        } else {
                            setErrorMessage("Заказ получен успешно");
                        }
                    });
            }}>
                <h2>Получить заказ</h2>
            </div>
        </div>
    )
}