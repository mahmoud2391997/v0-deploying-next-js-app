
// import { useEffect, useState } from "react";
// import { EyeIcon, EyeOffIcon, MailIcon, LockIcon } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
// const navigate = useNavigate()

//   const images = ['/riyadh2.webp', '/riyadh3.jpeg'];

//     const [index, setIndex] = useState(0);
  
//     useEffect(() => {
//       const interval = setInterval(() => {
//         setIndex((prevIndex) => (prevIndex + 1) % images.length);
//       }, 5000);
  
//       return () => clearInterval(interval);
//     }, []);
  
 

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (email !== "test@example.com" || password !== "password123") {
//       setError("Invalid email or password.");
//     } else {
//         navigate("/main")

//     }
//   };

//   return (
//     <div
//       className="flex element items-center justify-center min-h-screen transition-all duration-1000 bg-cover bg-center"
//       style={{
//         width: '100vw',
//         height: '100vh',
//         backgroundImage: `url(${images[index]})`,
//         backgroundSize: 'cover',
//         transition: 'background-image 1s ease-in-out',
//       }}
//     >
//       <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 pt-2 rounded-2xl shadow-lg w-[90%] sm:w-[500px]">
//         {/* Logo */}
//         <div className="flex justify-center mb-4">
//           <img src="image.png
//           " alt="Company Logo" />
//         </div>

//         {/* Welcome Message */}
//         <h1 className="text-3xl font-semibold text-center text-black">
//         Welcome Back        </h1>

//         {/* Login Form */}
//         <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
//           {/* Email Input */}
//           <div className="relative">
//             <MailIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//             <input
//               type="email"
//               className="w-full px-10 py-2 text-black text-xl bg-white border border-gray-600  focus:outline-none focus:border-blue-500"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           {/* Password Input */}
//           <div className="relative">
//             <LockIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//             <input
//               type={showPassword ? "text" : "password"}
//               className="w-full px-10 py-2 text-black bg-white border text-xl border-gray-600  focus:outline-none focus:border-blue-500"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button
//               type="button"
//               className="absolute right-3 top-3 text-gray-400"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//             </button>
//           </div>

//           {/* Error Message */}
//           {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-2 mt-2 text-white element text-2xl"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

