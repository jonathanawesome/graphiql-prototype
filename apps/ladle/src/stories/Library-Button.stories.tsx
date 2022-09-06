import { Button, Close, styled } from '@graphiql-prototype/ui-library';

const FlexRow = styled('div', {
  display: 'flex',
  gap: 12,
  alignItems: 'center',
});

const FlexCol = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

const dummyAction = () => {
  alert('clicked button!');
};

export const Icon = () => {
  return (
    <FlexCol>
      <FlexRow>
        <span>small</span>
        <Button
          action={dummyAction}
          icon={<Close />}
          label="Button Copy"
          size="SMALL"
          variant="ICON"
        />
      </FlexRow>
      <FlexRow>
        <span>large</span>
        <Button
          action={dummyAction}
          icon={<Close />}
          label="Button Copy"
          size="LARGE"
          variant="ICON"
        />
      </FlexRow>
    </FlexCol>
  );
};

export const Mix = () => {
  return (
    <Button action={dummyAction} label="Button Copy" size="LARGE" variant="STANDARD" />
  );
};

export const Standard = () => {
  return (
    <Button action={dummyAction} label="Button Copy" size="LARGE" variant="STANDARD" />
  );
};
