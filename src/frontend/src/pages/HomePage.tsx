import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Brain,
  ChevronRight,
  Code2,
  Compass,
  Gamepad2,
  HelpCircle,
  Layers,
  Lightbulb,
  MapPin,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { CAREERS } from "../data/careers";

const PAIN_POINTS = [
  {
    icon: HelpCircle,
    text: "Which career path is right for me?",
    color: "text-blue-400",
  },
  {
    icon: Code2,
    text: "What programming languages should I learn?",
    color: "text-purple-400",
  },
  {
    icon: Target,
    text: "What skills do companies actually expect?",
    color: "text-emerald-400",
  },
  {
    icon: Layers,
    text: "What projects should I build for my portfolio?",
    color: "text-amber-400",
  },
  {
    icon: MapPin,
    text: "How do I plan my learning year by year?",
    color: "text-red-400",
  },
];

const FEATURES = [
  {
    icon: Brain,
    title: "AI Career Matching",
    desc: "Smart algorithm matches your interests to ideal career paths",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    icon: Target,
    title: "Skill Assessment",
    desc: "Personalized questions to analyze your strengths",
    color: "from-purple-500/20 to-purple-600/10",
  },
  {
    icon: MapPin,
    title: "Learning Roadmap",
    desc: "Year-by-year interactive career roadmap",
    color: "from-emerald-500/20 to-emerald-600/10",
  },
  {
    icon: Code2,
    title: "Languages to Learn",
    desc: "Know exactly which programming languages to master",
    color: "from-amber-500/20 to-amber-600/10",
  },
  {
    icon: BookOpen,
    title: "Courses & Certifications",
    desc: "Curated learning resources from top platforms",
    color: "from-red-500/20 to-red-600/10",
  },
  {
    icon: Lightbulb,
    title: "Project Ideas",
    desc: "Build real-world projects to grow your portfolio",
    color: "from-cyan-500/20 to-cyan-600/10",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/25 border border-primary/50 flex items-center justify-center shadow-[0_0_12px_rgba(var(--primary-rgb,99,102,241),0.4)]">
              <Compass className="w-5 h-5 text-primary drop-shadow-[0_0_6px_oklch(var(--primary)/0.8)]" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              Career Compass
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {["Home", "Careers", "Roadmap", "Projects"].map((link) => (
              <a
                key={link}
                href={link === "Home" ? "/" : `#${link.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-ocid={`nav.${link.toLowerCase()}.link`}
              >
                {link}
              </a>
            ))}
          </div>
          <Button
            size="sm"
            onClick={() => navigate({ to: "/quiz" })}
            data-ocid="nav.primary_button"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Start Assessment
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 animated-gradient" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.62 0.22 255 / 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.72 0.2 160 / 0.12) 0%, transparent 50%)",
          }}
        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-30 hidden lg:block">
          <img
            src="/assets/generated/hero-compass.dim_1200x600.png"
            alt="Career Compass"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 px-4 py-1.5 text-sm font-medium">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                AI-Powered Career Guidance
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-foreground">Career</span>
              <br />
              <span className="gradient-text">Compass</span>
              <br />
              <span className="text-foreground">Portal</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl text-muted-foreground font-medium mb-4"
            >
              Find Your Path. Build Your Future.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base text-muted-foreground max-w-lg mb-10 leading-relaxed"
            >
              AI-powered career guidance for future tech professionals. Take our
              skill assessment and get a personalized roadmap to your dream tech
              career.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={() => navigate({ to: "/quiz" })}
                data-ocid="home.primary_button"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-8 h-12 glow-blue"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Start Career Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  document
                    .getElementById("careers")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="home.secondary_button"
                className="border-border/60 text-foreground hover:bg-muted/40 h-12 font-semibold"
              >
                Explore Careers
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex items-center gap-6"
            >
              {[
                { label: "9 Career Paths", icon: Target },
                { label: "4-Year Roadmap", icon: MapPin },
                { label: "Free to Use", icon: Sparkles },
              ].map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
          <span className="text-xs">Scroll to explore</span>
          <ChevronRight className="w-4 h-4 rotate-90" />
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-red-500/10 text-red-400 border-red-500/20">
              The Problem
            </Badge>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Feeling Lost in Your Career?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Most engineering students face these struggles when choosing a
              tech career path.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {PAIN_POINTS.map(({ icon: Icon, text, color }) => (
              <motion.div
                key={text}
                variants={itemVariants}
                className="glass-card rounded-xl p-6 flex items-start gap-4 hover:border-border/60 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <p className="text-foreground font-medium">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 px-4 sm:px-6 relative">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at center, oklch(0.62 0.22 255 / 0.08) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              Our Solution
            </Badge>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Career Compass <span className="gradient-text">Guides You</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to go from confused student to job-ready
              professional.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`glass-card rounded-2xl p-6 bg-gradient-to-br ${color} border border-border/40 hover:border-border/70 transition-all cursor-default`}
              >
                <div className="w-12 h-12 rounded-xl bg-muted/60 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Quest Game Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 sm:p-10 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(59,130,246,0.08) 50%, rgba(236,72,153,0.08) 100%)",
              border: "1.5px solid rgba(168,85,247,0.3)",
            }}
          >
            {/* decorative blobs */}
            <div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
              }}
            />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(168,85,247,0.15)",
                  border: "1.5px solid rgba(168,85,247,0.4)",
                  boxShadow: "0 0 20px rgba(168,85,247,0.2)",
                }}
              >
                <Gamepad2 className="w-8 h-8" style={{ color: "#a855f7" }} />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    className="text-xs px-2 py-0.5 font-bold"
                    style={{
                      background: "rgba(168,85,247,0.2)",
                      color: "#a855f7",
                      border: "1px solid rgba(168,85,247,0.4)",
                    }}
                  >
                    NEW
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    5 challenges · ~5 min
                  </span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  🎮 Discover Your Career Through Play
                </h2>
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: "#a855f7" }}
                >
                  Try Tech Quest – Our Smart Career Game
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
                  Skip the quiz! Play 5 fun challenges and let our system
                  analyze your strengths to predict your perfect career.
                </p>

                <div className="flex flex-wrap gap-2 mt-3 mb-4">
                  {[
                    { icon: "🔢", label: "Logic" },
                    { icon: "🔍", label: "Patterns" },
                    { icon: "🎨", label: "Design" },
                    { icon: "🐛", label: "Bug Fix" },
                    { icon: "🔒", label: "Security" },
                  ].map((tag) => (
                    <span
                      key={tag.label}
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.75)",
                      }}
                    >
                      {tag.icon} {tag.label}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                size="lg"
                onClick={() => navigate({ to: "/techquest" })}
                data-ocid="home.techquest_button"
                className="font-bold px-8 h-12 rounded-xl flex-shrink-0"
                style={{ background: "#a855f7", color: "white" }}
              >
                Play Tech Quest 🎮
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Careers Preview */}
      <section id="careers" className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Career Paths
            </Badge>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Explore <span className="gradient-text">9 Career Paths</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              From software development to electrical engineering — find your
              fit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAREERS.map((career, i) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ scale: 1.02 }}
                data-ocid={`careers.item.${i + 1}`}
                className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:border-border/70 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: `${career.color}20` }}
                  >
                    {career.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground">
                      {career.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {career.companies.slice(0, 2).join(", ")}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {career.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {career.skills.slice(0, 3).map((skill) => (
                    <Badge
                      key={skill}
                      className="text-xs bg-muted/60 text-muted-foreground border-border/40"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    navigate({ to: "/career/$id", params: { id: career.id } })
                  }
                  className="w-full justify-between text-primary hover:bg-primary/10 hover:text-primary border border-primary/20 group-hover:border-primary/40 mt-1"
                  data-ocid="careers.career.button"
                >
                  View Roadmap
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 sm:p-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: "9+", label: "Career Paths" },
              { value: "4", label: "Year Roadmap" },
              { value: "50+", label: "Companies Listed" },
              { value: "100%", label: "Free Access" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-heading text-3xl sm:text-4xl font-bold gradient-text mb-2">
                  {value}
                </div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-60" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, oklch(0.62 0.22 255 / 0.15) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="w-24 h-24 rounded-3xl bg-primary/25 border-2 border-primary/50 flex items-center justify-center mx-auto mb-6"
              style={{
                boxShadow:
                  "0 0 30px oklch(0.62 0.22 255 / 0.5), 0 0 60px oklch(0.62 0.22 255 / 0.2)",
              }}
            >
              <Compass
                className="w-12 h-12 text-primary"
                style={{
                  filter: "drop-shadow(0 0 8px oklch(0.62 0.22 255 / 0.8))",
                }}
              />
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Start Your Career Journey{" "}
              <span className="gradient-text">Today</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Answer 5 quick questions and get your personalized career roadmap
              instantly.
            </p>
            <Button
              size="lg"
              onClick={() => navigate({ to: "/quiz" })}
              data-ocid="cta.primary_button"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 h-14 glow-blue"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Take Career Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-primary" />
              <span className="font-heading font-bold text-foreground">
                Career Compass Portal
              </span>
            </div>
            <div className="flex items-center gap-6">
              {["Home", "Careers", "Roadmap", "Projects", "Contact"].map(
                (link) => (
                  <a
                    key={link}
                    href={link === "Home" ? "/" : `#${link.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                ),
              )}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Career Compass Portal. Guiding future
              tech professionals.
            </p>
            <p>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
