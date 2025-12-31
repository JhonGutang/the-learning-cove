import { GetStartedTexts, WhoAmITexts } from "~/constants/get-started-texts";
import { Separator } from "~/components/ui/separator";
import WithSidebar from "~/layout/withSidebar";
export default function GetStarted() {
    return (
        <WithSidebar>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6">{GetStartedTexts.heading}</h1>
                <p className="text-lg">
                    {GetStartedTexts.message}
                </p>
                <Separator className="my-8" />
                <div className="text-3xl font-bold mb-3">{WhoAmITexts.heading}</div>
                <div className="flex flex-col gap-3">

                    <p className="text-lg">
                        {WhoAmITexts.messageP1}
                    </p>
                    <p className="text-lg">
                        {WhoAmITexts.messageP2}
                    </p>
                </div>
            </div>
        </WithSidebar>
    );
}