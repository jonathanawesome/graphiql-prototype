import { styled } from '@graphiql-v2-prototype/graphiql-v2';

export const PathfinderStyled = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 34,
  padding: `30px 0 32px 32px`,
  width: '100%',
  //TODO 👇 this works, but it's kinda weird... might be a better solution
  minWidth: 300,
});

export const PathfinderLead = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  h2: {
    fontSize: '$display',
    fontWeight: '$semiBold',
    color: '$scale800',
    margin: 0,
    padding: 0,
  },
});

export const PathfinderContent = styled('div', {
  // position: 'absolute',
  // top: 0,
  // left: 0,
  // //TODO: 👇 hacky
  // width: `calc(100vw - 100px)`,
});

export const PathfinderContentWrap = styled('div', {
  position: 'relative',
  height: '100%',
  width: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
});

export const ContainRight = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginLeft: 'auto',
});

export const FakeSearch = styled('div', {
  backgroundColor: '$scale200',
  borderRadius: 8,
  padding: 12,
  gap: 12,
  display: 'flex',
  alignItems: 'center',

  span: {
    fontSize: '$body',
    color: '$scale700',
  },

  svg: {
    height: 16,
    width: 16,
  },
});
