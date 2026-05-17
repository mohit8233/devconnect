import { useEffect, useState } from "react";
import { postApi } from "../services/api";
import PostCard from "../components/PostCard";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postApi.getMy()
      .then((res) => setPosts(res.data || []))
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  }, []);

  const removeFromUi = (id) => setPosts(posts.filter((post) => post._id !== id));

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black">My Posts</h1>
      <p className="mt-2 text-slate-400">Manage your own project posts.</p>
      {loading ? <p className="mt-10 text-slate-400">Loading...</p> : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => <PostCard key={post._id} post={post} mine onDeleted={removeFromUi} />)}
        </div>
      )}
      {!loading && posts.length === 0 && <div className="card mt-8 p-10 text-center text-slate-400">No posts created yet.</div>}
    </section>
  );
}
export default MyPosts;
