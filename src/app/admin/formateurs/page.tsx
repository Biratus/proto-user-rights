import CenterWrapper from "@/components/CenterWrapper";
import { formateurs } from "@/lib/realData";
import FormateurManagementForm from "./FormateurManagementForm";
import FormateurMangementInitializer from "./FormateurManagementInitializer";
import FormateurManagementTable from "./FormateurManagementTable";

export default function PageFormateur() {
  const formateursList = Array.from(formateurs.values());
  return (
    <CenterWrapper className="flex-col">
      <FormateurMangementInitializer formateurs={formateursList} />
      <FormateurManagementForm />
      <FormateurManagementTable />;
    </CenterWrapper>
  );
}
