import { ScrollToTop } from "@/components/ScrollToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const FixedIcons = () => {
    return (
        <div className="fixed right-[calc(1.5rem+env(safe-area-inset-right))] bottom-[calc(6rem+env(safe-area-inset-bottom))] z-40 flex flex-col gap-4 items-center">
            <ScrollToTop />
            <WhatsAppButton />
        </div>
    )
}