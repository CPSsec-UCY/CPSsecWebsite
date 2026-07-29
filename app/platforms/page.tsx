import { Network, Shield, Cpu, Monitor } from "lucide-react";

const iconMap: Record<string, any> = {
  Network,
  Shield,
  Cpu,
  Monitor,
};

export default function PlatformsPage() {
  return (
    <div className="page-shell">
      <div className="mb-10">
        <div className="badge mb-4 animate-fade-in-up">
          <Monitor className="h-3.5 w-3.5 text-cyber-400" />
          <span className="badge-label">Infrastructure</span>
        </div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          Platforms &amp; Testbeds
        </h1>
        <p className="mt-2 text-slate-300 max-w-2xl animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          Our lab operates a range of hardware and software cyber ranges for
          security research, education, and training in cyber-physical systems.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {platforms.map((platform, i) => {
          const Icon = iconMap[platform.icon] || Network;
          return (
            <div
              key={platform.name}
              className="card-hover p-6 animate-fade-in-up"
              style={{ animationDelay: `${300 + i * 80}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-3">
                  <Icon className="h-6 w-6 text-cyber-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold text-white group-hover:text-cyber-300 transition-colors">
                    {platform.name}
                  </h2>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {platform.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {platform.tags.map((tag) => (
                      <span key={tag} className="tag-cyan">{tag}</span>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Features
                    </h4>
                    <ul className="space-y-1">
                      {platform.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-xs text-slate-300"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyber-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {platform.status && (
                    <div className="mt-4 flex items-center gap-2 text-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-emerald-400 font-medium">
                        {platform.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card p-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <h3 className="text-sm font-semibold text-white">
          Interested in collaborating or using our testbeds?
        </h3>
        <p className="mt-1 text-xs text-slate-300">
          We welcome academic and industry partners. Contact us to discuss
          access to our platforms for research, education, or training purposes.
        </p>
        <a
          href="mailto:ieropoulos.vasilis@ucy.ac.cy"
          className="mt-3 inline-flex items-center gap-1 text-xs text-cyber-400 hover:text-cyber-300 transition-colors"
        >
          Get in touch &rarr;
        </a>
      </div>
    </div>
  );
}

const platforms = [
  {
    name: "Cyber Range",
    icon: "Network",
    description:
      "A flexible environment for running realistic cyber-physical exercises, attack scenarios, and defensive training sessions for researchers and students.",
    tags: ["Cyber Range", "Training", "Exercises"],
    status: "Active",
    features: [
      "Scenario-based training for critical infrastructure protection",
      "Support for attack and defense exercises",
      "Realistic emulation of operational environments",
    ],
  },
  {
    name: "ICS Testbed",
    icon: "Shield",
    description:
      "A dedicated industrial control systems testbed for evaluating networked OT environments, stealthy attack vectors, and monitoring approaches in realistic conditions.",
    tags: ["ICS/OT", "Industrial Control", "Security"],
    status: "Active",
    features: [
      "Simulation of industrial network behavior",
      "Detection and response experimentation",
      "Support for ICS-focused security research",
    ],
  },
  {
    name: "IoT Testbed",
    icon: "Cpu",
    description:
      "An IoT-focused testbed for evaluating embedded devices, communication protocols, and lightweight security mechanisms in constrained environments.",
    tags: ["IoT", "Embedded", "Security"],
    status: "Active",
    features: [
      "Device and protocol experimentation",
      "Resource-constrained security evaluation",
      "Support for IoT and edge-security research",
    ],
  },
];
