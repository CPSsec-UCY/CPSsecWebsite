import type { Metadata } from "next";
import { ArrowLeft, Shield } from "lucide-react";
import { p } from "@/lib/base";

export const metadata: Metadata = {
  title: "Page Not Found | CPSSec",
};

export default function NotFound() {
  return (
    <div className="page-shell flex min-h-[60vh] items-center justify-center">
      <div className="card max-w-xl p-8 text-center animate-fade-in-up sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyber-500/15 text-cyber-300">
          <Shield className="h-7 w-7" />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-cyber-400">404</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Page not found</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          The page you requested does not exist or may have moved.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={p("/")} className="btn-pill">
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </a>
          <a href={p("/team")} className="btn-pill-outline">Browse Team</a>
        </div>
      </div>
    </div>
  );
}
