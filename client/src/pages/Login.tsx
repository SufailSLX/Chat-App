import { useState, useEffect, useRef } from "react";
import API from "../utils/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, buttonVariants } from "../animation/framer";
import { loginPageAnimation, hoverAnimation, hoverOutAnimation } from "../animation/gsap";
import Loader from "../components/Loader";




export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    // Initialize animations
    if (!isLoading && containerRef.current) {
      loginPageAnimation();
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      dispatch(loginSuccess(res.data));
      navigate("/chat");
    } catch (err: any) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f2f5] to-[#00B2FF] flex items-center justify-center p-4">
      <motion.div
        ref={containerRef}
        className="login-container bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="p-8">
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.h1 
              className="text-3xl font-bold text-[#050505] mb-2"
              whileHover={{ scale: 1.02 }}
            >
              Welcome back!
            </motion.h1>
            <p className="text-[#65676B]">Sign in to your Hola account</p>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-4"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-[#65676B] mb-1">
                Email
              </label>
              <motion.input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="input-field w-full px-4 py-3 rounded-lg border border-[#E4E6EB] focus:border-[#00B2FF] focus:ring-2 focus:ring-[#00B2FF]/20 transition-all"
                whileFocus={{ borderColor: "#00B2FF", boxShadow: "0 0 0 2px rgba(0, 178, 255, 0.2)" }}
                onMouseEnter={(e) => hoverAnimation(e.currentTarget)}
                onMouseLeave={(e) => hoverOutAnimation(e.currentTarget)}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="password" className="block text-sm font-medium text-[#65676B] mb-1">
                Password
              </label>
              <div className="relative">
                <motion.input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  className="input-field w-full px-4 py-3 rounded-lg border border-[#E4E6EB] focus:border-[#00B2FF] focus:ring-2 focus:ring-[#00B2FF]/20 transition-all"
                  whileFocus={{ borderColor: "#00B2FF", boxShadow: "0 0 0 2px rgba(0, 178, 255, 0.2)" }}
                  onMouseEnter={(e) => hoverAnimation(e.currentTarget)}
                  onMouseLeave={(e) => hoverOutAnimation(e.currentTarget)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#65676B] hover:text-[#00B2FF]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div className="flex items-center justify-between" variants={itemVariants}>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-[#00B2FF] focus:ring-[#00B2FF] border-[#E4E6EB] rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#65676B]">
                  Remember me
                </label>
              </div>

              <motion.a
                href="#"
                className="text-sm text-[#00B2FF] hover:underline"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Forgot password?
              </motion.a>
            </motion.div>

            <motion.button
              type="submit"
              className="login-btn w-full py-3 px-4 bg-gradient-to-r from-[#0084FF] to-[#00B2FF] text-white font-medium rounded-lg hover:shadow-lg transition-all"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Sign In
            </motion.button>
          </motion.form>

          <motion.div className="mt-6" variants={itemVariants}>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E4E6EB]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#65676B]">Or continue with</span>
              </div>
            </div>

            <motion.div 
              className="social-login mt-6 grid grid-cols-3 gap-3"
              variants={containerVariants}
            >
              {['Google', 'Facebook', 'Apple'].map((provider) => (
                <motion.a
                  key={provider}
                  href="#"
                  className="w-full flex items-center justify-center px-4 py-2 border border-[#E4E6EB] rounded-lg hover:bg-gray-50 transition-colors"
                  variants={itemVariants}
                  whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img 
                    src={`https://logo.clearbit.com/${provider.toLowerCase()}.com`} 
                    alt={provider} 
                    className="h-5 w-5"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/20?text=${provider.charAt(0)}`;
                    }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="mt-6 text-center text-sm text-[#65676B]" variants={itemVariants}>
            Don't have an account?{' '}
            <motion.a
              href="/Register.tsx"
              className="font-medium text-[#00B2FF] hover:underline"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign up
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}