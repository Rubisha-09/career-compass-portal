import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Copy,
  FileText,
  Sparkles,
  Upload,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { type Career, getCareerById } from "../data/careers";

interface LinkedInContent {
  headline: string;
  summary: string;
  featuredSkills: string[];
  connectionMessage: string;
  postIdeas: string[];
}

function generateLinkedInContent(
  career: Career,
  name: string,
  role: string,
  exp: number,
  skills: string[],
  achievement: string,
): LinkedInContent {
  const expLabel =
    exp === 0 ? "fresher" : `${exp} year${exp > 1 ? "s" : ""} of experience`;
  const displayName = name || "a passionate tech student";
  const displayRole = role || "B.Tech Student";
  const topSkills = skills.filter(Boolean).slice(0, 3);
  const toolList = career.tools.slice(0, 3).join(", ");

  const headline = `${
    name ? `${name} | ` : ""
  }Aspiring ${career.title} | ${topSkills.slice(0, 2).join(" | ")} | ${displayRole}`;

  const summary = `Hi, I'm ${displayName} aspiring to build a career as a ${career.title}. With a strong foundation in ${topSkills.join(", ")}, I am actively developing my skills to meet industry standards.

As a ${expLabel}, I have been working on projects involving ${toolList} and continuously learning through platforms like Coursera and Udemy.${achievement ? ` Recently, I ${achievement}.` : ""}

I am looking to connect with professionals in the ${career.title} space to learn, collaborate, and grow. Feel free to connect!`;

  const featuredSkills = [
    ...career.requiredSkillsForGap.slice(0, 6),
    ...topSkills,
  ]
    .filter((s, i, arr) => arr.indexOf(s) === i)
    .slice(0, 10);

  const connectionMessage = `Hi [Name],

I'm ${displayName}, currently ${displayRole} and exploring a career in ${career.title}. I came across your profile and was impressed by your work in this field.

I'd love to connect, learn from your experience, and stay updated with your insights. Looking forward to connecting!

Best regards,
${name || "Your Name"}`;

  const postIdeas = [
    `🚀 Just completed a project using ${career.tools[0] ?? "industry tools"}! Here's what I learned:

✅ [Key insight 1]
✅ [Key insight 2]
✅ [Key insight 3]

As an aspiring ${career.title}, every project teaches me something new. What was your biggest learning from your first ${career.title} project? Drop it in the comments! 👇

#${career.title.replace(/\s+|\/|\(/g, "")} #StudentLife #TechLearning #CareerGrowth`,
    `💡 3 things I wish I knew earlier as someone pursuing ${career.title}:

1️⃣ ${career.companyExpectations[0] ?? "Start with fundamentals"}
2️⃣ ${career.companyExpectations[1] ?? "Build real projects"}
3️⃣ Never stop learning — the field evolves fast!

Currently learning ${career.languages[0] ?? "new skills"} and building projects to land my first role.

If you're on the same journey, let's connect! 🤝

#${career.title.replace(/\s+|\/|\(/g, "")} #LearningInPublic #TechCareers`,
  ];

  return { headline, summary, featuredSkills, connectionMessage, postIdeas };
}

interface CopyCardProps {
  title: string;
  content: string | string[];
  ocid: string;
  copyIndex: number;
  copiedIdx: number | null;
  onCopy: (text: string, idx: number) => void;
}

function CopyCard({
  title,
  content,
  ocid,
  copyIndex,
  copiedIdx,
  onCopy,
}: CopyCardProps) {
  const text = Array.isArray(content) ? content.join("\n") : content;
  const copied = copiedIdx === copyIndex;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: copyIndex * 0.08 }}
      data-ocid={ocid}
      className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/40 bg-blue-500/5">
        <span className="font-semibold text-sm text-foreground">{title}</span>
        <button
          type="button"
          data-ocid={`linkedin.copy_button.${copyIndex}`}
          onClick={() => onCopy(text, copyIndex)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1 rounded-md hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="px-5 py-4">
        {Array.isArray(content) ? (
          <ul className="space-y-1.5">
            {content.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm text-muted-foreground"
              >
                <span className="text-blue-400 mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
            {content}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function LinkedInPage() {
  const navigate = useNavigate();
  const { id } = useParams({ from: "/career/$id/linkedin" });
  const career = getCareerById(id ?? "");

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [exp, setExp] = useState(0);
  const [skills, setSkills] = useState<[string, string, string]>([
    career?.requiredSkillsForGap[0] ?? "",
    career?.requiredSkillsForGap[1] ?? "",
    career?.requiredSkillsForGap[2] ?? "",
  ]);
  const [achievement, setAchievement] = useState("");
  const [generated, setGenerated] = useState<LinkedInContent | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!career) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Career not found.</p>
      </div>
    );
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleFilesDrop(files: FileList) {
    const names = Array.from(files).map((f) => f.name);
    setUploadedFiles((prev) => [...prev, ...names].slice(0, 8));
  }

  function handleGenerate() {
    if (!career) return;
    const result = generateLinkedInContent(
      career as Career,
      name,
      role,
      exp,
      skills,
      achievement,
    );
    setGenerated(result);
    setCopiedIdx(null);
  }

  function handleCopy(text: string, idx: number) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedIdx(null), 2000);
    });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={() =>
              navigate({ to: "/career/$id", params: { id: id ?? "" } })
            }
            className="text-muted-foreground hover:text-foreground gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#0A66C2] flex items-center justify-center">
              <span className="text-white text-xs font-bold">in</span>
            </div>
            <h1 className="font-heading text-lg font-bold text-foreground">
              LinkedIn Profile Builder — {career.title}
            </h1>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Input Panel */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-6 space-y-6"
            >
              <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
                <User className="w-5 h-5 text-[#0A66C2]" />
                Your Profile Info
              </h2>

              {/* Photo Upload */}
              <div className="flex flex-col items-center gap-3">
                <button
                  type="button"
                  className="w-24 h-24 rounded-full border-2 border-dashed border-border hover:border-[#0A66C2]/60 bg-muted/30 flex items-center justify-center overflow-hidden cursor-pointer transition-colors"
                  onClick={() => photoInputRef.current?.click()}
                  data-ocid="linkedin.photo_upload_button"
                >
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  )}
                </button>
                <p className="text-xs text-muted-foreground">
                  Upload your photo for preview
                </p>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-foreground">
                  Full Name
                </Label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  data-ocid="linkedin.name_input"
                  className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/40"
                />
              </div>

              {/* Current Role */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-foreground">
                  Current Role / Year
                </Label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. 3rd Year B.Tech Student"
                  data-ocid="linkedin.role_input"
                  className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/40"
                />
              </div>

              {/* Experience Slider */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">
                  Years of Experience:{" "}
                  <span className="text-[#0A66C2] font-bold">
                    {exp === 0 ? "Fresher" : `${exp} yr${exp > 1 ? "s" : ""}`}
                  </span>
                </Label>
                <Slider
                  min={0}
                  max={5}
                  step={1}
                  value={[exp]}
                  onValueChange={([v]) => setExp(v)}
                  data-ocid="linkedin.experience_select"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 = Fresher</span>
                  <span>5 years</span>
                </div>
              </div>

              {/* Top 3 Skills */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Top 3 Skills I Already Have
                </Label>
                {([0, 1, 2] as const).map((i) => (
                  <input
                    key={i}
                    type="text"
                    value={skills[i]}
                    onChange={(e) => {
                      const updated: [string, string, string] = [...skills] as [
                        string,
                        string,
                        string,
                      ];
                      updated[i] = e.target.value;
                      setSkills(updated);
                    }}
                    placeholder={`Skill ${i + 1}`}
                    data-ocid={`linkedin.skill_input.${i + 1}`}
                    className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/40"
                  />
                ))}
              </div>

              {/* Achievement */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-foreground">
                  One Achievement (optional)
                </Label>
                <Textarea
                  value={achievement}
                  onChange={(e) => setAchievement(e.target.value)}
                  placeholder="e.g. Built an app used by 100+ users"
                  data-ocid="linkedin.achievement_textarea"
                  rows={3}
                  className="resize-none bg-background/60 border-border/60 focus:ring-[#0A66C2]/40"
                />
              </div>

              {/* File Dropzone */}
              <button
                className={`rounded-xl border-2 border-dashed p-5 text-center cursor-pointer transition-colors w-full ${
                  isDragging
                    ? "border-[#0A66C2] bg-[#0A66C2]/10"
                    : "border-border/50 hover:border-[#0A66C2]/50 bg-muted/20"
                }`}
                data-ocid="linkedin.file_dropzone"
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFilesDrop(e.dataTransfer.files);
                }}
                onClick={() => fileInputRef.current?.click()}
                type="button"
              >
                <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Upload certifications or projects (PDF/image)
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  Drag & drop or click — for reference
                </p>
                {uploadedFiles.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {uploadedFiles.map((f) => (
                      <li
                        key={f}
                        className="text-xs text-[#0A66C2]/80 flex items-center justify-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files && handleFilesDrop(e.target.files)
                  }
                />
              </button>

              <Button
                onClick={handleGenerate}
                data-ocid="linkedin.generate_button"
                className="w-full bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white font-bold gap-2 py-5"
              >
                <Sparkles className="w-4 h-4" />
                Generate LinkedIn Content
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>

          {/* RIGHT: Generated Content */}
          <div className="space-y-5">
            <AnimatePresence>
              {!generated ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#0A66C2]/10 border border-[#0A66C2]/20 flex items-center justify-center mb-4">
                    <span className="text-3xl">💼</span>
                  </div>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Fill in your details on the left and click Generate to see
                    your personalized LinkedIn content.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#0A66C2]" />
                    Your LinkedIn Content
                  </h2>
                  <CopyCard
                    title="🏷️ LinkedIn Headline"
                    content={generated.headline}
                    ocid="linkedin.headline_card"
                    copyIndex={1}
                    copiedIdx={copiedIdx}
                    onCopy={handleCopy}
                  />
                  <CopyCard
                    title="📝 About / Summary"
                    content={generated.summary}
                    ocid="linkedin.summary_card"
                    copyIndex={2}
                    copiedIdx={copiedIdx}
                    onCopy={handleCopy}
                  />
                  <CopyCard
                    title="⚡ Featured Skills"
                    content={generated.featuredSkills}
                    ocid="linkedin.skills_card"
                    copyIndex={3}
                    copiedIdx={copiedIdx}
                    onCopy={handleCopy}
                  />
                  <CopyCard
                    title="🤝 Connection Request Message"
                    content={generated.connectionMessage}
                    ocid="linkedin.connection_card"
                    copyIndex={4}
                    copiedIdx={copiedIdx}
                    onCopy={handleCopy}
                  />
                  <div
                    data-ocid="linkedin.post_card"
                    className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-5 py-3 border-b border-border/40 bg-blue-500/5">
                      <span className="font-semibold text-sm text-foreground">
                        📣 Sample Post Ideas
                      </span>
                    </div>
                    <div className="p-5 space-y-5">
                      {generated.postIdeas.map((post, i) => (
                        <div key={post.slice(0, 20)} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground font-semibold">
                              Post {i + 1}
                            </span>
                            <button
                              type="button"
                              data-ocid={`linkedin.copy_button.${i + 5}`}
                              onClick={() => handleCopy(post, i + 5)}
                              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-blue-500/10"
                            >
                              {copiedIdx === i + 5 ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                              {copiedIdx === i + 5 ? "Copied!" : "Copy"}
                            </button>
                          </div>
                          <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed bg-muted/20 rounded-lg p-3 border border-border/40">
                            {post}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
