import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

const HeadersWrap = styled('div', {
  height: 150,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Headers = () => {
  return (
    <HeadersWrap>
      <span style={{ fontSize: '10px' }}>TODO: Headers...please send help 🦺</span>
    </HeadersWrap>
  );
};
