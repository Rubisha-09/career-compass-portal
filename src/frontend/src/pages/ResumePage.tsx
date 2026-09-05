import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { getCareerById } from "../data/careers";

export default function ResumePage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/career/$id/resume" });
  const career = getCareerById(id ?? "");

  if (!career) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Career not found.</p>
      </div>
    );
  }

  const { resumeTemplate: rt } = career;

  function handleDownload() {
    const lines: string[] = [];
    lines.push("YOUR NAME");
    lines.push(career!.title);
    lines.push(
      "your.email@example.com | +91 98765 43210 | linkedin.com/in/yourname | github.com/yourname",
    );
    lines.push("");
    lines.push("OBJECTIVE");
    lines.push(rt.objective);
    lines.push("");
    lines.push("KEY SKILLS");
    lines.push(rt.keySkills.join(" | "));
    lines.push("");
    lines.push("EXPERIENCE");
    for (const exp of rt.sampleExperience) {
      lines.push(`${exp.role} — ${exp.company} (${exp.duration})`);
      for (const b of exp.bullets) lines.push(`  • ${b}`);
    }
    lines.push("");
    lines.push("PROJECTS");
    for (const p of rt.sampleProjects) {
      lines.push(`${p.name}: ${p.description}`);
      lines.push(`  Tech: ${p.tech.join(", ")}`);
    }
    lines.push("");
    lines.push("EDUCATION");
    lines.push(
      "B.Tech in Computer Science / Electronics — XYZ University, 2021–2025",
    );
    lines.push("");
    lines.push("CERTIFICATIONS");
    for (const cert of rt.certifications) lines.push(`  • ${cert}`);
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${career!.id}-resume-template.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Print-hidden header */}
      <header className="no-print sticky top-0 z-30 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={() =>
              navigate({ to: "/career/$id", params: { id: id ?? "" } })
            }
            data-ocid="resume.back_button"
            className="text-muted-foreground hover:text-foreground gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {career.title}
          </Button>
          <h1 className="font-heading text-lg font-bold text-foreground hidden sm:block">
            Sample Resume — {career.title}
          </h1>
          <Button
            onClick={handleDownload}
            data-ocid="resume.download_button"
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Tip card */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="no-print mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-amber-200 text-sm"
        >
          ✏️ Use this as a template. Replace placeholder sections with your real
          details.
        </motion.div>

        {/* Resume Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          data-ocid="resume.card"
          className="bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden print-area"
        >
          {/* Resume Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-8 py-7">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Your Name
            </h2>
            <p className="text-lg text-slate-300 mt-1 font-medium">
              {career.title}
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                your.email@example.com
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                +91 98765 43210
              </span>
              <span className="flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5" />
                linkedin.com/in/yourname
              </span>
              <span className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5" />
                github.com/yourname
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                India
              </span>
            </div>
          </div>

          <div className="px-8 py-7 space-y-7">
            {/* Objective */}
            <section>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-2 border-b border-slate-200 pb-1">
                Objective
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {rt.objective}
              </p>
            </section>

            {/* Key Skills */}
            <section>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-2 border-b border-slate-200 pb-1">
                Key Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {rt.keySkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-3 border-b border-slate-200 pb-1">
                Experience
              </h3>
              {rt.sampleExperience.map((exp) => (
                <div key={exp.role} className="mb-4">
                  <div className="flex items-start justify-between flex-wrap gap-1">
                    <div>
                      <p className="font-bold text-gray-900">{exp.role}</p>
                      <p className="text-sm text-slate-600 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      {exp.duration}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {exp.bullets.map((b) => (
                      <li key={b} className="text-sm text-gray-700 flex gap-2">
                        <span className="text-slate-400 mt-0.5">•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Projects */}
            <section>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-3 border-b border-slate-200 pb-1">
                Projects
              </h3>
              {rt.sampleProjects.map((proj) => (
                <div key={proj.name} className="mb-4">
                  <p className="font-bold text-gray-900">{proj.name}</p>
                  <p className="text-sm text-gray-700 mt-0.5">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-semibold border border-blue-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Education */}
            <section>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-2 border-b border-slate-200 pb-1">
                Education
              </h3>
              <div className="flex items-start justify-between flex-wrap gap-1">
                <div>
                  <p className="font-bold text-gray-900">
                    B.Tech in Computer Science / Electronics
                  </p>
                  <p className="text-sm text-slate-600">XYZ University</p>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  2021 – 2025
                </span>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-2 border-b border-slate-200 pb-1">
                Certifications
              </h3>
              <ul className="space-y-1">
                {rt.certifications.map((cert) => (
                  <li key={cert} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-blue-400 mt-0.5">✦</span>
                    {cert}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </motion.div>

        {/* Print notice */}
        <p className="no-print text-center text-xs text-muted-foreground mt-6">
          Tip: Use Ctrl+P (or Cmd+P) to print this resume directly from your
          browser.
        </p>
      </main>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .print-area { box-shadow: none !important; border-radius: 0 !important; }
        }
      `}</style>
    </div>
  );
}
