import {Pokedex} from "./Pokedex.tsx";

type ItemProps = {
    product: Pokedex,
    onAdd: (newItem: Pokedex) => void,
    onShowItemPage: (p: Pokedex) => void
};

export function Item(props: ItemProps) {
    return (
        <div className="item">
            <img src={props.product.image} alt={props.product.title}
                 onClick={() => props.onShowItemPage(props.product)}/>
            <h2>{props.product.title}</h2>
            <p>{props.product.description}</p>
            <b>{props.product.price}$</b>
            <div className="add-to-cart" onClick={() => props.onAdd(props.product)}>+</div>
        </div>
    )
}