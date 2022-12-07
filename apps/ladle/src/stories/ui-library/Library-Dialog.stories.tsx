// ladle helper components
import { FlexCol } from '../../components/FlexCol';
import { FlexRow } from '../../components/FlexRow';

import { Dialog } from '../../../.././../packages/core/ui-library/src';

export const Default = () => {
  return (
    <div className={FlexCol()}>
      <FlexRow name={`Dialog - Small ICON Button`}>
        <Dialog
          button={{
            label: 'Button Copy',
            size: 'SMALL',
            style: 'GHOST',
          }}
        />
      </FlexRow>
      <FlexRow name={`Dialog - Small ICON Button`}>
        <Dialog
          button={{
            icon: 'Plus',
            label: 'Button Copy',
            size: 'SMALL',
            style: 'ICON',
          }}
        />
      </FlexRow>
    </div>
  );
};
