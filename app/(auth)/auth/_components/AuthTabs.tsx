import { TabItem } from "@/types";
import { TabsList, TabsTrigger } from "../../../../components/ui/tabs";

interface AuthTabsProps {
  tabs: TabItem[];
}

const AuthTabs = ({ tabs }: AuthTabsProps) => {
  return (
    <>
      <TabsList className="grid w-full grid-cols-2  bg-muted border border-border mt-8">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.label}
            value={tab.value}
            className="text-foreground  font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </>
  );
};

export default AuthTabs;
