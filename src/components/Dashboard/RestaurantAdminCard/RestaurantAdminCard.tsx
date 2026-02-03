'use client'
import type { ActionTypeModalProps, SetCategorySelectedProps } from "@/types"
import { useEffect, useState } from "react"
import { RestaurantPayload } from "@/services/restaurants"
import {
    CategoryModal,
    ImageModal,
    CreateRestaurantCategoryForm,
    RestaurantHeader,
    RestaurantMenu
} from "@/components/Dashboard"
import { Button } from "../../ui/button"

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

            {open && !actionModalType && !categorySelected && (
                <ImageModal
                    open
                    onClose={closeModalHandler}
                    restaurantId={id}
                />
            )}

            <RestaurantHeader
                image={image}
                name={name}
                wifi_name={wifiName}
                wifi_pass={wifiPass}
                restaurantId={id}
                mode="ADMIN"
                setOpen={setOpen}
            />

            <div className="mt-4 px-4">
                <Button
                    className="cursor-pointer"
                    onClick={showAddNewCategoryHandler}>
                    {showAddNewCategory ? 'Ocultar' : 'Crear Categoria'}
                </Button>

                {showAddNewCategory && (
                    <CreateRestaurantCategoryForm restaurantId={id} />
                )}
            </div>

            <RestaurantMenu
                menu={menuCategories}
                mode='ADMIN'
                setOpen={setOpen}
                setActionModalType={setActionModalType}
                setCategorySelected={setCategorySelected}
                restaurantId={id}
            />
        </>
    )
}
