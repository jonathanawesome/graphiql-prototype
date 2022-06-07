import React from 'react';

/** components */
import { Close } from '../../icons';

/** styles */
import {
  Button,
  CloseWrap,
  Content,
  ContentWrap,
  DialogLead,
  Overlay,
  Portal,
  Root,
  Trigger,
} from './styles';

export const SidebarDialog = ({
  icon,
  content,
  title,
}: {
  icon: React.ReactElement;
  content: React.ReactElement;
  title: string;
}) => {
  return (
    <Root>
      <Trigger asChild>
        <Button>{icon}</Button>
      </Trigger>
      <Overlay />
      <Portal>
        <ContentWrap>
          <DialogLead>
            <span>{title}</span>
            <CloseWrap>
              <Close />
            </CloseWrap>
          </DialogLead>
          <Content>{content}</Content>
        </ContentWrap>
      </Portal>
    </Root>
  );
};
