import { Button } from "~/components/ui/button";
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

                <Button
                    className="w-40"
                    onClick={() => navigate("/compendium")}
                >
                    Click Me
                </Button>
            </div>
        </MainLayout>

    );
}