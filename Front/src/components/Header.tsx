import {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {setAccessLvl, setIsLoggedIn, setLogin, UserState} from "../redux/UserSlice.tsx";
import {useAppDispatch, useAppSelector} from "../redux/Hooks.tsx";
import {CheckAccessLvlApi, GetUserApi, LogoutUserApi} from "../api/AppApi.tsx";

type HeaderProps = {
    userState: UserState
};

export function Header(props: HeaderProps) {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [tmpUserData, setTmpUserData] = useState<{ login: string }>({login: user.login});
    const [tmpAccessLvl, setTmpAccessLvl] = useState<{ accessLvl: string }>({accessLvl: user.accessLvl.toString()})


    useEffect(() => {
        if (user.isLoggedIn) {
            if (user.accessLvl > 0) {
                setIsAdminMode(true);
            } else {
                setIsAdminMode(false);
            }
        }
    }, [user.accessLvl])

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
        <header>
            <div>
                <span className="logo">
                    <NavLink to={"/home"} style={{textDecoration: "none", color: "black"}}>Маркетплейс "Nozo"</NavLink>
                </span>
                <ul className="nav">
                    <li>
                        <NavLink to={"/help"} style={{textDecoration: "none", color: "black"}}>Помощь</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/deliverylogin"}
                                 style={{textDecoration: "none", color: "black"}}>Доставка</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/adminlogin"} style={{textDecoration: "none", color: "black"}}>
                            {(!props.userState.isLoggedIn || !(props.userState.accessLvl > 0)) && (
                                <>Панель администратора</>
                            )}
                            {(props.userState.isLoggedIn && props.userState.accessLvl > 0) && (
                                <>{props.userState.login}</>
                            )}
                        </NavLink>
                    </li>
                </ul>
                {isAdminMode && (
                    <div className="admin-mode-warn" onClick={() => {
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
                        setIsAdminMode(false);
                        navigate("/home");
                    }}>
                        <p>ADMIN MODE</p>
                    </div>
                )}
            </div>
        </header>
    )
}