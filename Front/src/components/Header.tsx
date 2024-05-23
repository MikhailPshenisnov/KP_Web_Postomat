import {FaCartShopping} from "react-icons/fa6";
import {useState} from "react";
import {NavLink} from "react-router-dom";
import {Order} from "./Order.tsx";
import {CartStringToPokedex} from "../App.tsx";
import {AuthState} from "../redux/AuthSlice.tsx";
import {ProductsState} from "../redux/ProductsSlice.tsx";


const showOrders = (props: CartProps) => {
    let total = 0;
    CartStringToPokedex(props.authState.cart, props.productsState.products).map(order => (total += order.price));
    return (
        <div>
            {CartStringToPokedex(props.authState.cart, props.productsState.products).map(order => (
                <Order key={order.id} product={order} onDelete={props.onDelete}/>
            ))}
            <p className='total'>Итого: {new Intl.NumberFormat().format(total)}$</p>
        </div>
    )
}

const showEmptyCart = () => {
    return (
        <div className="empty-cart">
            <h2>Корзина пуста</h2>
        </div>
    )
}

type CartProps = {
    authState: AuthState,
    productsState: ProductsState,
    onDelete: (deleteItemId: number) => void,
};

export default function Header(props: CartProps) {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <header>
            <div>
                <span className="logo">
                    <NavLink to={"/home"} style={{textDecoration: "none", color: "black"}}>Whatever u need</NavLink>
                </span>
                <ul className="nav">
                    <li>
                        <NavLink to={"/about"} style={{textDecoration: "none", color: "black"}}>О нас</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/contacts"} style={{textDecoration: "none", color: "black"}}>Контакты</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/login"} style={{textDecoration: "none", color: "black"}}>
                            {!props.authState.isLoggedIn && (
                                <>Личный кабинет</>
                            )}
                            {props.authState.isLoggedIn && (
                                <>{props.authState.username}</>
                            )}

                        </NavLink>
                    </li>
                </ul>
                <FaCartShopping className={`cart ${isCartOpen && "active"}`}
                                onClick={() => setIsCartOpen(!isCartOpen)}/>
                {isCartOpen && (
                    <div className="cart-panel">
                        {CartStringToPokedex(props.authState.cart, props.productsState.products).length > 0 ? showOrders(props) : showEmptyCart()}
                    </div>
                )}
            </div>
            <div className="presentation"/>
        </header>
    )
}