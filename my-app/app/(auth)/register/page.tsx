import RegisterForm from "@/app/components/registerForm/registerForm"

const RegisterPage = () => {

    return (
        <div className="flex gap-[100px] items-center mx-auto max-md:flex-col max-md:gap-[50px]">
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;

