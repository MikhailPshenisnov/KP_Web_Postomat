import {Button, Form} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../redux/Hooks.tsx";
import {setCart, setIsLoggedIn, setUsername} from "../redux/AuthSlice.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {GetUserApi, LoginUserApi, RegisterUserApi} from "../api/AppApi.tsx";
import {CurUserType} from "./UsernameType.tsx";


export function LoginPage() {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const [usrnm, setUsrnm] = useState<string>("");
    const [pswd, setPswd] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [tmpUserData, setTmpUserData] = useState<CurUserType>({username: auth.username, cart: auth.cart});

    useEffect(() => {
        if (auth.isLoggedIn) {
            navigate("/personal_page")
        }
    }, [auth.isLoggedIn]);

    useEffect(() => {
        dispatch(setUsername(tmpUserData.username));
        dispatch(setCart(tmpUserData.cart));
        if (tmpUserData.username != "") {
            dispatch(setIsLoggedIn(true));
        } else {
            dispatch(setIsLoggedIn(false));
        }
    }, [tmpUserData]);

    return (
        <Form id="loginform">
            <Form.Group className="mb-3">
                <div className="login_password_group">
                    <div className="text_labels">
                        <div className="login_label">
                            <Form.Control id="usernameText" type="login" placeholder="Enter username..." onChange={
                                (e) => setUsrnm(e.target.value)
                            }/>
                        </div>
                        <div className="password_label">
                            <Form.Control id="passwordText" type="password" placeholder="Enter password..." onChange={
                                (e) => setPswd(e.target.value)
                            }/>
                        </div>
                    </div>

                    <div className="err_label">
                        {errorMessage !== "" && (
                            <b>{errorMessage}</b>
                        )}
                    </div>
                </div>
            </Form.Group>

            <div className="button_group">
                <Button variant="primary" type="button" onClick={() => {
                    LoginUserApi(usrnm, pswd)
                        .then((res) => {
                            if (res.data !== "") {
                                setErrorMessage(res.data)
                            } else {
                                setErrorMessage("")
                                GetUserApi()
                                    .then((res) => {
                                        setTmpUserData(res.data);
                                    });
                            }
                        });
                }}>Login</Button>

                <Button variant="primary" type="button" onClick={() => {
                    RegisterUserApi(usrnm, pswd)
                        .then((res) => {
                            if (res.data !== "") {
                                setErrorMessage(res.data)
                            } else {
                                setErrorMessage("")
                                GetUserApi()
                                    .then((res) => {
                                        setTmpUserData(res.data);
                                    });
                            }
                        });
                }}>Register</Button>
            </div>
        </Form>
    )
}