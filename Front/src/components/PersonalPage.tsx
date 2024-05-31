// import {Button} from "react-bootstrap";
// import {useAppDispatch, useAppSelector} from "../redux/Hooks.tsx";
// import {setCart, setIsLoggedIn, setUsername} from "../redux/AuthSlice.tsx";
// import {useEffect, useState} from "react";
// import {useNavigate} from "react-router-dom";
// import {GetUserApi, LogoutUserApi} from "../api/AppApi.tsx";
// import {CurUserType} from "./UsernameType.tsx";
//
// export function PersonalPage() {
//     const dispatch = useAppDispatch();
//
//     const auth = useAppSelector((state) => state.auth);
//
//     const navigate = useNavigate();
//
//     const [tmpUserData, setTmpUserData] = useState<CurUserType>({username: auth.username, cart: auth.cart});
//
//     useEffect(() => {
//         dispatch(setUsername(tmpUserData.username));
//         dispatch(setCart(tmpUserData.cart));
//         if (tmpUserData.username != "") {
//             dispatch(setIsLoggedIn(true));
//         } else {
//             dispatch(setIsLoggedIn(false));
//         }
//     }, [tmpUserData]);
//
//     useEffect(() => {
//         if (!auth.isLoggedIn) {
//             navigate("/login")
//         }
//     }, [auth.isLoggedIn]);
//
//     return (
//         <div className="personal-info">
//             <h2>Hello, {auth.username}!</h2>
//             <Button variant="primary" onClick={() => {
//                 LogoutUserApi()
//                     .then(() => {
//                         GetUserApi()
//                             .then((res) => {
//                                 setTmpUserData(res.data);
//                             });
//                     });
//             }}>
//                 Logout
//             </Button>
//         </div>
//     )
// }