import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const BreadcrumbOverlayStyled = styled('section', {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  backgroundColor: '$editorBackground',
  borderRadius: 12,
  padding: 16,
});

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: 24,
});

export const Left = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const Right = styled('div', {});

export const BackButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  gap: 4,

  svg: {
    transform: 'rotate(90deg)',
    height: 10,
    width: 10,
    path: {
      fill: '$gray040',
    },
  },
  span: {
    fontSize: 12,
  },
});

export const CurrentTypeName = styled('span', {
  fontSize: 18,
  fontWeight: 500,
  color: '$gray100',
});

export const CloseButton = styled('button', {
  svg: {
    height: 20,
    width: 20,
    path: {
      fill: '$gray040',
    },
  },
});
