import {Pokedex} from "./Pokedex.tsx";
import {Item} from "./Item.tsx";

type ItemsProps = {
    curData: Pokedex[],
    onAdd: (newItem: Pokedex) => void,
    onShowItemPage: (product: Pokedex) => void
};


export function Items(props: ItemsProps) {
    return (
        <main>
            {props.curData.map((product: Pokedex) => (
                <Item key={product.id} product={product} onAdd={props.onAdd} onShowItemPage={props.onShowItemPage}/>
            ))}
        </main>
    )
}

export default Items;