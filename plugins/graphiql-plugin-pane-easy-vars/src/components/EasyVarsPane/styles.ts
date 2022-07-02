import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

export const EasyVarsPaneStyled = styled(AccordionPrimitive.Root, {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const ItemStyled = styled(AccordionPrimitive.Item, {
  overflow: 'hidden',
  padding: '0 12px',
  borderRadius: 4,

  '&[data-state="open"]': {
    backgroundColor: '$white',
    border: '1px solid $gray015',
    boxShadow:
      '0px 6px 20px rgba(59, 76, 106, 0.13), 0px 1.34018px 4.46726px rgba(59, 76, 106, 0.0774939), 0px 0.399006px 1.33002px rgba(59, 76, 106, 0.0525061)',
  },

  '&[data-state="closed"]': {
    '&:hover': {
      backgroundColor: '$gray010',
    },
  },
});

export const HeaderStyled = styled(AccordionPrimitive.Header, {
  all: 'unset',
});

export const TriggerStyled = styled(AccordionPrimitive.Trigger, {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  justifyContent: 'space-between',
  width: '100%',
  height: 40,

  span: {
    '&:nth-of-type(1)': {
      fontSize: '$body',
      fontWeight: 500,
    },
    '&:nth-of-type(2)': {
      padding: '2px 4px',
      marginLeft: '4px',
      border: '1px solid $gray010',
      borderRadius: '2px',
      fontSize: '$mini',
      fontWeight: 600,
      backgroundColor: '$gray007',
    },
  },

  '&[data-state="closed"]': {
    span: {
      color: '$gray060',
    },
  },
  '&[data-state="open"]': {
    borderBottom: '1px solid $gray015',
    marginBottom: 12,

    span: {
      color: '$gray100',
    },
  },
});

export const ContentStyled = styled(AccordionPrimitive.Content, {
  // overflow: 'hidden',
  // fontSize: 15,
});

export const Note = styled('span', {
  display: 'block',
  marginBottom: 12,
  fontSize: '$body',
  color: '$gray060',
});
