import { toSlug } from "@/utils";
import { Suspense } from "react";
import OtherDirectoryFallback from "@/components/other-directory-fallback";
import OtherDirectory from "@/components/other-directory";

export const dynamicParams = false;

export async function generateStaticParams() {
  const { iconSets } = await fetch(`${process.env.SITE_URL}/api/sets`).then(
    (res) => res.json()
  );

  return iconSets.map((item) => ({
    slug: toSlug(item.name),
  }));
}

export async function generateMetadata({ params }) {
  const { iconSets } = await fetch(`${process.env.SITE_URL}/api/sets`).then(
    (res) => res.json()
  );

  const { slug } = await params;

  const iconSet = iconSets.find((item) => toSlug(item.name) === slug);

  return {
    title: `${iconSet.name} Icons Directory - ManyIcons`,
  };
}

export default async function Page({ params }) {
  const { iconSets } = await fetch(`${process.env.SITE_URL}/api/sets`).then(
    (res) => res.json()
  );

  const { slug } = await params;

  const iconSet = iconSets.find((item) => toSlug(item.name) === slug);

  return (
    <Suspense fallback={<OtherDirectoryFallback iconSet={iconSet} />}>
      <OtherDirectory iconSet={iconSet} />
    </Suspense>
  );
}
