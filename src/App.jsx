import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/contexts/LanguageContext";
// Vercel Analytics - mount globally in the app layout
import { Analytics } from "@vercel/analytics/next";

function App() {
  return (
    <>
      <Toaster />
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
      {/* Vercel Analytics component (no visual UI) */}
      <Analytics />
    </>
  );
}

export default App;
