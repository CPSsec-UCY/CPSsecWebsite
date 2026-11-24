"use client";

import { usePathname } from "next/navigation";
import { basePath, p } from "@/lib/base";

export default function SiteNav() {
  const pathname = usePathname();
  const routePath = pathname?.startsWith(basePath) ? pathname.slice(basePath.length) || "/" : pathname;
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/team", label: "Team" },
    { href: "/publications", label: "Publications" },
    { href: "/platforms", label: "Platforms" },
  ];

  return (
    <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1.5">
      {links.map(({ href, label }) => {
        const target = p(href);
        const active = href === "/" ? routePath === "/" || routePath === "/index" : routePath === href || routePath?.startsWith(`${href}/`);
        return (
          <a
            key={href}
            href={target}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-200 hover:bg-cyber-500/15 hover:text-white ${active ? "bg-cyber-500/15 text-cyber-300" : "text-slate-200"}`}
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
}
