import { redirect } from "next/navigation";

/**
 * Legacy /careers → canonical /career (matches the WordPress URL).
 */
export default function CareersLegacy() {
  redirect("/career");
}
