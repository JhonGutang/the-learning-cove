import { useNavigate } from "react-router";
import MainLayout from "~/layout/main";

export default function LandingPage() {
    const navigate = useNavigate();
    return (
        <MainLayout>
            <div className="flex flex-col items-center justify-center gap-4 w-full h-full text-center">
                <div>
                    <h1 className="text-4xl font-bold">The Learning Cove</h1>
                    <p>The Knowledge Compendium of J.B.G.</p>
                </div>
                <button
                    className="w-40 px-4 py-2 rounded-md bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:opacity-90 transition-opacity"
                    onClick={() => navigate("/compendium")}
                >
                    Click Me
                </button>
            </div>
        </MainLayout>
    );
}
