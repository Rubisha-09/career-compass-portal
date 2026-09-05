import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Compass,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Mode = "login" | "signup";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const update =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const switchMode = (m: Mode) => {
    setMode(m);
    setErrors({});
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (mode === "signup" && !form.name.trim())
      errs.name = "Full name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!validateEmail(form.email))
      errs.email = "Enter a valid email address";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    if (mode === "signup") {
      if (!form.confirmPassword)
        errs.confirmPassword = "Please confirm your password";
      else if (form.password !== form.confirmPassword)
        errs.confirmPassword = "Passwords do not match";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const user = {
      name: mode === "signup" ? form.name : form.email.split("@")[0],
      email: form.email,
      isLoggedIn: true,
    };
    localStorage.setItem("careerCompassUser", JSON.stringify(user));
    setLoading(false);
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-background">
      {/* MOBILE TOP BANNER (visible on mobile/tablet only) */}
      <div className="relative lg:hidden w-full h-48 sm:h-64 overflow-hidden flex-shrink-0">
        <img
          src="/assets/generated/login-hero.dim_800x900.jpg"
          alt="Career Compass"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background/95" />
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
          <div className="w-14 h-14 rounded-2xl bg-primary/30 border-2 border-primary/60 flex items-center justify-center backdrop-blur-sm shadow-glow">
            <Compass className="w-7 h-7 text-primary" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground drop-shadow-lg">
            Career Compass
          </span>
          <p className="text-muted-foreground text-xs text-center px-4">
            AI-powered career guidance for tech students
          </p>
        </div>
      </div>

      {/* LEFT: Hero Panel (desktop only) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <img
          src="/assets/generated/login-hero.dim_800x900.jpg"
          alt="Career Compass"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/50 to-transparent" />
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center">
              <Compass className="w-5 h-5 text-primary" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              Career Compass
            </span>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <h1 className="font-heading text-5xl font-bold text-foreground leading-tight mb-4">
                Discover Your
                <br />
                <span className="gradient-text">Perfect Tech</span>
                <br />
                Career Path
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-sm">
                Take our AI-powered career quiz, explore detailed roadmaps, and
                get personalized guidance for your dream tech career.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex gap-6"
            >
              {[
                { val: "9+", label: "Career Paths" },
                { val: "100+", label: "Skill Guides" },
                { val: "50+", label: "Top Companies" },
              ].map(({ val, label }) => (
                <div
                  key={label}
                  className="glass-card rounded-xl px-4 py-3 text-center"
                >
                  <div className="font-heading text-2xl font-bold text-primary">
                    {val}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* RIGHT: Form Panel */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-10"
      >
        <div className="w-full max-w-md">
          {/* Mobile logo - hidden since banner above handles this */}

          <div className="glass-card rounded-3xl p-8">
            {/* Tab Switcher */}
            <div className="flex rounded-2xl bg-muted/40 p-1 mb-8">
              <button
                type="button"
                data-ocid="login.tab"
                onClick={() => switchMode("login")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold font-heading transition-all ${
                  mode === "login"
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                data-ocid="signup.tab"
                onClick={() => switchMode("signup")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold font-heading transition-all ${
                  mode === "signup"
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign Up
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="mb-6">
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    {mode === "login" ? "Welcome back" : "Create account"}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    {mode === "login"
                      ? "Sign in to continue your career journey"
                      : "Join thousands discovering their tech career path"}
                  </p>
                </div>

                {/* Name field (signup only) */}
                {mode === "signup" && (
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="signup-name"
                      className="text-sm font-medium text-foreground"
                    >
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        data-ocid="signup.name_input"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={update("name")}
                        className="pl-10 bg-muted/40 border-border/50 focus:border-primary/60 focus:ring-primary/20 rounded-xl h-11"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>
                )}

                {/* Email */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor={mode === "login" ? "login-email" : "signup-email"}
                    className="text-sm font-medium text-foreground"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id={mode === "login" ? "login-email" : "signup-email"}
                      data-ocid={
                        mode === "login"
                          ? "login.email_input"
                          : "signup.email_input"
                      }
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={update("email")}
                      className="pl-10 bg-muted/40 border-border/50 focus:border-primary/60 focus:ring-primary/20 rounded-xl h-11"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor={
                      mode === "login" ? "login-password" : "signup-password"
                    }
                    className="text-sm font-medium text-foreground"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id={
                        mode === "login" ? "login-password" : "signup-password"
                      }
                      data-ocid={
                        mode === "login"
                          ? "login.password_input"
                          : "signup.password_input"
                      }
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={update("password")}
                      className="pl-10 pr-10 bg-muted/40 border-border/50 focus:border-primary/60 focus:ring-primary/20 rounded-xl h-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password (signup only) */}
                {mode === "signup" && (
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="signup-confirm"
                      className="text-sm font-medium text-foreground"
                    >
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-confirm"
                        data-ocid="signup.confirm_password_input"
                        type={showConfirm ? "text" : "password"}
                        placeholder="••••••••"
                        value={form.confirmPassword}
                        onChange={update("confirmPassword")}
                        className="pl-10 pr-10 bg-muted/40 border-border/50 focus:border-primary/60 focus:ring-primary/20 rounded-xl h-11"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirm ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />{" "}
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}

                <Button
                  type="submit"
                  data-ocid={
                    mode === "login"
                      ? "login.submit_button"
                      : "signup.submit_button"
                  }
                  disabled={loading}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-bold rounded-xl text-base mt-2 shadow-glow transition-all"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      {mode === "login"
                        ? "Signing in..."
                        : "Creating account..."}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {mode === "login" ? "Sign In" : "Create Account"}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground pt-1">
                  {mode === "login"
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() =>
                      switchMode(mode === "login" ? "signup" : "login")
                    }
                    className="text-primary hover:text-primary/80 font-semibold transition-colors"
                  >
                    {mode === "login" ? "Sign Up" : "Login"}
                  </button>
                </p>
              </motion.form>
            </AnimatePresence>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            © {new Date().getFullYear()}. Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
