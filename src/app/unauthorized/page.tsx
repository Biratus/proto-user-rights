import AlertError from "@/components/AlertError";
import CenterWrapper from "@/components/CenterWrapper";

export default function page() {
  return (
    <CenterWrapper style={{ className: "mt-4" }}>
      <AlertError message="Vous n'êtes pas autorisé à accéder à cette ressource" />
    </CenterWrapper>
  );
}
