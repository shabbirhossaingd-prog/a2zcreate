import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";

export const metadata = {
  title: "A2ZCreate AI Studio",
  description: "Create AI-powered videos, posters and marketing creatives from a brief.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
