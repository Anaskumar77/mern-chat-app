import { useState } from "react";
import { useAuthStore } from "../lib/useAuthStore";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { isSigningUp, signup } = useAuthStore();

  const validating = () => {
    // const passwordRegex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // return passwordRegex.test(pwd);

    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validating();
    if (success) {
      console.log("success is true");
      signup(formData);
      return toast.success("Hellooooo");
    } else {
      console.log("else");
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            style={{ backgroundColor: "gray" }}
            type="text"
            placeholder="full name"
            value={formData.fullname}
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
          ></input>

          <input
            style={{ backgroundColor: "gray" }}
            type="email"
            placeholder="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          ></input>
          <input
            style={{ backgroundColor: "gray" }}
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          ></input>
          <button onClick={() => setShowPassword(!showPassword)}>
            Show password
          </button>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
