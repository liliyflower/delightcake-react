const team = [
  { name: "Nally", role: "Cake Designer", image: "/images/IMG_4068.JPG" },
  { name: "Celliy", role: "Head Baker", image: "/images/IMG_4070.JPG" },
  { name: "Lilly", role: "Decor Specialist", image: "/images/IMG_4069.JPG" },
];

const values = [
  { title: "Fresh Ingredients", desc: "We use only high-quality and fresh ingredients in every cake." },
  { title: "Custom Designs", desc: "Every cake is designed around your ideas and celebration theme." },
  { title: "Made with Love", desc: "We bake every cake with care, passion, and attention to detail." },
];

export default function About() {
  return (
    <div>
      <section className="pt-16 pb-14 bg-gradient-to-r from-rose-100 to-rose-200 text-center px-4">
        <p className="font-script text-2xl text-rose-600">Our Story</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 text-ink">About DelightCake</h1>
        <p className="max-w-2xl mx-auto text-ink-soft">
          Baking happiness, one cake at a time. We create custom cakes for every special moment.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <img src="/images/MacaronC2.jpg" className="rounded-2xl shadow-lg w-full" alt="Cakes and macarons at DelightCake" />
        <div>
          <h3 className="font-display text-3xl font-bold mb-4 text-rose-600">Our Story</h3>
          <p className="text-ink-soft leading-relaxed">
            DelightCake started with a simple dream: to bring joy through beautiful, delicious cakes.
            What began as a passion for baking has grown into a full custom bakery creating cakes for
            birthdays, weddings, and every celebration in between.
          </p>
          <p className="mt-4 text-ink-soft">
            Every cake is handcrafted with love, fresh ingredients, and creativity.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16 text-center">
        <h3 className="font-display text-3xl font-bold mb-10 text-ink">Why Choose Us</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v) => (
            <div key={v.title} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border border-rose-100">
              <h4 className="text-xl font-display font-semibold text-rose-500 mb-2">{v.title}</h4>
              <p className="text-ink-soft text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20 text-center">
        <h3 className="font-display text-3xl font-bold mb-10 text-ink">Meet the Team</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((t) => (
            <div key={t.name} className="bg-white p-6 rounded-2xl shadow border border-rose-100">
              <img src={t.image} className="w-32 h-32 mx-auto rounded-full mb-4 object-cover" alt={t.name} />
              <h4 className="font-display font-bold text-ink">{t.name}</h4>
              <p className="text-sm text-ink-soft">{t.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
