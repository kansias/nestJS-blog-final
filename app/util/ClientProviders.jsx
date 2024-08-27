"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "../util/AuthContext";

export default function ClientProviders({ children }) {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
}
