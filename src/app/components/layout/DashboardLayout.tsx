import SidebarComponent from './SidebarComponent';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-background text-foreground">
       <SidebarComponent label="dashboard" />
       <div className="flex-1 p-6 mt-10">{children}</div>
    </div>
  );
};

export default DashboardLayout;