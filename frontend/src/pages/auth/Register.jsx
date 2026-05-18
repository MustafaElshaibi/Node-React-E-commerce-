import { useState } from "react";
import chairImg from "../../assets/images/chair.png";
import { Link, useNavigate } from "react-router";
import { LuEyeOff } from "react-icons/lu";
import { MdRemoveRedEye } from "react-icons/md";
import { useRegisterMutation } from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../../redux/features/authSlice";
import { toast } from "sonner";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Register() {
  const [register, { isLoading }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
      isValid = false;
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
      isValid = false;
    }

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
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, number";
      isValid = false;
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
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
                // cookies.set('accessToken', res?.data?.user?.accessToken);
        toast.success("Registered  sccessfully");
        navigate("/");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError({
        firstName:
          err?.data?.message || "An error occurred during registration",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Sign UP</h1>
        <p className="text-gray-500 text-xs sm:text-sm ">
          Already have an account?{" "}
          <Link to={"/login"} className="text-[#38CB89] font-semibold ">
            Sing in
          </Link>
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full text-[18px] mt-4 flex flex-col gap-4"
          noValidate
        >
          <div className="flex gap-2">
            <input
              onChange={handleChange}
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="First Name"
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-b-[#38CB89]"
            />
            <input
              onChange={handleChange}
              name="lastName"
              value={formData.lastName}
              type="text"
              placeholder="Last Name"
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-b-[#38CB89]"
            />
          </div>
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
          <PasswordInput
            password={formData.confirmPassword}
            handleChange={handleChange}
            placeholder={"Confirm Password"}
            name="confirmPassword"
          />
          <div className="flex items-center mt-3 gap-2">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="w-4 h-4"
            />
            <label
              htmlFor="agree"
              className="text-gray-500 text-xs sm:text
-sm"
            >
              I agree to the{" "}
              <Link to={"/terms"} className="text-[#141718] font-semibold">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link to={"/privacy"} className="text-[#141718] font-semibold">
                Privacy Policy
              </Link>
            </label>
          </div>
          <div className="text-red-500 text-xs sm:text-sm">
            {error.firstName ||
              error.lastName ||
              error.email ||
              error.password ||
              error.confirmPassword}
          </div>

          <button
            type="submit"
            className={`w-full bg-[#141718] cursor-pointer text-white font-semibold py-2 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading || !agreed || isLoading}
          >
            {loading ? "Loading..." : "Sign Up"}
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
