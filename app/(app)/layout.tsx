import Navbar from "@/components/shared/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />
            {children}
        </main>
    );
}
