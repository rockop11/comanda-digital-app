export interface Dish {
  name: string;
  price: number;
  image?: string;
  description?: string;
}

export interface MenuCategory {
  category: string;
  dishes: Dish[];
}

export interface Restaurant {
  slug: string;
  name: string;
  image: string;
  wifi: {
    name: string;
    password: string;
  };
  theme: {
    primary: string;
    background: string;
    text: string;
  };
  menu: MenuCategory[];
}
