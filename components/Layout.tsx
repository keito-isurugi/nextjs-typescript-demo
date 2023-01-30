import Header from "./Header";
import Footer from "./Footer";
import { FC } from "react";

type MyComponenProps = {
  children: React.ReactNode;
};

export const Layout: FC<MyComponenProps> = ({ children }) => {
  return (
    <>
      <Header />
      	<main className="p-5">{children}</main>
      <Footer />
    </>
  )
}