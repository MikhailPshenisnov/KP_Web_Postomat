import {Pokedex} from "./Pokedex.tsx";
import {FaTrash} from "react-icons/fa6";

type OrderProps = {
    product: Pokedex,
    onDelete: (deleteItemId: number) => void
};

export function Order(props: OrderProps) {
    return (
        <div className="item">
            <img src={props.product.image} alt={props.product.title}/>
            <h2>{props.product.title}</h2>
            <p>{props.product.price}$</p>
            <FaTrash className="delete-product" onClick={() => props.onDelete(props.product.id)}/>
        </div>
    );
}

export default Order;