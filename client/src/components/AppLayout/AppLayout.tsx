import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react"


function AppLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="app">
      <Header
        onMenuOpen={() => setIsMobileMenuOpen(true)}
        onMenuClose={() => setIsMobileMenuOpen(false)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      {isMobileMenuOpen && (
        <div
          className="app-layout__backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <Outlet context={{ isMobileMenuOpen, setIsMobileMenuOpen }} />
    </div>
  );
}

export default AppLayout;
