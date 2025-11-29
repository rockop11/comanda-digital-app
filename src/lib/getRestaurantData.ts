export async function getRestaurantData(slug: string) {

    try {
        const data = await import(`@/../public/restaurants/${slug}.json`);
        
        return data.default;
    } catch (error) {
        return null;
    }
}