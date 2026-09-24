import type { Metadata } from "next";
import { Cursor } from "@/components/Cursor";
import { NotFoundView } from "@/components/NotFoundView";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Cursor />
      <div className="grain" aria-hidden />
      <NotFoundView />
    </>
  );
}
