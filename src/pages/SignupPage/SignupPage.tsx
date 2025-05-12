import { z } from 'zod';
import { FormBuilder } from '../../components/FormBuilder/FormBuilder';
import { signupSchema } from '../../schemas/authSchema';
import { signupConfig } from '../../lib/config/authConfig';


export default function SignupPage() {
    const handleLogin = (data: z.infer<typeof signupSchema>) => {
        // Handle login logic here
        console.log('Login data:', data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-threadly-background font-threadly">
            <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-threadly-primary">Create your Threadly account</h2>
                    <p className="mt-2 text-sm text-threadly-muted">
                        Join the conversation. It's quick and easy.
                    </p>
                </div>

                <FormBuilder schema={signupSchema} config={signupConfig} onSubmit={handleLogin} />

                <p className="text-center text-sm text-threadly-muted">
                    Already have an account?{' '}
                    <a href="/login" className="text-threadly-primary hover:underline">
                        Sign in
                    </a>
                </p>
            </div>
        </div>

    );
}
