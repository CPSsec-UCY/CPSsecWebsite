import { Shield, Building, GraduationCap, ExternalLink, Server, Cpu, Network, Lock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="page-shell max-w-4xl">
      <div className="mb-10">
        <div className="badge mb-4">
          <Shield className="h-3.5 w-3.5 text-cyber-400" />
          <span className="badge-label">About</span>
        </div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">About CPSSec</h1>
      </div>

      <section className="card p-6 sm:p-8 mb-10 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <h2 className="text-xl font-semibold text-white mb-4">
          Cyber-Physical Systems Security Lab
        </h2>
        <div className="space-y-4 text-sm text-slate-200 leading-relaxed">
          <p>
            The <strong className="text-white">Cyber-Physical Systems Security Lab (CPSSec)</strong> is a
            research laboratory within the Department of Electrical and Computer Engineering at
            the <strong className="text-white">University of Cyprus</strong>, operating under the
            <strong className="text-white"> KIOS Centre of Excellence</strong>. The lab is directed by
            Prof. Angelos K. Marnerides and brings together researchers at the intersection of
            cybersecurity, control systems, computer networks, and critical infrastructure protection.
          </p>
          <p>
            Our mission is to advance the security, resilience, and trustworthiness of cyber-physical
            systems that underpin modern critical infrastructure — including power grids, water
            networks, transportation systems, and industrial control networks. We pursue this mission
            through a combination of theoretical foundations, data-driven analysis, and experimental
            validation on physical and virtual testbeds.
          </p>
          <p>
            The lab&apos;s research philosophy centres on designing secure and resilient systems with
            strong theoretical underpinnings, while producing practical, deployable solutions that
            address real-world threats. Our work spans anomaly and malware detection, ICS/OT
            forensics, post-quantum cryptography for embedded devices, vulnerability discovery in
            operational technology, IoT botnet analysis, and cyber range federation.
          </p>
        </div>
      </section>

      <section className="card p-6 sm:p-8 mb-10 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <div className="flex items-start gap-4 mb-4">
          <div className="badge-icon">
            <GraduationCap className="h-5 w-5 text-cyber-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              University of Cyprus
            </h2>
            <a
              href="https://www.ucy.ac.cy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-cyber-400 hover:text-cyber-300 transition-colors mt-1"
            >
              ucy.ac.cy <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed">
          The <strong className="text-white">University of Cyprus (UCY)</strong> is the flagship
          research university of the Republic of Cyprus, consistently ranked among the top
          institutions in the Eastern Mediterranean region. Founded in 1989, UCY has grown into
          a comprehensive university with over 7,000 students and more than 800 faculty members
          across eight faculties. The Department of Electrical and Computer Engineering hosts
          CPSSec and provides a vibrant research environment with state-of-the-art laboratory
          facilities. UCY is a hub for EU-funded research and maintains strong partnerships with
          industry, government, and international academic institutions.
        </p>
      </section>

      <section className="card p-6 sm:p-8 mb-10 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
        <div className="flex items-start gap-4 mb-4">
          <div className="badge-icon">
            <Building className="h-5 w-5 text-cyber-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              KIOS Centre of Excellence
            </h2>
            <a
              href="https://www.kios.ucy.ac.cy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-cyber-400 hover:text-cyber-300 transition-colors mt-1"
            >
              kios.ucy.ac.cy <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
        <div className="space-y-4 text-sm text-slate-200 leading-relaxed">
          <p>
            The <strong className="text-white">KIOS Research and Innovation Centre of Excellence</strong>
            is a world-class interdisciplinary research centre hosted by the University of Cyprus, with
            Imperial College London as a strategic partner. Established in 2008 and elevated to a
            European Centre of Excellence in 2017 through the EU Horizon 2020 Teaming programme,
            KIOS has secured over €40 million in funding and grown to more than 200 researchers,
            engineers, and support staff.
          </p>
          <p>
            KIOS focuses on the monitoring, control, security, and management of critical
            infrastructure systems — including electric power systems, water distribution networks,
            telecommunication networks, and transportation systems. The centre brings together
            expertise across control systems, computer science, electrical engineering,
            cybersecurity, machine learning, and telecommunications.
          </p>
          <p>
            <strong className="text-white">CPSSec operates as a dedicated research lab within KIOS</strong>,
            complementing and extending the centre&apos;s security agenda with a focused emphasis on
            cyber-physical systems security. Through KIOS, CPSSec researchers gain access to
            extensive testbed infrastructure (including power system simulators, water distribution
            testbeds, and hardware-in-the-loop platforms), collaboration with over 50 industry
            and academic partners, and participation in European initiatives such as ACTING,
            CITADEL Range, COCOON, and FOCAL.
          </p>
        </div>
      </section>

      <section className="card p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
        <div className="flex items-start gap-4 mb-4">
          <div className="badge-icon">
            <Server className="h-5 w-5 text-cyber-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              Research Themes
            </h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {themes.map((theme) => {
            const Icon = theme.icon;
            return (
              <div key={theme.title} className="card p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 rounded-lg border border-slate-700/50 bg-slate-800/60 p-1.5">
                    <Icon className="h-4 w-4 text-cyber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{theme.title}</h3>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                      {theme.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

const themes = [
  {
    title: "ICS/OT Security",
    description:
      "Securing industrial control systems and operational technology environments against cyber threats, including SCADA, PLC, and RTU security, protocol analysis, and network segmentation.",
    icon: Cpu,
  },
  {
    title: "Smart Grid Protection",
    description:
      "Developing intrusion detection, energy theft prevention, and resilient control architectures for modern power grids with high renewable penetration.",
    icon: Network,
  },
  {
    title: "IoT & Embedded Security",
    description:
      "Lightweight intrusion detection, federated learning at the edge, firmware security, and post-quantum cryptography for resource-constrained devices.",
    icon: Lock,
  },
  {
    title: "Cyber Ranges & Testbeds",
    description:
      "Building hardware-in-the-loop simulation environments, federated cyber ranges, and realistic training platforms for security research and education.",
    icon: Server,
  },
  {
    title: "Network Security",
    description:
      "Anomaly detection, traffic analysis, botnet profiling, DNS security, and threat intelligence for backbone, enterprise, and critical infrastructure networks.",
    icon: Network,
  },
  {
    title: "Critical Infrastructure Resilience",
    description:
      "Ensuring continuity of essential services through intrusion-tolerant architectures, formal verification, incident response, and cyber risk assessment.",
    icon: Shield,
  },
];
