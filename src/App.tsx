import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import GtapPage from "./pages/GtapPage.tsx";
import IaetdsPage from "./pages/IaetdsPage.tsx";
import VallunexStudiosPage from "./pages/VallunexStudiosPage.tsx";
import AdorableAromaPage from "./pages/AdorableAromaPage.tsx";
import TalkToUsPage from "./pages/TalkToUsPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/*
      Much of the type is revealed by transform animations. For anyone who asks
      for reduced motion, skip straight to the resting state so nothing stays
      hidden behind an animation that never plays.
    */}
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Valedue is no longer a standalone page — it lives as a section on the homepage. */}
            <Route
              path="/valedue"
              element={<Navigate to={{ pathname: "/", hash: "#valedue" }} replace />}
            />
            <Route path="/gtap" element={<GtapPage />} />
            <Route path="/iaetds" element={<IaetdsPage />} />
            <Route path="/vallunex-studios" element={<VallunexStudiosPage />} />
            <Route path="/adorable-aroma" element={<AdorableAromaPage />} />
            <Route path="/talk-to-us" element={<TalkToUsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </MotionConfig>
  </QueryClientProvider>
);

export default App;
