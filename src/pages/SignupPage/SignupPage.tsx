import { set, z } from 'zod';
import { FormBuilder } from '../../components/FormBuilder/FormBuilder';
import { signupSchema } from '../../schemas/authSchema';
import { signupConfig } from '../../config/authConfig';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/authService';
import { uploadImages } from '../../lib/cloudnary/uploadImages';
import { normalizeCloudinaryUrls } from '../../utils/normalizeUploadResult';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../stores/useAuthStore';


export default function SignupPage() {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    }

    const handleSignup = async (data: z.infer<typeof signupSchema>) => {
        // Handle login logic here
       try{
           const rawFiles = data.profilePicture;
           const filesToUpload = Array.isArray(rawFiles) ? rawFiles : Array.from(rawFiles); 
           const uploadResult = await uploadImages(filesToUpload)
           const normalizedProfilePicure = normalizeCloudinaryUrls(uploadResult, filesToUpload.length > 1); 
           
           const payload = {
                ...data,
                profilePicture: normalizedProfilePicure,
           }
           const response: any = await toast.promise(
               signup(payload),
               {
                   loading: "Signing up...",
                   success: "Successfully signed up!",
                   error: (error) => {
                       console.error("Error signing up:", error);
                       if(error.response.data.message){
                        return error.response.data.message;
                       }
                       return "Error signing up. Please try again.";
                   }
                }
           ).finally(() => {
            toast.dismiss();
           })
           if(!!response.token){
               useAuthStore.setState({ user: response.user, token: response.token });
               navigate('/');
            }
        } catch (error) {
            console.error("Error signing up:", error);
            // Handle error (e.g., show a notification)
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-threadly-background font-threadly text-threadly-text px-4">
            <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-threadly-primary">Create your Threadly account</h2>
                    <p className="mt-2 text-sm text-threadly-muted">
                        Join the conversation. It's quick and easy.
                    </p>
                </div>

                <FormBuilder schema={signupSchema} config={signupConfig} onSubmit={handleSignup} />

                <p className="text-center text-sm text-threadly-muted">
                    Already have an account?{' '}
                    <span onClick={navigateToLogin} className="text-threadly-primary hover:underline">
                        Sign in
                    </span>
                </p>
            </div>
        </div>

    );
}
