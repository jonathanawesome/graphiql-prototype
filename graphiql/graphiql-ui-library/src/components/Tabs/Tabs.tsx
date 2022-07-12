import { TabsContent, TabsList, TabsRoot, TabsTrigger } from './styles';

type TabItem = {
  id: string;
  component: React.ReactElement;
};

export const Tabs = ({
  ariaLabel,
  tabContentArray,
  tabTriggerArray,
}: {
  ariaLabel: string;
  tabContentArray: TabItem[];
  tabTriggerArray: TabItem[];
}) => {
  return (
    <TabsRoot defaultValue={tabContentArray[0].id}>
      <TabsList aria-label={ariaLabel}>
        {tabTriggerArray.map((t) => (
          <TabsTrigger key={t.id} value={t.id}>
            {t.component}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabContentArray.map((t) => (
        <TabsContent key={t.id} value={t.id}>
          {t.component}
        </TabsContent>
      ))}
    </TabsRoot>
  );
};
