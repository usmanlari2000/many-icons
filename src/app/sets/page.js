import { Suspense } from "react";
import SetsDirectory from "@/components/sets-directory";
import SetsDirectoryFallback from "@/components/sets-directory-fallback";

export const metadata = {
  title: "Icon Sets Directory - ManyIcons",
};

export default function Page() {
  return (
    <Suspense fallback={<SetsDirectoryFallback />}>
      <SetsDirectory />
    </Suspense>
  );
}
