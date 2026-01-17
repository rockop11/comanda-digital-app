import { JSX, ReactNode, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { useFormState, useFormStatus } from "react-dom";
import { editUserPassword } from "@/actions/restaurant/editUserPassword/editUserPassword";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Eye, EyeOff } from "lucide-react";
import { toast } from 'react-hot-toast'

const InitialState = {
  success: false,
  error: null
}

const SubmitButton = (): JSX.Element => {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className=" cursor-pointer bg-sky-800 color-white"
      disabled={pending}
    >
      {pending ? <Spinner /> : 'Actualizar'}
    </Button>
  )
}

interface EditRestaurantAdminPasswordFormProps {
  userId: number;
  children: ReactNode;
  onClose: () => void;
}

type PasswordField = 'currentPass' | 'newPass' | 'repeatNewPass';
type PasswordVisibilityState = Record<PasswordField, boolean>;


export const EditRestaurantUserPasswordForm = ({
  userId,
  children,
  onClose
}: EditRestaurantAdminPasswordFormProps): JSX.Element => {

  const { pending } = useFormStatus()
  const [state, action] = useFormState(editUserPassword, InitialState)

  const [passwordVisibility, setPasswordVisibility] =
    useState<PasswordVisibilityState>({
      currentPass: false,
      newPass: false,
      repeatNewPass: false,
    });

  const togglePasswordVisibility = (field: PasswordField) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  useEffect(() => {
    if (state.success && !pending) {
      toast.success('Se actualizó la contraseña', { duration: 3000 })
      onClose()
    }

    if (state.error && !pending) {
      toast.error(state.error, { duration: 3000 })
    }
  }, [state, pending, onClose])

  return (
    <form action={action} className="flex flex-col gap-2">
      <Input type='hidden' value={userId} name='userId' />


      <div className="relative">
        <Input
          type={passwordVisibility.currentPass ? 'text' : 'password'}
          placeholder="Contraseña actual"
          name='currentPass'
          required
        />
        <button
          type='button'
          onClick={() => togglePasswordVisibility('currentPass')}
          className="absolute inset-y-1 right-0 flex items-center mr-3 bg-white text-gray-400 hover:text-gray-600 border-none "
        >
          {passwordVisibility.currentPass ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Eye className="h-5 w-5 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                Ocultar contraseña
              </TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <EyeOff className="h-5 w-5 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                Mostrar contraseña
              </TooltipContent>
            </Tooltip>
          )}
        </button>
      </div>

      <div className="relative">
        <Input
          type={passwordVisibility.newPass ? 'text' : 'password'}
          placeholder="Nueva contraseña"
          name='newPass'
          required
        />

        <button
          type='button'
          onClick={() => togglePasswordVisibility('newPass')}
          className="absolute inset-y-1 right-0 flex items-center mr-3 bg-white text-gray-400 hover:text-gray-600 border-none "
        >
          {passwordVisibility.newPass ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Eye className="h-5 w-5 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                Ocultar contraseña
              </TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <EyeOff className="h-5 w-5 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                Mostrar contraseña
              </TooltipContent>
            </Tooltip>
          )}
        </button>
      </div>

      <div className="relative">
        <Input
          type={passwordVisibility.repeatNewPass ? 'text' : 'password'}
          placeholder="Repetir contraseña"
          required
          name='repeatNewPass'
        />

        <button
          type='button'
          onClick={() => togglePasswordVisibility('repeatNewPass')}
          className="absolute inset-y-1 right-0 flex items-center mr-3 bg-white text-gray-400 hover:text-gray-600 border-none "
        >
          {passwordVisibility.repeatNewPass ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Eye className="h-5 w-5 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                Ocultar contraseña
              </TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <EyeOff className="h-5 w-5 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                Mostrar contraseña
              </TooltipContent>
            </Tooltip>
          )}
        </button>
      </div>

      <div>
        {state.error && (
          <p className="text-center text-sm text-red-600">{state.error}</p>
        )}
      </div>

      <div className="flex justify-end gap-1 pt-2 px-0">
        <div>{children}</div>
        <SubmitButton />
      </div>
    </form>
  )
}
