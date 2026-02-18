// src/pages/login/Login.jsx

import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import loginVideo from '../../assets/img/loginVideo.mp4';
import "./login.scss";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { toast } from "sonner";
import { type SuperAdminLoginProps } from "../../services/UserApi/UsetApi";
import { useAuth } from "../../auth/AuthProvide";
import { useSuperAdminLogin } from "../../hooks/SuperAdmin/SuperAdmin";


function Login() {
  const navigate = useNavigate();
  const loginuser = useSuperAdminLogin();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (e: any) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // clear error on typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };
  const validate = () => {
    let tempErrors: any = {};

    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const requestObject: SuperAdminLoginProps = {
        email: formData.email,
        password: formData.password
      }
      const res = await loginuser.mutateAsync(requestObject);
      toast.success("Login successful");
      login(res?.data?.responseObject?.user)
  
        navigate("/dashboard");
 

    } catch (error: any) {
      // toast.error(
      //   error?.response?.data?.message || "Invalid credentials"
      // );
    } finally {
      // setLoading(false);
    }
  };


  return (
    <section className="login_sec">
      <div className="login_wrapper">
        <video autoPlay muted loop webkit-playsinline="true" x5-playsinline="true" className="absolute inset-0 w-full h-full object-cover">
          <source src={loginVideo} type="video/mp4" />
        </video>
        <div className="login_card">
          <div className="auth_form_card">
            <div className="auth_form">
              <div className="auth_header">
                <div className="auth_logo">
                  {/* <img src={authLogo} alt="logo" /> */}
                </div>
                <div className="auth_tittle">
                  <h2>Super Admin</h2>
                  <p>Welcome back! Please enter your details.</p>
                </div>
              </div>
              <Form className="form" onSubmit={handleSubmit}  >
                {/* EMAIL */}
                <Form.Group className="custom_input_filled" controlId="">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData?.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* PASSWORD */}
                <Form.Group className="custom_input_filled" controlId="">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData?.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* ROLE SELECT */}
                {/* <label>Role</label>
                <div className="role-buttons">
                  {["admin", "clinician", "physician"].map((role) => (
                    <button
                      key={role}
                      type="button"
                      className={`role-btn ${selectedRole === role ? "active-" + role : ""}`}
                      onClick={() => setSelectedRole(role)}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                  ))}
                </div> */}
                {/* <div className="forget_password text-end">
                  <Link to='/'>Forget Password</Link>
                </div> */}
                {/* SUBMIT */}
                <div className="auth_btn">
                  <Button type="submit" variant="primary" className="">
                    Log In
                  </Button>
                </div>
              </Form>
            </div>
          </div>
          {/* <div className="auth_footer">
            <p>Don’t have account? <Link to='/'>Sign Up</Link></p>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default Login;
