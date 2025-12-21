export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  restaurantId: number;
}

export interface Dish {
  name: string;
  price: number;
  image?: string | null;
  description?: string | null;
}

export interface MenuCategory {
  id: number;
  category: string;
  dishes: Dish[];
  restaurantId: number;
}

export interface Restaurant {
  id: number;
  slug: string;
  name: string;
  image: string;
  wifiId: number;

  wifi: {
    id: number;
    name: string;
    password: string;
    restaurantId: number | null;
  };
  menuCategories: MenuCategory[];
  users: User[];
}

export type ActionTypeModalProps = 'EDIT' | 'DELETE' | null

export interface SetCategorySelectedProps {
  id: number,
  name: string;
  dishesCount?: number
}

export interface RestaurantHeaderProps {
  restaurantId: number;
  image: string;
  name: string;
  wifi_name: string;
  wifi_pass: string;
  mode: 'PUBLIC' | 'ADMIN'
}