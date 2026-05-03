import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/providers/convex-provider";
import { SyncUserProvider } from "@/providers/sync-user-provider";
import TopNav from "@/components/TopNav";
import SideNav from "@/components/SideNav";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-slate-950 antialiased">
        <ClerkProvider>
          <ConvexClientProvider>
            <SyncUserProvider>
              <TopNav />
              <div className="mx-auto flex max-w-6xl gap-6 px-4 py-6">
                <SideNav />
                <main className="w-full">{children}</main>
              </div>
            </SyncUserProvider>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}