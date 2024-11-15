import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/elements/Button";
import { useUser } from "../components/context/UserContext";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { handleLogin } = useUser();

  const onSubmit = (data) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = storedUsers.find((user) => user.email === data.email);
    if (user && user.password === data.password) {
      handleLogin(user);
      sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/products");
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-center mb-6">
              Login to your account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  className="w-full p-2.5 border rounded-lg"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-900">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full p-2.5 border rounded-lg"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" variant="primary" className="w-full">
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
