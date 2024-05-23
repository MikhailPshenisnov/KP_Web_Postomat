import {Category} from "./Pokedex.tsx";

type CategoriesProps = {
    chooseCategory: (category: Category) => void
};

export function Categories(props: CategoriesProps) {
    return (
        <div className="categories">
            {Object.entries(Category).map(x => (
                <div key={x[0]} onClick={() => props.chooseCategory(x[1])}>
                    {x[1].charAt(0).toUpperCase() + x[1].slice(1)}
                </div>
            ))}
        </div>
    )
}