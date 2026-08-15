export default function Footer() {
  return (
    <footer className="text-cream bg-berry-900">
      <div className="scallop-divider-up" style={{ "--scallop-color": "var(--color-berry-900)" }} />
      <div className="max-w-6xl mx-auto px-6 pb-10 pt-2 text-center">
        <div className="flex items-center justify-center gap-3">
          <img src={`${import.meta.env.BASE_URL}images/logorm.jpg`} alt="" className="w-10 h-10 rounded-full object-cover" />
          <h4 className="font-script text-3xl text-rose-100">DelightCake</h4>
        </div>
        <p className="text-rose-100/70 mt-2 text-sm">Making your sweetest moments unforgettable.</p>

        <div className="mt-5 flex justify-center gap-6 text-sm text-rose-50/90">
          <a href="#" className="hover:text-gold-400 transition">Facebook</a>
          <a href="#" className="hover:text-gold-400 transition">Instagram</a>
          <a href="#" className="hover:text-gold-400 transition">TikTok</a>
        </div>

        <p className="text-rose-100/40 text-xs mt-6">© {new Date().getFullYear()} DelightCake. All rights reserved.</p>
      </div>
    </footer>
  );
}
