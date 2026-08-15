import { useState } from "react";
import { submitContactMessage } from "../lib/store";
import { isFirebaseConfigured } from "../lib/firebase";

const emptyForm = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); 

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    const id = await submitContactMessage(form);
    if (id || !isFirebaseConfigured) {
      setStatus("success");
      setForm(emptyForm);
    } else {
      setStatus("error");
    }
  };

  return (
    <div>
      <section className="pt-16 pb-12 bg-gradient-to-r from-rose-100 to-rose-200 text-center px-4">
        <p className="font-script text-2xl text-rose-600">Say Hello</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ink">Get in Touch</h1>
        <p className="max-w-xl mx-auto text-ink-soft mt-3">
          Questions about a custom order, delivery, or flavors? Send us a message.
        </p>
      </section>

      <section className="max-w-md mx-auto px-4 py-14">
        {status === "success" ? (
          <div className="text-center bg-white border border-rose-100 rounded-2xl p-8">
            <div className="text-4xl mb-3">💌</div>
            <h2 className="font-display text-2xl font-bold text-ink mb-2">Message sent!</h2>
            <p className="text-ink-soft">We'll get back to you as soon as possible.</p>
            {!isFirebaseConfigured && (
              <p className="text-xs text-gold-500 mt-4">
                Note: Firebase isn't configured yet, so this message was shown but not saved anywhere.
              </p>
            )}
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-ink mb-1">Name</label>
              <input id="name" name="name" required value={form.name} onChange={onChange}
                className="w-full border border-rose-200 p-2.5 rounded-lg focus:border-rose-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-ink mb-1">Email</label>
              <input id="email" type="email" name="email" required value={form.email} onChange={onChange}
                className="w-full border border-rose-200 p-2.5 rounded-lg focus:border-rose-500" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-ink mb-1">Message</label>
              <textarea id="message" name="message" rows={5} required value={form.message} onChange={onChange}
                className="w-full border border-rose-200 p-2.5 rounded-lg focus:border-rose-500" />
            </div>
            {status === "error" && (
              <p className="text-sm text-red-600">Something went wrong sending your message. Please try again.</p>
            )}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white font-semibold px-5 py-3 rounded-full transition"
            >
              {status === "submitting" ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
