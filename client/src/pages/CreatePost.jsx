import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postApi } from "../services/api";

function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", techStack: "", image: "", githubLink: "", liveLink: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, techStack: form.techStack.split(",").map((item) => item.trim()).filter(Boolean) };
    postApi.create(payload)
      .then(() => {
        alert("Post created successfully");
        navigate("/explore");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="card p-6 sm:p-8">
        <h1 className="text-3xl font-black">Create Project Post</h1>
        <p className="mt-2 text-slate-400">Add project details to show on the explore feed.</p>
        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Project title" className="input-style md:col-span-2" required />
          <input name="techStack" value={form.techStack} onChange={handleChange} placeholder="React, Tailwind, Node" className="input-style md:col-span-2" />
          <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="input-style md:col-span-2" />
          <input name="githubLink" value={form.githubLink} onChange={handleChange} placeholder="GitHub repo link" className="input-style" />
          <input name="liveLink" value={form.liveLink} onChange={handleChange} placeholder="Live project link" className="input-style" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Project description" rows="6" className="input-style md:col-span-2" required />
          <button className="btn-primary md:col-span-2">Create Post</button>
        </form>
      </div>
    </section>
  );
}
export default CreatePost;
