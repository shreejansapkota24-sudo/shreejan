import { useState } from "react";
import { Send, Mail, User, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(2000, "Message too long"),
});

const InquiryForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = inquirySchema.safeParse({ name, email, message });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("inquiries").insert({
        name: result.data.name,
        email: result.data.email,
        message: result.data.message,
      });

      if (error) throw error;

      toast.success("Message sent!", {
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Inquiry submission error:", err);
      toast.error("Something went wrong", {
        description: "Please try again or contact me on Instagram.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="inquiry" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-glow text-primary font-medium text-sm mb-4 font-cyber">
            <MessageSquare className="w-4 h-4" />
            Inquiry
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-cyber text-glow mb-3">
            Have an inquiry or want more AI access?
          </h2>
          <p className="text-muted-foreground text-base">
            Send me a message — I'll get back to you as soon as I can.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="glass border-glow rounded-3xl p-6 md:p-8 space-y-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="inq-name" className="text-sm font-medium text-foreground flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-primary" /> Name
              </Label>
              <Input
                id="inq-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                maxLength={100}
                disabled={submitting}
                className="bg-background/40 border-primary/20 focus:border-primary/60"
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="inq-email" className="text-sm font-medium text-foreground flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary" /> Email
              </Label>
              <Input
                id="inq-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                maxLength={255}
                disabled={submitting}
                className="bg-background/40 border-primary/20 focus:border-primary/60"
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inq-message" className="text-sm font-medium text-foreground flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-primary" /> Message
            </Label>
            <Textarea
              id="inq-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me what you'd like to discuss, request more AI access, or share an opportunity..."
              rows={5}
              maxLength={2000}
              disabled={submitting}
              className="bg-background/40 border-primary/20 focus:border-primary/60 resize-none"
            />
            <div className="flex justify-between items-center">
              {errors.message ? (
                <p className="text-xs text-destructive">{errors.message}</p>
              ) : (
                <span className="text-xs text-muted-foreground">Min 10 characters</span>
              )}
              <span className="text-xs text-muted-foreground font-cyber">{message.length}/2000</span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 font-cyber text-sm gap-2"
            size="lg"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Inquiry
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default InquiryForm;
