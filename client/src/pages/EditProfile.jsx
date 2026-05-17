import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../services/api";

function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", bio: "", skills: "", github: "", linkedin: "", portfolio: "", avatar: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi.profile()
      .then((res) => {
        const user = res.data;
        setForm({
          name: user.name || "",
          bio: user.bio || "",
          skills: (user.skills || []).join(", "),
          github: user.github || "",
          linkedin: user.linkedin || "",
          portfolio: user.portfolio || "",
          avatar: user.avatar || "",
        });
      })
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, skills: form.skills.split(",").map((item) => item.trim()).filter(Boolean) };
    authApi.updateProfile(payload)
      .then(() => {
        alert("Profile updated");
        navigate("/dashboard");
      })
      .catch((err) => alert(err.message));
  };

  if (loading) return <div className="px-4 py-20 text-center">Loading profile...</div>;

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="card p-6 sm:p-8">
        <h1 className="text-3xl font-black">Edit Profile</h1>
        <p className="mt-2 text-slate-400">Update your developer information.</p>
        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="input-style" />
          <input name="avatar" value={form.avatar} onChange={handleChange} placeholder="Avatar image URL" className="input-style" />
          <input name="skills" value={form.skills} onChange={handleChange} placeholder="React, Node, MongoDB" className="input-style md:col-span-2" />
          <input name="github" value={form.github} onChange={handleChange} placeholder="GitHub link" className="input-style" />
          <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn link" className="input-style" />
          <input name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="Portfolio link" className="input-style md:col-span-2" />
          <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Short bio" rows="5" className="input-style md:col-span-2" />
          <button className="btn-primary md:col-span-2">Save Profile</button>
        </form>
      </div>
    </section>
  );
}
export default EditProfile;
