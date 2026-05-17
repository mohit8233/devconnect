import { useEffect, useState } from "react";
import { FaGithub, FaHeart, FaLink, FaRegCommentDots, FaTrash } from "react-icons/fa";
import { postApi } from "../services/api";

function PostCard({ post, mine, onDeleted }) {
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const likePost = () => {
    postApi.like(post._id)
      .then(() => setLikes((prev) => prev + 1))
      .catch((err) => alert(err.message));
  };

  const loadComments = () => {
    setShowComments((prev) => !prev);
    if (!showComments) {
      postApi.comments(post._id).then((res) => setComments(res.data || [])).catch(() => setComments([]));
    }
  };

  const addComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    postApi.addComment(post._id, comment)
      .then((res) => {
        setComments([res.data, ...comments]);
        setComment("");
        setShowComments(true);
      })
      .catch((err) => alert(err.message));
  };

  const deletePost = () => {
    if (!confirm("Delete this post?")) return;
    postApi.remove(post._id).then(() => onDeleted?.(post._id)).catch((err) => alert(err.message));
  };

  return (
    <article className="card overflow-hidden">
      {post.image ? (
        <img src={post.image} alt={post.title} className="h-56 w-full object-cover" />
      ) : (
        <div className="flex h-56 items-center justify-center bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-cyan-600/30 text-5xl font-black text-white/60">DC</div>
      )}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">{post.title}</h3>
            <p className="mt-1 text-sm text-slate-400">By {post.userId?.name || "Developer"}</p>
          </div>
          {mine && <button onClick={deletePost} className="rounded-xl bg-red-500/10 p-3 text-red-300 hover:bg-red-500/20"><FaTrash /></button>}
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-300">{post.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(post.techStack || []).map((tech, i) => <span key={i} className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">{tech}</span>)}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
          <div className="flex gap-2">
            <button onClick={likePost} className="flex items-center gap-2 rounded-xl bg-pink-500/10 px-3 py-2 text-sm text-pink-300"><FaHeart /> {likes}</button>
            <button onClick={loadComments} className="flex items-center gap-2 rounded-xl bg-slate-800 px-3 py-2 text-sm text-slate-200"><FaRegCommentDots /> Comments</button>
          </div>
          <div className="flex gap-2">
            {post.githubLink && <a href={post.githubLink} target="_blank" className="rounded-xl bg-slate-800 p-3 text-slate-200 hover:text-blue-300"><FaGithub /></a>}
            {post.liveLink && <a href={post.liveLink} target="_blank" className="rounded-xl bg-slate-800 p-3 text-slate-200 hover:text-blue-300"><FaLink /></a>}
          </div>
        </div>

        {showComments && (
          <div className="mt-5 rounded-2xl bg-slate-950/70 p-4">
            <form onSubmit={addComment} className="flex flex-col gap-3 sm:flex-row">
              <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..." className="input-style py-2" />
              <button className="btn-primary py-2">Send</button>
            </form>
            <div className="mt-4 space-y-3">
              {comments.length === 0 ? <p className="text-sm text-slate-500">No comments yet.</p> : comments.map((item) => (
                <div key={item._id} className="rounded-xl border border-slate-800 p-3 text-sm text-slate-300">
                  <b className="text-white">{item.userId?.name || "User"}</b> {item.comment}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
export default PostCard;
