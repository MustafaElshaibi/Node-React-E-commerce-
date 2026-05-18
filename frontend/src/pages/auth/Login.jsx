import { useState } from "react";
import chairImg from "../../assets/images/chair.png";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { LuEyeOff } from "react-icons/lu";
import { MdRemoveRedEye } from "react-icons/md";
import { useLoginMutation } from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../../redux/features/authSlice";
import { toast } from "sonner";
import Cookies from "universal-cookie";
const cookies = new Cookies();


export default function Login() {
  const [register, {isLoading}] = useLoginMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location?.state?.from || { pathname: "/" };

   const validateForm = () => {
    const newErrors = {};
    let isValid = true;

 

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } 



    setError(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({
      email: "",
      password: "",
    });

    if (!validateForm()) {
      setLoading(false);
      return;
    }


    try {
      const res = await register(formData).unwrap();
      setLoading(false);
      if (res?.status === 'success') {
        dispatch(setUser(res.data.user))
        dispatch(setAccessToken(res.data.user.accessToken))
        toast.success("logged in sccessfully");
        navigate(redirectPath.pathname, { replace: true})
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError({
        email: err?.data?.message || "An error occurred during Login",
        password: "",
      });
    } finally {
      setLoading(false);
    }
    
  }

  return (
    <div className="w-full h-screen flex">
      <div className=" relative flex-1 hidden sm:flex h-full bg-white  flex-col justify-center items-center overflow-hidden">
        <h1 className="text-2xl font-bold text-gray-800/80 mb-4 absolute top-1 left-[50%] -translate-x-[50%] ">
          BuzzMart
        </h1>
        <img
          src={chairImg}
          alt="CHAIR PHOTO"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center items-start bg-white p-9 sm:p-17">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Sign In</h1>
        <p className="text-gray-500 text-xs sm:text-sm ">
          Don't have an account yet?{" "}
          <Link to={"/register"} className="text-[#38CB89] font-semibold ">
            Sign up
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="w-full text-[18px] mt-4 flex flex-col gap-4" noValidate>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-b-[#38CB89]"
          />
          <PasswordInput
            password={formData.password}
            handleChange={handleChange}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="agree"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="cursor-pointer"
            />
            <label htmlFor="agree" className="text-gray-500 text-xs sm:text-sm">
              Remember me
            </label>
          </div>
            <Link
              to={"/forgot-password"}
              className="text-[#38CB89] text-xs sm:text-sm"
            >
              Forgot Password?
            </Link>

            </div>
          <div className="text-red-500 text-xs sm:text-sm">
            {
              error.email ||
              error.password}
          </div>

          <button
            type="submit"
            className={`w-full bg-[#141718] cursor-pointer text-white font-semibold py-2 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading  || isLoading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

const PasswordInput = ({ password, handleChange, placeholder, name }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-b-[#38CB89]"
        value={password}
        onChange={handleChange}
        name={name || "password"}
      />
      {showPassword ? (
        <MdRemoveRedEye
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[50%] -translate-y-[40%] size-4 text-gray-600 cursor-pointer"
        />
      ) : (
        <LuEyeOff
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[50%] -translate-y-[40%] size-4 text-gray-600 cursor-pointer"
        />
      )}
    </div>
  );
};



