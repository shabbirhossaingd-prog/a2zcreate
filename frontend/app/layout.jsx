import "./globals.css";

export const metadata = {
  title: "A2ZCreate AI Studio",
  description: "Create AI-powered videos, posters and marketing creatives from a brief.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
