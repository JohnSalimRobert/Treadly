import { z } from 'zod';
import { FormBuilder } from '../../components/FormBuilder/FormBuilder';
import { loginSchema } from '../../schemas/authSchema';
import { loginConfig } from '../../config/authConfig';
import { useNavigate } from "react-router";

export default function LoginPage() {
    const navigate = useNavigate();

    const navigateToSignup = () => {
        navigate('/signup');
    }

    const handleLogin = (data: z.infer<typeof loginSchema>) => {
        // Handle login logic here
        console.log('Login data:', data);
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
