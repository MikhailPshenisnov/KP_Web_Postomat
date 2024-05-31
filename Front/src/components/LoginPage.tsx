import {useAppDispatch, useAppSelector} from "../redux/Hooks.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {CheckAccessLvlApi, GetUserApi, LoginUserApi, LogoutUserApi} from "../api/AppApi.tsx";
import {setAccessLvl, setIsLoggedIn, setLogin} from "../redux/UserSlice.tsx";

type LoginPageProps = {
    path: string;
    accessLvl: number;
};

export function LoginPage(props: LoginPageProps) {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    const navigate = useNavigate();

    const [lgn, setLgn] = useState<string>("");
    const [pswd, setPswd] = useState<string>("");

    const [errorMessage, setErrorMessage] = useState<string>("");

    const [flag, setFlag] = useState<boolean>(false);

    const [tmpUserData, setTmpUserData] = useState<{ login: string }>({login: user.login});
    const [tmpAccessLvl, setTmpAccessLvl] = useState<{ accessLvl: string }>({accessLvl: user.accessLvl.toString()});

    useEffect(() => {
        if (flag) {
            navigate(props.path);
        }
    }, [flag]);

    useEffect(() => {
        dispatch(setLogin(tmpUserData.login));
        if (tmpUserData.login !== "") {
            dispatch(setIsLoggedIn(true));
        } else {
            dispatch(setIsLoggedIn(false));
        }
    }, [tmpUserData]);

    useEffect(() => {
        dispatch(setAccessLvl(parseInt(tmpAccessLvl.accessLvl)));
    }, [tmpAccessLvl]);

    useEffect(() => {
        if (user.isLoggedIn) {
            if (user.accessLvl >= props.accessLvl) {
                setFlag(true);
            } else {
                LogoutUserApi().then(() => {
                    GetUserApi().then((res) => {
                        setTmpUserData({login: ""});
                        setTmpUserData(res.data);
                    });
                }).then(() => {
                    CheckAccessLvlApi().then((res) => {
                        setTmpAccessLvl({accessLvl: "-2"});
                        setTmpAccessLvl(res.data);
                    });
                });

                setFlag(false);
            }
        } else {
            setFlag(false);
        }
    }, [user.accessLvl]);

    return (
        <div className="login-page">
            <div className="err-message">
                {errorMessage !== "" && (
                    <b>{errorMessage}</b>
                )}
            </div>
            <input className="login-input" type="text" placeholder="Логин..."
                   onChange={(e) => setLgn(e.target.value)}/>
            <input className="password-input" type="password" placeholder="Пароль..."
                   onChange={(e) => setPswd(e.target.value)}/>
            <div className="login-btn" onClick={() => {
                LoginUserApi(lgn, pswd).then((res) => {
                    if (res.data !== "") {
                        setErrorMessage(res.data);
                    } else {
                        setErrorMessage("");
                        GetUserApi()
                            .then((res) => {
                                setTmpUserData({login: ""});
                                setTmpUserData(res.data);
                            });
                        CheckAccessLvlApi().then((res) => {
                            setTmpAccessLvl({accessLvl: "-2"});
                            setTmpAccessLvl(res.data);
                        });
                    }
                });
            }}>
                <h2>Войти</h2>
            </div>
        </div>

    )
}