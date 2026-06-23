import { useState } from "react";
import {
  FileType,
  GitCommit,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Globe,
} from "lucide-react";

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
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const isValid = Object.keys(validate(form)).length === 0;
  const totalChars =
    form.senderName.length + form.email.length + form.body.length;
  const linterStatus = Object.keys(errors).length === 0 ? "clean" : "errors";
  const syncStatus = submitting ? "syncing" : submitted ? "synced" : "idle";

  return (
    <div className="min-h-full flex flex-col lg:flex-row">
      <div className="flex-1 overflow-auto p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4 text-obsidian-muted">
          <FileType size={14} className="text-obsidian-keyword" />
          <span className="text-xs">src / forms /</span>
          <span className="text-xs text-obsidian-keyword">contact.ts</span>
        </div>

        <div className="max-w-xl mx-auto">
          {/* TS Interface definition */}
          <div className="glass-panel rounded-lg p-4 mb-6">
            <div className="font-mono text-sm leading-relaxed">
              <div>
                <span className="text-obsidian-keyword">interface</span>{" "}
                <span className="text-obsidian-function">ContactForm</span>
                <span className="text-obsidian-text"> {"{"}</span>
              </div>
              <div className="pl-4 md:pl-6">
                <span className="text-obsidian-property">senderName</span>
                <span className="text-obsidian-text">: </span>
                <span className="text-obsidian-keyword">string</span>
                <span className="text-obsidian-text">;</span>
              </div>
              <div className="pl-4 md:pl-6">
                <span className="text-obsidian-property">email</span>
                <span className="text-obsidian-text">: </span>
                <span className="text-obsidian-keyword">string</span>
                <span className="text-obsidian-text">;</span>
              </div>
              <div className="pl-4 md:pl-6">
                <span className="text-obsidian-property">body</span>
                <span className="text-obsidian-text">: </span>
                <span className="text-obsidian-keyword">string</span>
                <span className="text-obsidian-text">;</span>
              </div>
              <div className="text-obsidian-text">{"}"}</div>
            </div>
          </div>

          {/* Form as TS object literal */}
          <div className="font-mono text-sm">
            <div className="mb-4">
              <span className="text-obsidian-keyword">const</span>{" "}
              <span className="text-obsidian-text">contactForm: </span>
              <span className="text-obsidian-function">ContactForm</span>
              <span className="text-obsidian-text"> = </span>
              <span className="text-obsidian-text">{"{"}</span>
            </div>

            {/* senderName field */}
            <div className="mb-4 pl-4 md:pl-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-obsidian-property">senderName</span>
                <span className="text-obsidian-text">:</span>
                {errors.senderName && (
                  <span className="text-obsidian-error text-xs flex items-center gap-1">
                    <AlertTriangle size={10} />
                    {errors.senderName}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-obsidian-string">"</span>
                <input
                  className="flex-1 bg-obsidian-bg border border-obsidian-border rounded px-3 py-2 text-obsidian-text outline-none focus:border-obsidian-accent focus:ring-1 focus:ring-obsidian-accent/30 transition-all min-w-0"
                  placeholder="Enter your name..."
                  value={form.senderName}
                  onChange={(e) => handleChange("senderName", e.target.value)}
                  onBlur={() => handleBlur("senderName")}
                />
                <span className="text-obsidian-string">"</span>
              </div>
              <div className="text-obsidian-comment text-xs mt-1">
                // {form.senderName.length} characters
              </div>
            </div>

            {/* email field */}
            <div className="mb-4 pl-4 md:pl-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-obsidian-property">email</span>
                <span className="text-obsidian-text">:</span>
                {errors.email && (
                  <span className="text-obsidian-error text-xs flex items-center gap-1">
                    <AlertTriangle size={10} />
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-obsidian-string">"</span>
                <input
                  className="flex-1 bg-obsidian-bg border border-obsidian-border rounded px-3 py-2 text-obsidian-text outline-none focus:border-obsidian-accent focus:ring-1 focus:ring-obsidian-accent/30 transition-all min-w-0"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                />
                <span className="text-obsidian-string">"</span>
              </div>
              <div className="text-obsidian-comment text-xs mt-1">
                // {form.email.length} characters
              </div>
            </div>

            {/* body field */}
            <div className="mb-4 pl-4 md:pl-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-obsidian-property">body</span>
                <span className="text-obsidian-text">:</span>
                {errors.body && (
                  <span className="text-obsidian-error text-xs flex items-center gap-1">
                    <AlertTriangle size={10} />
                    {errors.body}
                  </span>
                )}
              </div>
              <div className="flex items-start gap-2">
                <span className="text-obsidian-string">"</span>
                <textarea
                  className="flex-1 bg-obsidian-bg border border-obsidian-border rounded px-3 py-2 text-obsidian-text outline-none focus:border-obsidian-accent focus:ring-1 focus:ring-obsidian-accent/30 transition-all min-w-0 resize-none"
                  rows={5}
                  placeholder="Describe your message, project, or inquiry..."
                  value={form.body}
                  onChange={(e) => handleChange("body", e.target.value)}
                  onBlur={() => handleBlur("body")}
                />
                <span className="text-obsidian-string">"</span>
              </div>
              <div className="text-obsidian-comment text-xs mt-1">
                // {form.body.length} characters (min 10)
              </div>
            </div>

            <div className="text-obsidian-text">{"}"}</div>
          </div>

          {/* Submit as commit */}
          <div className="mt-6 flex items-center gap-3">
            <button
              className={`inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all ${
                isValid && !submitting && !submitted
                  ? "bg-obsidian-success/10 text-obsidian-success border border-obsidian-success/30 hover:bg-obsidian-success/20"
                  : submitted
                    ? "bg-obsidian-success/10 text-obsidian-success border border-obsidian-success/30 cursor-default"
                    : "bg-obsidian-surface text-obsidian-dim border border-obsidian-border cursor-not-allowed"
              }`}
              onClick={handleSubmit}
              disabled={submitting || submitted || !isValid}
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Pushing...
                </>
              ) : submitted ? (
                <>
                  <CheckCircle size={14} />
                  Committed
                </>
              ) : (
                <>
                  <GitCommit size={14} />
                  Commit Message
                </>
              )}
            </button>

            <span className="text-xs text-obsidian-dim">
              {submitted
                ? "Successfully pushed to origin/main"
                : "Ready to push when all fields are valid"}
            </span>
          </div>
        </div>
      </div>

      {/* Status Panel */}
      <div className="w-full lg:w-64 shrink-0 border-t lg:border-t-0 lg:border-l border-obsidian-border bg-obsidian-surface/50 p-4 md:p-6 overflow-auto">
        <div className="mb-6">
          <div className="text-xs font-semibold text-obsidian-muted uppercase tracking-wide mb-3">
            Linter Status
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`w-2 h-2 rounded-full ${linterStatus === "clean" ? "bg-obsidian-success" : "bg-obsidian-error"}`}
              />
              <span
                className={
                  linterStatus === "clean"
                    ? "text-obsidian-success"
                    : "text-obsidian-error"
                }
              >
                {linterStatus === "clean"
                  ? "No errors detected"
                  : `${Object.keys(errors).length} type errors`}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-obsidian-muted">
              <span className="w-2 h-2 rounded-full bg-obsidian-success" />
              ESLint: passed
            </div>
            <div className="flex items-center gap-2 text-xs text-obsidian-muted">
              <span className="w-2 h-2 rounded-full bg-obsidian-success" />
              Prettier: formatted
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-xs font-semibold text-obsidian-muted uppercase tracking-wide mb-3">
            Remote Sync
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  syncStatus === "synced"
                    ? "bg-obsidian-success"
                    : syncStatus === "syncing"
                      ? "bg-obsidian-warning animate-pulse"
                      : "bg-obsidian-dim"
                }`}
              />
              <span
                className={
                  syncStatus === "synced"
                    ? "text-obsidian-success"
                    : syncStatus === "syncing"
                      ? "text-obsidian-warning"
                      : "text-obsidian-dim"
                }
              >
                {syncStatus === "synced"
                  ? "Synced to remote"
                  : syncStatus === "syncing"
                    ? "Pushing to origin..."
                    : "Not synced"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-obsidian-muted">
              <Globe size={12} />
              Origin: https://api.portfolio.dev/contact
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-xs font-semibold text-obsidian-muted uppercase tracking-wide mb-3">
            Form Metrics
          </div>
          <div className="space-y-2 text-xs text-obsidian-muted">
            <div className="flex justify-between">
              <span>Total characters</span>
              <span className="text-obsidian-text">{totalChars}</span>
            </div>
            <div className="flex justify-between">
              <span>Fields filled</span>
              <span className="text-obsidian-text">
                {
                  [form.senderName, form.email, form.body].filter(Boolean)
                    .length
                }
                /3
              </span>
            </div>
            <div className="flex justify-between">
              <span>Type coverage</span>
              <span className="text-obsidian-accent">
                {isValid ? "100%" : "Incomplete"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
