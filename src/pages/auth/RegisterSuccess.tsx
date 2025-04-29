
import AuthHeader from "@/components/auth/AuthHeader";
import RegisterSuccess from "@/components/auth/RegisterSuccess";

const RegisterSuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <AuthHeader />
        <RegisterSuccess />
      </div>
    </div>
  );
};

export default RegisterSuccessPage;
