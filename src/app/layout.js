import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
import "./globals.css";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import Logo from "../../public/TH.png";
import Image from "next/image";
import HandleProfileAvatar from "@/components/handleProfileAvatar";

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ResizablePanelGroup
          direction="vertical"
          className="min-h-[880px] max-w-full rounded-lg border border-slate-300"
        >
          <ResizablePanel defaultSize={10}>
            <div className="flex h-full items-center justify-between p-6 relative bg-cyan-600 bg-opacity-50">
              <div className="invisible">Input Search</div>
              <div className="flex items-center justify-center gap-3">
                <Image src={Logo} alt="" width="35" />
                <span className="font-semibold">Tee Htwin's Feed</span>
              </div>
              <div className="rounded-full border p-1 border-slate-200">
                <HandleProfileAvatar />
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={120} className="py-0 bg-slate-200">
            <ScrollArea className="h-full mx-auto w-full bg-opacity-50 py-5 rounded-lg border">
              {children}
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </body>
    </html>
  );
}
