import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {UserState} from "../redux/UserSlice.tsx";
import {useAppSelector} from "../redux/Hooks.tsx";

type HeaderProps = {
    userState: UserState
};

export function Header(props: HeaderProps) {
    const user = useAppSelector((state) => state.user);
    const [isAdminMode, setIsAdminMode] = useState(false);

    useEffect(() => {
        if (user.isLoggedIn) {
            if (user.accessLvl > 0) {
                setIsAdminMode(true);
            } else {
                setIsAdminMode(false);
            }
        }
    }, [user.accessLvl])

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
                        <NavLink to={"/deliverylogin"} style={{textDecoration: "none", color: "black"}}>Доставка</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/adminlogin"} style={{textDecoration: "none", color: "black"}}>
                            {(!props.userState.isLoggedIn && !(props.userState.accessLvl > 0)) && (
                                <>Панель администратора</>
                            )}
                            {props.userState.isLoggedIn && (
                                <>{props.userState.login}</>
                            )}
                        </NavLink>
                    </li>
                </ul>
                {isAdminMode && (
                    <div className="admin-mode-warn">
                        <p>ADMIN MODE</p>
                    </div>
                )}
            </div>
        </header>
    )
}