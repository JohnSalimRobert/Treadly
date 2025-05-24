import { z } from 'zod';
import { FormBuilder } from '../../components/FormBuilder/FormBuilder';
import { loginSchema } from '../../schemas/authSchema';
import { loginConfig } from '../../config/authConfig';
import { useNavigate } from "react-router";
import toast from 'react-hot-toast';
import { login } from '../../services/authService';
import { useAuthStore } from '../../stores/useAuthStore';

export default function LoginPage() {
    const navigate = useNavigate();

    const navigateToSignup = () => {
        navigate('/signup');
    }

    const handleLogin = async (data: z.infer<typeof loginSchema>) => {
        const payload = {
            ...data
        }
        toast(`Logging in with email: ${payload.email}`);
        const response: any = await toast.promise(
            login(payload),
            {
                loading: "Logging in...",
                success: "Successfully logged in!",
                error: (error) => {
                    console.error("Error logging in:", error);
                    if (error.response.data.message) {
                        return error.response.data.message;
                    }
                    return "Error logging in. Please try again.";
                }
            }
        ).finally(() => {
            toast.dismiss();
        }
        );
        if(!!response.token){
            console.log("Login response:", response);
            useAuthStore.getState().login( response.token, response.user);
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-threadly-background font-threadly text-threadly-text px-4">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-xl border border-threadly-secondary">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-threadly-primary">Welcome to Threadly</h1>
                    <p className="mt-2 text-sm text-threadly-muted">Your personalized social experience</p>
                </div>

                <div>
                    <h2 className="text-center text-xl font-semibold text-threadly-text">log in to your account</h2>
                </div>

                <FormBuilder schema={loginSchema} config={loginConfig} onSubmit={handleLogin} />


                <p className="text-center text-sm text-threadly-muted">
                    Don't have an account?{' '}
                    <span onClick={navigateToSignup} className="text-threadly-primary hover:underline">
                        Sign up
                    </span>
                </p>
            </div>
        </div>

    );
}
