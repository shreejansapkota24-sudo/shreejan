import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import SiteGate from "@/components/SiteGate";
import Index from "./pages/Index";
import Matrix from "./pages/Matrix";
import LicenseCheck from "./pages/LicenseCheck";
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
        <SiteGate>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/matrix" element={<Matrix />} />
              <Route path="/license-check" element={<LicenseCheck />} />
              {/* CyberGuard Routes - accessible via direct URL */}
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
        </SiteGate>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
