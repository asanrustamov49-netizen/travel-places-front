"use client";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";

interface IHomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: IHomeLayoutProps) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
