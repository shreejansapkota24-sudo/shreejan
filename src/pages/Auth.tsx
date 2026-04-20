import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowLeft, User, LogIn, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type Stage = "credentials" | "otp";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [stage, setStage] = useState<Stage>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { signIn, signUp, verifyOtp, resendOtp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const validateForm = () => {
    const result = authSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Email not confirmed")) {
            toast({
              title: "Verify your email",
              description: "Please verify your email with the code we sent.",
            });
            await resendOtp(email);
            setStage("otp");
            setResendCooldown(45);
          } else if (error.message.includes("Invalid login credentials")) {
            toast({
              title: "Login failed",
              description: "Invalid email or password. Please try again.",
              variant: "destructive",
            });
          } else {
            toast({ title: "Login failed", description: error.message, variant: "destructive" });
          }
        } else {
          toast({ title: "Welcome back!", description: "You have successfully logged in." });
          navigate("/");
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes("User already registered") || error.message.includes("already")) {
            toast({
              title: "Account exists",
              description: "This email is already registered. Please log in instead.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Registration failed",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Check your email",
            description: "We sent a 6-digit verification code to your inbox.",
          });
          setStage("otp");
          setResendCooldown(45);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter the full 6-digit code.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await verifyOtp(email, otp);
      if (error) {
        toast({
          title: "Verification failed",
          description: error.message || "The code is invalid or expired.",
          variant: "destructive",
        });
      } else {
        toast({ title: "Email verified!", description: "Welcome aboard." });
        navigate("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setIsLoading(true);
    try {
      const { error } = await resendOtp(email);
      if (error) {
        toast({ title: "Could not resend", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Code resent", description: "Check your inbox for a new code." });
        setResendCooldown(45);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const goBackToCredentials = () => {
    setStage("credentials");
    setOtp("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="p-6">
        <Link to="/">
          <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              {stage === "otp" ? (
                <ShieldCheck className="w-8 h-8 text-primary" />
              ) : isLogin ? (
                <LogIn className="w-8 h-8 text-primary" />
              ) : (
                <User className="w-8 h-8 text-primary" />
              )}
            </motion.div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {stage === "otp"
                ? "Verify Your Email"
                : isLogin
                ? "Welcome Back"
                : "Create Account"}
            </h1>
            <p className="text-muted-foreground">
              {stage === "otp"
                ? `Enter the 6-digit code sent to ${email}`
                : isLogin
                ? "Enter your credentials to access your account"
                : "Sign up to get started with your account"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {stage === "credentials" ? (
              <motion.form
                key="credentials"
                onSubmit={handleSubmit}
                className="space-y-6 bg-card border border-border rounded-2xl p-8 shadow-xl shadow-black/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-11 h-12 bg-background ${errors.email ? "border-destructive" : ""}`}
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-11 h-12 bg-background ${errors.password ? "border-destructive" : ""}`}
                      disabled={isLoading}
                      autoComplete={isLogin ? "current-password" : "new-password"}
                    />
                  </div>
                  {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : isLogin ? "Sign In" : "Send Verification Code"}
                </Button>
              </motion.form>
            ) : (
              <motion.form
                key="otp"
                onSubmit={handleVerifyOtp}
                className="space-y-6 bg-card border border-border rounded-2xl p-8 shadow-xl shadow-black/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex flex-col items-center gap-4">
                  <Label className="text-foreground">Verification Code</Label>
                  <InputOTP maxLength={6} value={otp} onChange={setOtp} disabled={isLoading}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : "Verify & Continue"}
                </Button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={goBackToCredentials}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isLoading}
                  >
                    ← Use a different email
                  </button>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isLoading || resendCooldown > 0}
                    className="text-primary hover:text-primary/80 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {stage === "credentials" && (
            <motion.div
              className="text-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                  }}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
