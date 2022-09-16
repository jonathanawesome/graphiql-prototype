import { styled, theme } from '@graphiql-prototype/ui-library';
import React from 'react';

const ListWrap = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

const ListStyled = styled('ul', {
  all: `unset`,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  overflowX: 'auto',
  position: 'relative',
  // margin: '16px 0',
});

const Title = styled('span', {
  display: 'flex',
  alignItems: 'center',
  fontSize: 10,
  fontWeight: theme.fontWeights.semiBold,
  color: theme.colors.text4,
  letterSpacing: 0.5,
  textTransform: 'uppercase',
});

export const List = ({
  items,
  title,
}: {
  items: Array<React.ReactElement<HTMLDListElement>>;
  title: string;
}) => {
  return (
    <ListWrap>
      <Title>{title}</Title>
      <ListStyled>{items}</ListStyled>
    </ListWrap>
  );
};
