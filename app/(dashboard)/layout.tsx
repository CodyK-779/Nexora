import DashNavbar from "@/components/DashNavbar";
import { PropsWithChildren } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <DashNavbar />
      <main className="mt-20">{children}</main>
    </>
  );
};

export default DashboardLayout;
