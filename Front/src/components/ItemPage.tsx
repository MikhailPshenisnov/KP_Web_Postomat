import {Pokedex} from "./Pokedex.tsx";

type ItemPageProps = {
    product: Pokedex,
    onAdd: (product: Pokedex) => void,
    onShowItemPage: (product: Pokedex) => void
};

export function ItemPage(props: ItemPageProps) {
    return (
        <div className="one-item">
            <div>
                <img src={props.product.image} alt={props.product.title}
                     onClick={() => props.onShowItemPage(props.product)}/>
                <h2>{props.product.title}</h2>
                <p>{props.product.description}</p>
                <b>{props.product.price}$</b>
                <div className="add-to-cart" onClick={() => props.onAdd(props.product)}>+</div>
            </div>
        </div>
    )
}