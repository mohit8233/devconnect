import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaRegFileAlt, FaUserFriends } from "react-icons/fa";
import { authApi, postApi } from "../services/api";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([authApi.profile(), postApi.getMy()])
      .then(([profileRes, postRes]) => {
        setProfile(profileRes.data);
        setPosts(postRes.data || []);
      })
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="px-4 py-20 text-center text-slate-300">Loading dashboard...</div>;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="card p-6">
          <div className="flex flex-col items-center text-center">
            <img src={profile?.avatar || `https://ui-avatars.com/api/?name=${profile?.name || "User"}&background=2563eb&color=fff`} className="h-28 w-28 rounded-full border-4 border-blue-500/40 object-cover" />
            <h2 className="mt-4 text-2xl font-black">{profile?.name}</h2>
            <p className="mt-2 text-sm text-slate-400">{profile?.bio || "No bio added yet."}</p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-2xl bg-slate-950 p-4"><b>{profile?.followers?.length || 0}</b><p className="text-xs text-slate-500">Followers</p></div>
            <div className="rounded-2xl bg-slate-950 p-4"><b>{posts.length}</b><p className="text-xs text-slate-500">Posts</p></div>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <Link to="/edit-profile" className="btn-ghost flex items-center justify-center gap-2"><FaEdit /> Edit Profile</Link>
            <Link to="/create-post" className="btn-primary flex items-center justify-center gap-2"><FaPlus /> Create Post</Link>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card p-5"><FaRegFileAlt className="text-2xl text-blue-300" /><p className="mt-4 text-3xl font-black">{posts.length}</p><p className="text-sm text-slate-400">My Projects</p></div>
            <div className="card p-5"><FaUserFriends className="text-2xl text-green-300" /><p className="mt-4 text-3xl font-black">{profile?.following?.length || 0}</p><p className="text-sm text-slate-400">Following</p></div>
            <div className="card p-5"><FaPlus className="text-2xl text-purple-300" /><p className="mt-4 text-3xl font-black">{profile?.skills?.length || 0}</p><p className="text-sm text-slate-400">Skills</p></div>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-bold">Skills</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile?.skills?.length ? profile.skills.map((skill, i) => <span key={i} className="rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-300">{skill}</span>) : <p className="text-slate-400">No skills added.</p>}
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-bold">Recent Projects</h3>
              <Link to="/my-posts" className="text-sm font-semibold text-blue-400">View all</Link>
            </div>
            <div className="mt-5 space-y-3">
              {posts.slice(0, 4).map((post) => <div key={post._id} className="rounded-2xl border border-slate-800 p-4"><b>{post.title}</b><p className="mt-1 text-sm text-slate-400">{post.description}</p></div>)}
              {posts.length === 0 && <p className="text-slate-400">No project posted yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Dashboard;
