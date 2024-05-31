import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/Hooks.tsx";
import {useEffect, useState} from "react";
import {CheckAccessLvlApi, GetUserApi, LogoutUserApi} from "../api/AppApi.tsx";
import {setAccessLvl, setIsLoggedIn, setLogin} from "../redux/UserSlice.tsx";

export function StartPage() {
    const navigate = useNavigate();

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
        <div className="start-banner">
            <div className="go-to-get-order" onClick={() => navigate("/receive")}>
                <h2>Получить заказ</h2>
            </div>
        </div>
    )
}