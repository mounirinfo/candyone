import ClubSelection from "@/components/organismes/checkout/ClubSelection";

export default function ClubSelectionPage() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-5 pt-20"
      style={{
        backgroundImage: 'url("/About/about.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
        <div className="mt-16"> 
        <ClubSelection />
        </div>
    </div>
  );
}
