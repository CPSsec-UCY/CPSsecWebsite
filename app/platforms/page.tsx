import { Network, Shield, Cpu, Monitor, Radio, Wifi } from "lucide-react";

const iconMap: Record<string, any> = {
  Network,
  Shield,
  Cpu,
  Monitor,
  Radio,
  Wifi,
};

export default function PlatformsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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
                <div className="rounded-xl border border-slate-700/50 bg-slate-800/70 p-3">
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
    name: "PowerRanger",
    icon: "Network",
    description:
      "An open-source cyber range platform for smart grid security research. PowerRanger integrates hardware-in-the-loop (HIL) simulation with real IEC 61850 process bus communications, enabling realistic attack-defense scenarios for power system operators and researchers.",
    tags: ["Smart Grid", "HIL", "Open Source"],
    status: "Active — v2.1 deployed",
    features: [
      "Real-time HIL simulation with RTDS and OPAL-RT",
      "IEC 61850 GOOSE/SV message injection and monitoring",
      "Multi-vendor protection relay integration (SEL, ABB)",
      "Pre-built attack scenarios (MITM, replay, DoS, coordinated)",
      "Capture-the-flag (CTF) exercise framework",
    ],
  },
  {
    name: "ICS Honeynet",
    icon: "Shield",
    description:
      "A distributed network of high-interaction industrial honeypots deployed across multiple geographic regions. Each node emulates real PLC, RTU, and HMI behavior using vendor-accurate protocol stacks to capture adversary TTPs targeting OT environments.",
    tags: ["ICS/OT", "Honeypot", "Threat Intel"],
    status: "Active — 12 nodes across 8 countries",
    features: [
      "Protocol-accurate emulation (Modbus, DNP3, S7comm, OPC-UA)",
      "Automated malware sample capture and analysis pipeline",
      "Real-time threat intelligence feed integration (MISP)",
      "Low-interaction to high-interaction dynamic escalation",
      "Anonymized dataset release for research community",
    ],
  },
  {
    name: "Firmware Analysis Rig",
    icon: "Cpu",
    description:
      "An automated firmware security analysis pipeline supporting extraction, emulation, and vulnerability discovery for embedded CPS devices. The rig handles a wide range of architectures including ARM, RISC-V, and MIPS.",
    tags: ["Embedded", "Firmware", "TEE"],
    status: "Operational — 200+ firmware images analyzed",
    features: [
      "Automated firmware extraction from 50+ device families",
      "QEMU-based full-system emulation with peripheral modeling",
      "Static analysis (binary diffing, known vulnerability matching)",
      "Dynamic analysis (fuzzing, symbolic execution with angr)",
      "TEE security evaluation (TrustZone-M, Keystone)",
    ],
  },
  {
    name: "5G CPS Testbed",
    icon: "Radio",
    description:
      "A private 5G standalone (SA) testbed for researching security challenges in ultra-reliable low-latency communications (URLLC) for CPS applications. Supports network slicing security and edge computing integration.",
    tags: ["5G", "URLLC", "Edge Security"],
    status: "Under development — expected Q4 2024",
    features: [
      "OpenAirInterface 5G SA core and gNB deployment",
      "Network slicing with dedicated QoS for CPS traffic",
      "MEC (Multi-access Edge Computing) security evaluation",
      "Time-sensitive networking (TSN) integration",
      "Attack surface analysis (RAN, core, transport)",
    ],
  },
  {
    name: "Maritime Cyber Range",
    icon: "Wifi",
    description:
      "A cyber range environment simulating integrated bridge systems (IBS), propulsion control, and cargo management systems for maritime cybersecurity research. Supports both commercial vessel and autonomous surface vessel (ASV) scenarios.",
    tags: ["Maritime", "Navigation", "Autonomous Vessels"],
    status: "Phase 1 complete — ECDIS and GPS simulation available",
    features: [
      "ECDIS (Electronic Chart Display) simulation",
      "GPS/GNSS spoofing and jamming attack scenarios",
      "Automatic Identification System (AIS) manipulation",
      "Propulsion and steering control system emulation",
      "Scenario builder for port and offshore operations",
    ],
  },
  {
    name: "Formal Methods Toolkit",
    icon: "Monitor",
    description:
      "A collection of formal verification tools and models for analyzing safety and security properties of CPS designs. Includes model checkers, theorem provers, and runtime monitors tailored for industrial control applications.",
    tags: ["Formal Methods", "Verification", "Model Checking"],
    status: "Active — Uppaal, NuSMV, PRISM models available",
    features: [
      "Uppaal models for ICS communication protocols",
      "NuSMV/PRISM for smart grid security properties",
      "Runtime monitoring framework for CPS intrusion detection",
      "Attack tree generation from system models",
      "Case studies: IEC 61850 substation, wind turbine control",
    ],
  },
];
