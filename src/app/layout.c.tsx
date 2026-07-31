"use client";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

interface IChildrenProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IChildrenProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="layout">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
};

export default Layout;
