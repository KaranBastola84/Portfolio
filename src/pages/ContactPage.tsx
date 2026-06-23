import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FileType,
  GitCommit,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Globe,
} from "lucide-react";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

interface FormState {
  senderName: string;
  email: string;
  body: string;
}

interface FormErrors {
  senderName?: string;
  email?: string;
  body?: string;
}

export function ContactPage() {
  const [form, setForm] = useState<FormState>({
    senderName: "",
    email: "",
    body: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (data: FormState): FormErrors => {
    const e: FormErrors = {};
    if (!data.senderName.trim())
      e.senderName = 'Property "senderName" is required: string';
    if (!data.email.trim()) {
      e.email = 'Property "email" is required: string';
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      e.email = "Type mismatch: expected valid email format";
    }
    if (!data.body.trim()) e.body = 'Property "body" is required: string';
    else if (data.body.trim().length < 10)
      e.body = "Minimum length constraint: 10 characters";
    return e;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) {
      setErrors(validate(next));
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async () => {
    const e = validate(form);
    setErrors(e);
    setTouched({ senderName: true, email: true, body: true });
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          senderName: form.senderName,
          email: form.email,
          body: form.body,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setSubmitError("Push failed. Remote unreachable — try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const isValid = Object.keys(validate(form)).length === 0;
  const totalChars =
    form.senderName.length + form.email.length + form.body.length;
  const linterStatus = Object.keys(errors).length === 0 ? "clean" : "errors";
  const syncStatus = submitting ? "syncing" : submitted ? "synced" : "idle";

  return (
    <div className="min-h-full flex flex-col lg:flex-row select-none">
      <div className="flex-1 overflow-auto p-4 md:p-6 select-text">
        <div className="flex items-center gap-2 mb-4 text-obsidian-muted select-none">
          <FileType size={12} className="text-secondary" />
          <span className="text-[11px] font-mono">src / forms /</span>
          <span className="text-[11px] text-secondary font-mono font-semibold">
            contact.ts
          </span>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          {/* TS Interface definition */}
          <div className="glass-panel rounded-lg p-5 mb-6 shadow-sm select-none">
            <div className="font-mono text-xs md:text-sm leading-relaxed">
              <div>
                <span className="text-secondary font-bold">interface</span>{" "}
                <span className="text-primary font-bold">ContactForm</span>
                <span className="text-obsidian-muted ml-1">{"{"}</span>
              </div>
              <div className="pl-6 border-l border-obsidian-border/30 ml-2 py-1 space-y-1">
                <div>
                  <span className="text-primary">senderName</span>
                  <span className="text-obsidian-muted">: </span>
                  <span className="text-secondary">string</span>
                  <span className="text-obsidian-muted">;</span>
                </div>
                <div>
                  <span className="text-primary">email</span>
                  <span className="text-obsidian-muted">: </span>
                  <span className="text-secondary">string</span>
                  <span className="text-obsidian-muted">;</span>
                </div>
                <div>
                  <span className="text-primary">body</span>
                  <span className="text-obsidian-muted">: </span>
                  <span className="text-secondary">string</span>
                  <span className="text-obsidian-muted">;</span>
                </div>
              </div>
              <div className="text-obsidian-muted">{"}"}</div>
            </div>
          </div>

          {/* Form as TS object literal */}
          <div className="font-mono text-xs md:text-sm">
            <div className="mb-6 select-none">
              <span className="text-secondary font-bold">const</span>{" "}
              <span className="text-obsidian-text">contactForm: </span>
              <span className="text-primary font-bold">ContactForm</span>
              <span className="text-obsidian-muted ml-1">=</span>
              <span className="text-tertiary ml-2">{"{"}</span>
            </div>

            {/* senderName field */}
            <div className="mb-5 pl-6 border-l border-obsidian-border/30 ml-2 py-1 font-mono">
              <div className="flex items-center gap-2 mb-1.5 select-none text-[11px]">
                <span className="text-primary">senderName</span>
                <span className="text-obsidian-muted">:</span>
                {errors.senderName ? (
                  <span className="text-error text-[10px] flex items-center gap-1">
                    <AlertTriangle size={10} />
                    {errors.senderName}
                  </span>
                ) : (
                  <span className="text-obsidian-dim italic">
                    // Enter your name
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 bg-black/45 border border-obsidian-border rounded-sm px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all min-w-0">
                <span className="text-tertiary select-none">"</span>
                <input
                  className="flex-1 bg-transparent border-0 text-obsidian-text outline-none p-0 min-w-0"
                  placeholder="Karan Bastola"
                  value={form.senderName}
                  onChange={(e) => handleChange("senderName", e.target.value)}
                  onBlur={() => handleBlur("senderName")}
                />
                <span className="text-tertiary select-none">"</span>
              </div>
            </div>

            {/* email field */}
            <div className="mb-5 pl-6 border-l border-obsidian-border/30 ml-2 py-1 font-mono">
              <div className="flex items-center gap-2 mb-1.5 select-none text-[11px]">
                <span className="text-primary">email</span>
                <span className="text-obsidian-muted">:</span>
                {errors.email ? (
                  <span className="text-error text-[10px] flex items-center gap-1">
                    <AlertTriangle size={10} />
                    {errors.email}
                  </span>
                ) : (
                  <span className="text-obsidian-dim italic">
                    // Enter your email address
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 bg-black/45 border border-obsidian-border rounded-sm px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all min-w-0">
                <span className="text-tertiary select-none">"</span>
                <input
                  className="flex-1 bg-transparent border-0 text-obsidian-text outline-none p-0 min-w-0"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                />
                <span className="text-tertiary select-none">"</span>
              </div>
            </div>

            {/* body field */}
            <div className="mb-5 pl-6 border-l border-obsidian-border/30 ml-2 py-1 font-mono">
              <div className="flex items-center gap-2 mb-1.5 select-none text-[11px]">
                <span className="text-primary">body</span>
                <span className="text-obsidian-muted">:</span>
                {errors.body ? (
                  <span className="text-error text-[10px] flex items-center gap-1">
                    <AlertTriangle size={10} />
                    {errors.body}
                  </span>
                ) : (
                  <span className="text-obsidian-dim italic">
                    // Describe your project, inquiry, or message
                  </span>
                )}
              </div>
              <div className="flex items-start gap-1.5 bg-black/45 border border-obsidian-border rounded-sm px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all min-w-0">
                <span className="text-tertiary select-none mt-1">"</span>
                <textarea
                  className="flex-1 bg-transparent border-0 text-obsidian-text outline-none p-0 min-w-0 resize-none font-sans"
                  rows={5}
                  placeholder="Write your message details..."
                  value={form.body}
                  onChange={(e) => handleChange("body", e.target.value)}
                  onBlur={() => handleBlur("body")}
                />
                <span className="text-tertiary select-none mt-auto mb-1">
                  "
                </span>
              </div>
            </div>

            <div className="text-obsidian-muted select-none">{"}"}</div>
          </div>

          {/* Submit as commit */}
          <div className="mt-6 flex flex-wrap items-center gap-4 select-none">
            <button
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs font-bold font-mono transition-all cursor-pointer ${
                isValid && !submitting && !submitted
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:opacity-95 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 border-0"
                  : submitted
                    ? "bg-tertiary/10 text-tertiary border border-tertiary/30 cursor-default"
                    : "bg-obsidian-surface text-obsidian-dim border border-obsidian-border cursor-not-allowed"
              }`}
              onClick={handleSubmit}
              disabled={submitting || submitted || !isValid}
            >
              {submitting ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  Pushing...
                </>
              ) : submitted ? (
                <>
                  <CheckCircle size={13} />
                  Committed
                </>
              ) : (
                <>
                  <GitCommit size={13} />
                  Commit Message
                </>
              )}
            </button>

            <span className="text-[11px] text-obsidian-muted font-mono select-none">
              {submitError
                ? submitError
                : submitted
                  ? "Successfully pushed to origin/main."
                  : "Ready to push message commit when form is valid."}
            </span>
          </div>
        </div>
      </div>

      {/* Status Panel */}
      <div className="w-full lg:w-64 shrink-0 border-t lg:border-t-0 lg:border-l border-obsidian-border bg-obsidian-surface/40 backdrop-blur-md p-4 md:p-6 overflow-auto select-none font-mono">
        <div className="mb-6">
          <div className="text-[10px] font-bold text-obsidian-muted uppercase tracking-wider mb-3">
            linter_status
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`w-2 h-2 rounded-full ${linterStatus === "clean" ? "bg-tertiary animate-pulse" : "bg-error"}`}
              />
              <span
                className={
                  linterStatus === "clean" ? "text-tertiary" : "text-error"
                }
              >
                {linterStatus === "clean"
                  ? "no errors detected"
                  : `${Object.keys(errors).length} type errors`}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-obsidian-muted/80">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
              eslint: passed
            </div>
            <div className="flex items-center gap-2 text-xs text-obsidian-muted/80">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
              prettier: formatted
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-[10px] font-bold text-obsidian-muted uppercase tracking-wider mb-3">
            remote_sync
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  syncStatus === "synced"
                    ? "bg-tertiary"
                    : syncStatus === "syncing"
                      ? "bg-secondary animate-pulse"
                      : "bg-obsidian-dim"
                }`}
              />
              <span
                className={
                  syncStatus === "synced"
                    ? "text-tertiary font-semibold"
                    : syncStatus === "syncing"
                      ? "text-secondary font-semibold"
                      : "text-obsidian-dim"
                }
              >
                {syncStatus === "synced"
                  ? "synced to remote"
                  : syncStatus === "syncing"
                    ? "pushing to origin..."
                    : "not synced"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-obsidian-muted/70">
              <Globe size={11} className="text-primary" />
              <span className="truncate">origin: api.dev/contact</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-[10px] font-bold text-obsidian-muted uppercase tracking-wider mb-3">
            form_metrics
          </div>
          <div className="space-y-2.5 text-xs text-obsidian-muted">
            <div className="flex justify-between">
              <span>chars_count</span>
              <span className="text-primary-fixed-dim">{totalChars}</span>
            </div>
            <div className="flex justify-between">
              <span>fields_filled</span>
              <span className="text-primary-fixed-dim">
                {
                  [form.senderName, form.email, form.body].filter(Boolean)
                    .length
                }
                /3
              </span>
            </div>
            <div className="flex justify-between">
              <span>type_safety</span>
              <span className="text-tertiary font-bold">
                {isValid ? "100%" : "unsafe"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
