'use client'
import type { ActionTypeModalProps, SetCategorySelectedProps } from "@/types"
import { useEffect, useState } from "react"
import { RestaurantPayload } from "@/services/restaurants"
import { CreateRestaurantCategory } from "../CreateRestaurantCategory/CreateRestaurantCategory"
import { Button } from "../ui/button"
import { CategoryModal } from "../CategoryModal/CategoryModal"
import { RestaurantHeader } from "../RestaurantHeader/RestaurantHeader"
import { RestaurantMenu } from "../RestaurantMenu/RestaurantMenu"

export const RestaurantAdminCard = ({
    name,
    image,
    menuCategories,
    wifiName,
    wifiPass,
    id
}: RestaurantPayload) => {

    const [open, setOpen] = useState<boolean>(false)
    const [showAddNewCategory, setShowAddNewCategory] = useState<boolean>(false)
    const [actionModalType, setActionModalType] = useState<ActionTypeModalProps>(null)
    const [categorySelected, setCategorySelected] = useState<SetCategorySelectedProps | null>(null)

    const showAddNewCategoryHandler = () => {
        setShowAddNewCategory(prevState => !prevState)
    }

    const closeModalHandler = () => {
        setOpen(false)
        setCategorySelected(null)
    }

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <>
            {open && actionModalType && categorySelected && (
                <CategoryModal
                    open
                    categoryId={categorySelected.id}
                    restaurantId={id}
                    categoryName={categorySelected.name}
                    dishesCount={categorySelected?.dishesCount || 0}
                    actionType={actionModalType}
                    onClose={closeModalHandler}
                />
            )}

            <RestaurantHeader
                image={image}
                name={name}
                wifi_name={wifiName}
                wifi_pass={wifiPass}
                restaurantId={id}
                mode="ADMIN"
            />

            <div className="mt-4">
                <Button
                    className="cursor-pointer"
                    onClick={showAddNewCategoryHandler}>
                    {showAddNewCategory ? 'Ocultar' : 'Crear Categoria'}
                </Button>

                {showAddNewCategory && (
                    <CreateRestaurantCategory restaurantId={id} />
                )}
            </div>

            <RestaurantMenu
                menu={menuCategories}
                mode='ADMIN'
                setOpen={setOpen}
                setActionModalType={setActionModalType}
                setCategorySelected={setCategorySelected}
            />
        </>
    )
}
