import { Link } from "react-router-dom";
import { FaCode, FaRocket, FaUsers, FaLaptopCode } from "react-icons/fa";

function Home() {
  const features = [
    { icon: <FaLaptopCode />, title: "Developer Profiles", text: "Bio, skills, GitHub, LinkedIn and portfolio links in one place." },
    { icon: <FaRocket />, title: "Project Showcase", text: "Share projects with images, tech stack, live links and repository links." },
    { icon: <FaUsers />, title: "Community Feed", text: "Explore projects, like posts and discuss through comments." },
  ];

  return (
    <div>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(147,51,234,.25),transparent_30%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">Full Stack Developer Network</p>
            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">Show your skills. Share your projects. Connect faster.</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">DevConnect is a responsive MERN frontend connected with your server APIs. Login, update profile, create posts, like and comment on developer projects.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/register" className="btn-primary text-center">Get Started</Link>
              <Link to="/login" className="btn-ghost text-center">Login Account</Link>
            </div>
          </div>

          <div className="card p-5 sm:p-8">
            <div className="rounded-3xl bg-slate-950 p-5">
              <div className="mb-5 flex gap-2"><span className="h-3 w-3 rounded-full bg-red-400" /><span className="h-3 w-3 rounded-full bg-yellow-400" /><span className="h-3 w-3 rounded-full bg-green-400" /></div>
              <pre className="overflow-hidden text-sm leading-7 text-slate-300"><code>{`const developer = {
  name: "Mohit Singh",
  stack: ["React", "Node", "MongoDB"],
  goal: "Build real projects",
  status: "Ready to hire"
};`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((item, i) => (
            <div key={i} className="card p-6 transition hover:-translate-y-2 hover:border-blue-500/50">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl text-blue-300">{item.icon}</div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="card flex flex-col items-start justify-between gap-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 md:flex-row md:items-center">
          <div>
            <FaCode className="mb-4 text-4xl text-blue-300" />
            <h2 className="text-3xl font-black">Ready to build your developer profile?</h2>
            <p className="mt-2 text-slate-300">Use your backend and start posting projects today.</p>
          </div>
          <Link to="/create-post" className="btn-primary whitespace-nowrap">Create Project</Link>
        </div>
      </section>
    </div>
  );
}
export default Home;
