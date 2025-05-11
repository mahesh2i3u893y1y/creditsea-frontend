import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import { useAuth } from "../context/AuthContext";

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

const AuthForm = () => {
  // const { setUser } = useAuth();
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      navigate("/user");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
  e.preventDefault();

  const payload = {
    email: formData.email,
    password: formData.password,
  };

  try {
    const res = await fetch("https://creditsea-backend-8.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    // console.log("Login result:", result);
    localStorage.setItem("user",JSON.stringify(result.user))
    navigate("/user")
    
    
  } catch (err) {
    console.error(err);
    alert("Network error");
  }
};


const handleSignup = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("https://creditsea-backend-8.onrender.com/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    console.log("Signup result:", result);

    
  } catch (err) {
    console.error(err);
    alert("Network error");
  }
};


  const handleSubmit = (e) => {
  if (isLogin) {
    handleLogin(e);
  } else {
    handleSignup(e);
  }
};

  return (
    <div className="fixed h-screen w-full flex flex-col items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-[400px]">
        <h2 className="text-xl font-bold text-center mb-4">
          {isLogin ? "Login" : "Signup"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <div className="space-y-3">
              <input
                name="userName"
                placeholder="Username"
                value={formData.userName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded outline-none"
                required
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded outline-none"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded outline-none"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded outline-none"
            required
          />
          <button className="w-full bg-green-600 text-white py-2 rounded cursor-pointer">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="mt-3 text-center text-sm my-2">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 underline my-2 cursor-pointer"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
      <div className="text-center text-md font-semibold font-poppins">
            <p>**Please use this credentials**</p>
            <p className="text-green-600">Email: mahesh@gmail.com</p>
            <p className="text-green-600">Password: Mahesh@123</p>
        </div>
    </div>
  );
};

export default AuthForm;
