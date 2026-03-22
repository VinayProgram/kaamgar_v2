"use client"
import { redirect } from "next/navigation";

export default function ConsumerRedirect() {
  redirect("/consumers/quick-request");
}
