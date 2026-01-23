import Link from "next/link";
import Logo from "../Logo/Logo";
// Importamos los iconos de Lucide (o puedes usar SVGs directos)
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  const categories = [
    { name: "Política", href: "/categoria/politica" },
    { name: "Economía", href: "/categoria/economia" },
    { name: "Judicial", href: "/categoria/judicial" },
    { name: "Deportes", href: "/categoria/deportes" },
    { name: "Cultura", href: "/categoria/cultura" },
    { name: "Opinión", href: "/categoria/opinion" },
  ];

  const legal = [
    { name: "Términos y condiciones", href: "/legal/terminos" },
    { name: "Política de privacidad", href: "/legal/privacidad" },
    { name: "Tratamiento de datos", href: "/legal/datos" },
    { name: "Contáctenos", href: "/contacto" },
  ];

  // Definimos las redes con sus respectivos componentes de icono
  const socialLinks = [
    { name: "Facebook", href: "#", icon: <Facebook size={18} /> },
    { name: "X", href: "#", icon: <Twitter size={18} /> },
    { name: "Instagram", href: "#", icon: <Instagram size={18} /> },
    { name: "YouTube", href: "#", icon: <Youtube size={18} /> },
  ];

  return (
    <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* PARTE SUPERIOR: Logo y Redes con Iconos */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-slate-100 dark:border-slate-800 pb-12">
          <div className="mb-8 md:mb-0 scale-75 md:scale-100 md:origin-left">
            <Logo className="my-0" width={220} />
          </div>

          <div className="flex gap-5 items-center">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="p-2 rounded-full bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-[#2f86cc] hover:bg-blue-50 dark:hover:bg-slate-800 transition-all duration-300">
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* PARTE MEDIA: Links de Navegación */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mb-16">
          <div className="col-span-2">
            <h4 className="font-sans font-black uppercase text-[10px] tracking-[0.2em] text-[#2f86cc] mb-6">
              Sobre Garzón
            </h4>
            <p className="font-sans text-sm text-slate-600 dark:text-slate-400 leading-relaxed pr-8">
              Periodismo independiente y veraz. Llevamos la información más
              relevante de la región y el país con el análisis que usted
              necesita.
            </p>
          </div>

          <div>
            <h4 className="font-sans font-black uppercase text-[10px] tracking-[0.2em] text-slate-900 dark:text-slate-100 mb-6">
              Secciones
            </h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="font-sans text-xs text-slate-500 dark:text-slate-400 hover:text-[#2f86cc] transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-black uppercase text-[10px] tracking-[0.2em] text-slate-900 dark:text-slate-100 mb-6">
              Institucional
            </h4>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="font-sans text-xs text-slate-500 dark:text-slate-400 hover:text-[#2f86cc] transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-2 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h4 className="font-sans font-black uppercase text-[10px] tracking-[0.2em] text-slate-900 dark:text-slate-100 mb-4">
              Suscríbase al Newsletter
            </h4>
            <p className="text-xs text-slate-500 mb-4 font-sans">
              Reciba lo mejor de nuestro periodismo en su correo.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Su correo"
                className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs font-sans outline-none focus:border-[#2f86cc]"
              />
              <button className="bg-[#2f86cc] text-white px-4 py-2 rounded-lg text-xs font-sans font-bold uppercase tracking-widest hover:bg-[#256ea8] transition-colors">
                Ir
              </button>
            </form>
          </div>
        </div>

        {/* PARTE INFERIOR: Copyright */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-[10px] text-slate-400 uppercase tracking-widest">
            © {new Date().getFullYear()} Garzón - Todos los derechos reservados
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-sans font-bold text-slate-300 dark:text-slate-700 uppercase tracking-tighter">
              Desarrollado con precisión por,{" "}
              <a
                className="hover:underline"
                href="https://www.linkedin.com/in/andreseag/"
                target="_blank">
                Andres Castro
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
