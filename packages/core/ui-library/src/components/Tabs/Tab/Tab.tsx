// components
import { RemoveTabButton } from '../RemoveTabButton';

// styles
import { Trigger, TabWrap } from './styles';

//types
import { TabFullProps } from '../types';

export const Tab = ({
  copy,
  doRemoveTab,
  handleCollapseOnClick,
  setActiveTab,
  value,
}: TabFullProps) => {
  return (
    <TabWrap>
      <Trigger
        onPointerDown={(event) => {
          setActiveTab(value);
          handleCollapseOnClick ? handleCollapseOnClick({ event }) : undefined;
        }}
        hasRemoveTabButton={!!doRemoveTab}
        data-value={value}
        value={value}
      >
        {copy}
      </Trigger>
      {doRemoveTab && <RemoveTabButton doRemoveTab={doRemoveTab} tabId={value} />}
    </TabWrap>
  );
};
