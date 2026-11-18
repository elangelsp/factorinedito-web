// Menú móvil, borde de cabecera al desplazar y apartado activo del índice. Sin cookies ni almacenamiento.
const toggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("menu");
toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "Cerrar" : "Menú";
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && nav?.classList.contains("open")) { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.textContent = "Menú"; toggle.focus(); }
});
const header = document.querySelector(".site-header");
const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 8);
addEventListener("scroll", onScroll, { passive: true }); onScroll();
const links = [...document.querySelectorAll(".toc a")];
if (links.length && "IntersectionObserver" in window) {
  const byId = new Map(links.map(a => [decodeURIComponent(a.hash.slice(1)), a]));
  const io = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) { links.forEach(a => a.classList.remove("is-active")); byId.get(e.target.id)?.classList.add("is-active"); }
  }, { rootMargin: "-20% 0px -70% 0px" });
  byId.forEach((_, id) => { const h = document.getElementById(id); if (h) io.observe(h); });
}
