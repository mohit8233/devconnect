import { useEffect, useMemo, useState } from "react";
import { postApi } from "../services/api";
import PostCard from "../components/PostCard";

function Explore() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postApi.getAll()
      .then((res) => setPosts(res.data || []))
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const value = search.toLowerCase();
    return posts.filter((post) =>
      post.title?.toLowerCase().includes(value) ||
      post.description?.toLowerCase().includes(value) ||
      post.techStack?.join(" ").toLowerCase().includes(value)
    );
  }, [posts, search]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">Explore</p>
          <h1 className="mt-2 text-4xl font-black">Developer Projects</h1>
          <p className="mt-3 text-slate-400">Like, comment and discover projects from all users.</p>
        </div>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or tech..." className="input-style max-w-md" />
      </div>

      {loading ? <p className="text-center text-slate-400">Loading posts...</p> : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      )}
      {!loading && filtered.length === 0 && <div className="card p-10 text-center text-slate-400">No posts found.</div>}
    </section>
  );
}
export default Explore;
