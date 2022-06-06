import { styled } from '../../../theme';

/** components */
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, Chevron } from '../../icons';

/** hooks */
import { useGraphiQL } from '../../../hooks';

const SelectTrigger = styled(SelectPrimitive.SelectTrigger, {
  all: 'unset',
  boxSizing: 'border-box',
  // width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  lineHeight: 1,
  cursor: 'pointer',
  color: '$accentSuccess',

  svg: {
    height: 9,
    width: 9,

    path: {
      fill: '$scale600',
    },
  },
});

const SelectContent = styled(SelectPrimitive.Content, {
  overflow: 'hidden',
  backgroundColor: '$scale100',
  borderRadius: 6,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
});

const SelectViewport = styled(SelectPrimitive.Viewport, {
  padding: 5,
});

const SelectItem = styled(SelectPrimitive.Item, {
  all: 'unset',
  boxSizing: 'border-box',
  fontSize: 12,
  fontFamily: '$mono',
  lineHeight: 1,
  color: '$accentSuccess',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  height: 25,
  padding: '0 35px 0 25px',
  position: 'relative',
  userSelect: 'none',

  '&:focus': {
    backgroundColor: '$scale200',
  },
});

const SelectItemText = styled(SelectPrimitive.ItemText, {
  // color: 'red',
});

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Description = styled('span', {
  color: '$scale700',
  fontSize: 10,
});

const SelectIcon = styled(SelectPrimitive.Icon, {
  svg: {
    transform: 'scale(.9) rotate(180deg)',
  },
});

const SelectItemIndicator = styled(StyledItemIndicator, {
  svg: {
    width: 12,
    height: 12,

    path: {
      fill: '$scale700',
    },
  },
});

const StyledSelect = styled(SelectPrimitive.Root, {
  width: '100%',
});

const SelectValue = styled(SelectPrimitive.Value, {});

const updateVariable = useGraphiQL.getState().updateVariable;

export const SelectInput = ({
  values,
  variableName,
}: {
  values: Array<{ value: string; name: string; description?: string }>;
  variableName: string;
}) => {
  // console.log('values in SelectInput', values);

  const handleChange = (value: string) => {
    updateVariable({ variableName, variableValue: value });
  };

  return (
    <StyledSelect
      defaultValue={values[0].value}
      onValueChange={(value) => handleChange(value)}
    >
      <SelectTrigger aria-label="Values">
        <SelectValue />
        <SelectIcon>
          <Chevron />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent>
        <SelectViewport>
          {values.map((v) => {
            return (
              <SelectItem key={v.name} value={v.value}>
                <SelectItemText>{v.name}</SelectItemText>
                <Description>{v.description}</Description>
                <SelectItemIndicator>
                  <Check />
                </SelectItemIndicator>
              </SelectItem>
            );
          })}
        </SelectViewport>
      </SelectContent>
    </StyledSelect>
  );
};
