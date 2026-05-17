import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";

function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950 px-4 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-black"><span className="text-blue-400">Dev</span>Connect</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">A developer portfolio and project sharing platform powered by your Node, Express and MongoDB server.</p>
        </div>
        <div className="flex flex-col gap-3 text-slate-300">
          <Link to="/explore" className="hover:text-blue-400">Explore Posts</Link>
          <Link to="/create-post" className="hover:text-blue-400">Create Project</Link>
          <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        </div>
        <div className="flex items-start gap-4 text-2xl text-slate-300 md:justify-end">
          <FaGithub /><FaLinkedin /><FaCode />
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-7xl text-sm text-slate-500">© 2026 DevConnect. All rights reserved.</p>
    </footer>
  );
}
export default Footer;
