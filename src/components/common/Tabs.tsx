import { createContext, useContext, useState, ReactNode } from "react";

const TabsContext = createContext<{
  activeTab: number;
  setActiveTab: (index: number) => void;
} | null>(null);

interface TabsProps {
  children: ReactNode;
  className?: string;
  borderColor?: string;
}

export const Tabs = ({
  children,
  className = "",
  borderColor = "blue-500",
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabsArray = Array.isArray(children) ? children : [children];

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`w-full flex flex-col grow min-h-0 ${className}`}>
        {/* Tabs Header */}
        <div className="flex space-x-4 border-b">
          {tabsArray.map((child, index) =>
            child && "props" in child ? (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`relative px-4 py-2 text-gray-700 transition-all duration-200 ${
                  activeTab === index
                    ? "font-semibold text-black"
                    : "text-gray-500"
                }`}
              >
                {child.props.label}
                {activeTab === index && (
                  <div
                    className={`absolute left-0 bottom-0 h-[3px] w-full bg-${borderColor} transition-all`}
                  />
                )}
              </button>
            ) : null
          )}
        </div>

        {/* Tabs Content */}
        <div className="p-4 h-full">
          {tabsArray.map((child, index) =>
            index === activeTab ? child : null
          )}
        </div>
      </div>
    </TabsContext.Provider>
  );
};

interface TabProps {
  label: string;
  children: ReactNode;
}

export const Tab = ({ label, children }: TabProps) => {
  return <div className="h-full">{children}</div>;
};
