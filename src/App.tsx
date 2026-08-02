import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
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
import WorldCupHome from "./pages/worldcup/Home";
import WorldCupLive from "./pages/worldcup/LiveCenter";
import WorldCupTournament from "./pages/worldcup/Tournament";
import WorldCupTeams from "./pages/worldcup/Teams";
import WorldCupStats from "./pages/worldcup/StatsCenter";
import WorldCupArchive from "./pages/worldcup/Archive";
import WorldCupMap from "./pages/worldcup/WorldMap";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CustomCursor />
        <ScrollProgress />
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

              {/* WorldCup Hub */}
              <Route path="/worldcup" element={<WorldCupHome />} />
              <Route path="/worldcup/live" element={<WorldCupLive />} />
              <Route path="/worldcup/tournament" element={<WorldCupTournament />} />
              <Route path="/worldcup/teams" element={<WorldCupTeams />} />
              <Route path="/worldcup/stats" element={<WorldCupStats />} />
              <Route path="/worldcup/archive" element={<WorldCupArchive />} />
              <Route path="/worldcup/map" element={<WorldCupMap />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
