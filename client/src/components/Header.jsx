import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    isActive ? "text-blue-400" : "text-slate-300 hover:text-white";

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-black tracking-tight text-white sm:text-2xl">
          <span className="text-blue-400">Dev</span>Connect
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <NavLink to="/" className={navClass}>Home</NavLink>
          {token && <NavLink to="/explore" className={navClass}>Explore</NavLink>}
          {token && <NavLink to="/dashboard" className={navClass}>Dashboard</NavLink>}
          {token && <NavLink to="/create-post" className={navClass}>Create Post</NavLink>}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {token ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-slate-200 hover:border-blue-500">
                <FaUserCircle /> Profile
              </Link>
              <button onClick={logout} className="rounded-full bg-red-500/10 px-4 py-2 text-red-300 hover:bg-red-500/20">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost py-2">Login</Link>
              <Link to="/register" className="btn-primary py-2">Register</Link>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="rounded-xl border border-slate-700 p-3 text-white md:hidden">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-950 px-4 py-5 md:hidden">
          <div className="flex flex-col gap-4 text-base" onClick={() => setOpen(false)}>
            <NavLink to="/" className={navClass}>Home</NavLink>
            {token && <NavLink to="/explore" className={navClass}>Explore</NavLink>}
            {token && <NavLink to="/dashboard" className={navClass}>Dashboard</NavLink>}
            {token && <NavLink to="/create-post" className={navClass}>Create Post</NavLink>}
            {token ? (
              <button onClick={logout} className="w-full rounded-xl bg-red-500/10 px-4 py-3 text-left text-red-300">Logout</button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link to="/login" className="btn-ghost text-center">Login</Link>
                <Link to="/register" className="btn-primary text-center">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
export default Header;
