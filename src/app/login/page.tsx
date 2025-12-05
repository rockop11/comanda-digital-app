import { LoginForm } from "@/components/LoginForm/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-8 shadow-2xl rounded-xl w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Iniciar Sesión
                </h2>

                <LoginForm />
            </div>
        </div>
    );
}