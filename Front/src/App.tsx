import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import {Category, Pokedex} from "./components/Pokedex.tsx";
import {useEffect, useState} from "react";
import './index.css';
import Items from "./components/Items.tsx";
import {Categories} from "./components/Categories.tsx";
import {ItemPage} from "./components/ItemPage.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "./components/LoginPage.tsx";
import {PersonalPage} from "./components/PersonalPage.tsx";
import {CurUserType} from "./components/UsernameType.tsx";
import {useAppDispatch, useAppSelector} from "./redux/Hooks.tsx";
import {setIsLoggedIn, setUsername, setCart} from "./redux/AuthSlice.tsx";
import {setProducts} from "./redux/ProductsSlice.tsx";
import {GetProductsApi, GetUserApi, SetEmptyCookiesApi, UpdateUserCartApi} from "./api/AppApi.tsx";

export const PokedexToCartString = (cartPokedex: Pokedex[]) => {
    let result = '';
    for (let i = 0; i < cartPokedex.length; i++) {
        result += cartPokedex[i].id.toString();
        if (i !== cartPokedex.length - 1) {
            result += ';';
        }
    }
    return result;
}

export const CartStringToPokedex = (cartString: string, products: Pokedex[]) => {
    const result: Pokedex[] = [];
    const cart: string[] = cartString.split(';')
    for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < products.length; j++) {
            if (Number(cart[i]) === products[j].id) {
                result.push(products[j]);
                break;
            }
        }
    }
    return result;
}

export function App() {
    const products = useAppSelector((state) => state.products);
    const auth = useAppSelector((state) => state.auth)

    const [tmpProducts, setTmpProducts] = useState<Pokedex[]>([]);
    const [tmpUserData, setTmpUserData] = useState<CurUserType>({username: "", cart: ""});

    const [curCategory, setCurCategory] = useState<Category>(Category.All);
    const [curProducts, setCurProducts] = useState<Pokedex[]>([]);

    const [isOneItemMode, setIsOneItemMode] = useState<boolean>(false);
    const [curOneItem, setCurOneItem] = useState<Pokedex>();

    const dispatch = useAppDispatch();

    useEffect(() => {
        SetEmptyCookiesApi();

        GetProductsApi().then((res) => {
            setTmpProducts(res.data);
        });

        GetUserApi().then((res) => {
            setTmpUserData(res.data);
        });
    }, [])

    useEffect(() => {
        dispatch(setProducts(tmpProducts))
    }, [tmpProducts]);

    useEffect(() => {
        dispatch(setUsername(tmpUserData.username));
        dispatch(setCart(tmpUserData.cart));
        if (tmpUserData.username != "") {
            dispatch(setIsLoggedIn(true));
        } else {
            dispatch(setIsLoggedIn(false));
        }
    }, [tmpUserData]);

    useEffect(() => {
        UpdateUserCartApi(auth.cart).then((res) => {
            if (res.data !== "") {
                console.log(res.data);
            }
        })
    }, [auth.cart]);

    useEffect(() => {
        if (curCategory === Category.All) {
            setCurProducts(products.products);
        } else {
            setCurProducts(products.products.filter(el => el.category === curCategory));
        }
    }, [curCategory, products.products]);

    function addToOrder(newItem: Pokedex) {
        const orders = CartStringToPokedex(auth.cart, products.products);
        let flag = false;
        orders.map((oldItem: Pokedex) => {
            if (oldItem.id === newItem.id) {
                flag = true;
            }
        })
        if (!flag) {
            orders.push(newItem);
            dispatch(setCart(PokedexToCartString(orders)));
        }
    }

    function deleteFromOrder(deleteItemId: number) {
        let orders = CartStringToPokedex(auth.cart, products.products);
        orders = orders.filter(el => el.id !== deleteItemId);
        dispatch(setCart(PokedexToCartString(orders)));
    }

    function chooseCategory(category: Category) {
        setCurCategory(category);
    }

    function ShowItemPage(product: Pokedex) {
        setIsOneItemMode(!isOneItemMode);
        setCurOneItem(product);
    }

    return (
        <div className='wrapper'>
            <BrowserRouter>
                <Header authState={auth} productsState={products} onDelete={deleteFromOrder}/>
                <Routes>
                    <Route path="/" element={<Navigate to="/home"/>}/>

                    <Route path="/home" element={
                        <>
                            <Categories chooseCategory={chooseCategory}/>
                            <Items curData={curProducts} onAdd={addToOrder} onShowItemPage={ShowItemPage}/>
                            {isOneItemMode && (
                                <ItemPage product={curOneItem!} onAdd={addToOrder} onShowItemPage={ShowItemPage}/>)}
                        </>
                    }/>
                    <Route path="/about" element={
                        <div className="about">
                            <h2>О нас</h2>
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
                    <Route path="/contacts" element={
                        <div className="contacts">
                            <h2>Контакты</h2>
                            <h3>Email: buy-me-a-cup-of-coffee@please.com</h3>
                            <h3>Телефон: 8(800)555-35-35</h3>
                        </div>
                    }/>
                    <Route path="/login" element={
                        <LoginPage/>
                    }/>
                    <Route path="/personal_page" element={
                        <PersonalPage/>
                    }/>

                    <Route path="*" element={<Navigate to="/home"/>}/>
                </Routes>

                <Footer/>
            </BrowserRouter>
        </div>
    )
}

export default App;
