import type { ReactNode } from 'react';

// styles
import { StyledPaneSection } from '../styles';

export const PaneSection = ({
  children,
  lead,
  withSidePadding = true,
}: {
  children: ReactNode;
  lead?: string;
  withSidePadding?: boolean;
}) => {
  // console.log('PaneSection', {});

  return (
    <StyledPaneSection withSidePadding={withSidePadding}>
      {lead && <span className={'paneSectionLead'}>{lead}</span>}
      {children}
    </StyledPaneSection>
  );
};
