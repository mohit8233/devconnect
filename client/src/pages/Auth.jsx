import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authApi } from "../services/api";

function Auth({ mode }) {
  const isRegister = mode === "register";
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const apiCall = isRegister ? authApi.register(form) : authApi.login({ email: form.email, password: form.password });

    apiCall
      .then((res) => {
        if (res.token) localStorage.setItem("token", res.token);
        alert(res.message || "Success");
        navigate(isRegister ? "/login" : "/dashboard");
      })
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <section className="flex min-h-[75vh] items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md p-6 sm:p-8">
        <h1 className="text-center text-3xl font-black">{isRegister ? "Create Account" : "Welcome Back"}</h1>
        <p className="mt-2 text-center text-sm text-slate-400">{isRegister ? "Join DevConnect and showcase your projects." : "Login to manage your profile and posts."}</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {isRegister && <input name="name" value={form.name} onChange={handleChange} className="input-style" placeholder="Full name" required />}
          <input name="email" type="email" value={form.email} onChange={handleChange} className="input-style" placeholder="Email address" required />
          <input name="password" type="password" value={form.password} onChange={handleChange} className="input-style" placeholder="Password" required />
          <button disabled={loading} className="btn-primary w-full disabled:opacity-60">{loading ? "Please wait..." : isRegister ? "Register" : "Login"}</button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-400">
          {isRegister ? "Already have account?" : "New user?"} <Link className="font-semibold text-blue-400" to={isRegister ? "/login" : "/register"}>{isRegister ? "Login" : "Register"}</Link>
        </p>
      </div>
    </section>
  );
}
export default Auth;
