import Navbar from "@/components/shared/NavBar/Navbar";


export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col font-sans">
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      {children}
    </div>
  );
}
