import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';
import React from 'react';

const DescriptionListWrap = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

const DescriptionListStyled = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  overflowX: 'auto',
  position: 'relative',
  // margin: '16px 0',
  // '&::after': {
  //   content: '',
  //   position: 'absolute',
  //   top: 0,
  //   right: 0,
  //   width: 24,
  //   height: '100%',
  //   background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, $editorBackground 100%)',
  // },
});

const Title = styled('span', {
  display: 'flex',
  alignItems: 'center',
  fontSize: 10,
  fontWeight: 600,
  color: '$gray060',
  letterSpacing: 0.5,
  textTransform: 'uppercase',
});

export const DescriptionList = ({
  items,
  title,
}: {
  items: Array<React.ReactElement<HTMLDListElement>>;
  title: string;
}) => {
  return (
    <DescriptionListWrap>
      <Title>{title}</Title>
      <DescriptionListStyled>{items}</DescriptionListStyled>
    </DescriptionListWrap>
  );
};
