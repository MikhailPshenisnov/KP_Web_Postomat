import {useEffect, useState} from "react";
import {CheckAccessLvlApi, DeliverOrderApi, GetUserApi, LogoutUserApi} from "../api/AppApi.tsx";
import {useAppDispatch, useAppSelector} from "../redux/Hooks.tsx";
import {setAccessLvl, setIsLoggedIn, setLogin} from "../redux/UserSlice.tsx";
import {useNavigate} from "react-router-dom";

export function DeliveryPage() {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [secretCode, setSecretCode] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [size, setSize] = useState<string>("");

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    const [tmpUserData, setTmpUserData] = useState<{ login: string }>({login: user.login});
    const [tmpAccessLvl, setTmpAccessLvl] = useState<{ accessLvl: string }>({accessLvl: user.accessLvl.toString()});

    const navigate = useNavigate();

    useEffect(() => {
        GetUserApi().then((res) => {
            setTmpUserData(res.data);
        });
        CheckAccessLvlApi().then((res) => {
            setTmpAccessLvl(res.data);
        })
    }, [])

    useEffect(() => {
        dispatch(setLogin(tmpUserData.login));
        console.log(`"${tmpUserData.login}"`);
        if (tmpUserData.login != "") {
            dispatch(setIsLoggedIn(true));
        } else {
            dispatch(setIsLoggedIn(false));
        }
    }, [tmpUserData]);

    useEffect(() => {
        dispatch(setAccessLvl(parseInt(tmpAccessLvl.accessLvl)));
        if (parseInt(tmpAccessLvl.accessLvl) < 1) {
            navigate("/adminlogin");
        }
    }, [tmpAccessLvl]);

    return (
        <div className="delivery-page">
            <div className="err-message">
                {errorMessage !== "" && (
                    <b>{errorMessage}</b>
                )}
            </div>
            <input className="secret-code-input" type="text" placeholder="Введите код получения заказа..."
                   onChange={(e) => setSecretCode(e.target.value)}/>
            <input className="description-input" type="text" placeholder="Введите описание..."
                   onChange={(e) => setDescription(e.target.value)}/>
            <input className="size-input" type="text" placeholder="Введите размер заказа..."
                   onChange={(e) => setSize(e.target.value)}/>
            <div className="deliver-order" onClick={() => {
                DeliverOrderApi(secretCode, description, parseInt(size)).then((res) => {
                    if (res.data !== "") {
                        setErrorMessage(res.data);
                    } else {
                        setErrorMessage("Заказ доставлен успешно");
                    }
                });

            }}>
                <h2>Доставить заказ</h2>
            </div>
            <div className="logout-delivery" onClick={() => {
                LogoutUserApi().then(() => {
                    GetUserApi().then((res) => {
                        setTmpUserData(res.data);
                    });
                }).then(() => {
                    CheckAccessLvlApi().then((res) => {
                        setTmpAccessLvl(res.data);
                    });
                });
            }}>
                <h2>Выйти из аккаунта</h2>
            </div>
        </div>
    )
}