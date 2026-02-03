import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Matrix from "./pages/Matrix";
import NotFound from "./pages/NotFound";
import {
  CyberGuardDashboard,
  URLScanner,
  FileScanner,
  ThreatLogs,
  ThreatMap,
  About as CyberGuardAbout,
  CyberSaathi,
} from "./pages/cyberguard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/matrix" element={<Matrix />} />
            {/* CyberGuard Routes */}
            <Route path="/cyberguard" element={<CyberGuardDashboard />} />
            <Route path="/cyberguard/url-scanner" element={<URLScanner />} />
            <Route path="/cyberguard/file-scanner" element={<FileScanner />} />
            <Route path="/cyberguard/threat-map" element={<ThreatMap />} />
            <Route path="/cyberguard/cyber-saathi" element={<CyberSaathi />} />
            <Route path="/cyberguard/threat-logs" element={<ThreatLogs />} />
            <Route path="/cyberguard/about" element={<CyberGuardAbout />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
