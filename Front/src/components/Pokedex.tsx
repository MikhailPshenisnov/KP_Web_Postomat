export enum Category {
    All = "all products",
    Electronics = "electronics",
    Jewelery = "jewelery",
    MenSClothing = "men's clothing",
    WomenSClothing = "women's clothing"
}

interface Rating {
    rate: number;
    count: number;
}

export interface Pokedex {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    image: string;
    rating: Rating;
}