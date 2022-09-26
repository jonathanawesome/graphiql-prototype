import { Tag, styled, theme } from '@graphiql-prototype/ui-library';

const FlexRow = styled('div', {
  display: 'flex',
  gap: 24,
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  width: '100%',
});

const FlexCol = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  color: theme.colors.text4,
});

export const TagStory = () => {
  return (
    <FlexCol>
      <FlexRow>
        <span>OPERATION</span>
        <Tag copy="Q" title="Query" type="OPERATION" />
      </FlexRow>
      <FlexRow>
        <span>ERROR</span>
        <Tag copy="E" title="ERROR" type="ERROR" />
      </FlexRow>
      <FlexRow>
        <span>WARNING</span>
        <Tag copy="W" title="WARNING" type="WARNING" />
      </FlexRow>
      <FlexRow>
        <span>INFO</span>
        <Tag copy="I" title="INFO" type="INFO" />
      </FlexRow>
      <FlexRow>
        <span>SUCCESS</span>
        <Tag copy="S" title="SUCCESS" type="SUCCESS" />
      </FlexRow>
    </FlexCol>
  );
};
