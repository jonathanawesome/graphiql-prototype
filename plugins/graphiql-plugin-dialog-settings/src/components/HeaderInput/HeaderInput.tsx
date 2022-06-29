// components
import {
  Close,
  FieldInput,
  HandleChange,
} from '@graphiql-v2-prototype/graphiql-ui-library';

// hooks
import { GlobalHeader, useGlobalHeaders } from '@graphiql-v2-prototype/graphiql-editor';

// styles
import { HeaderInputStyled, RemoveHeaderButton } from './styles';

export type HeaderInputProps = {
  headerData: GlobalHeader;
};

export const HeaderInput = ({ headerData }: HeaderInputProps) => {
  const { removeGlobalHeader, updateGlobalHeader } = useGlobalHeaders();

  const handleChange = ({ name, value }: HandleChange) => {
    // console.log('handleChange', { name, value });
    // @ts-expect-error 👇 "name" | "value"
    updateGlobalHeader({ id: headerData.id, name, value });
  };

  return (
    <HeaderInputStyled>
      <RemoveHeaderButton onClick={() => removeGlobalHeader({ id: headerData.id })}>
        <Close />
      </RemoveHeaderButton>
      <FieldInput
        currentValue={headerData.header.name}
        handleChange={handleChange}
        name={'name'}
        placeholder={'Authorization'}
      />
      <FieldInput
        currentValue={headerData.header.value}
        handleChange={handleChange}
        name={'value'}
        placeholder={'Bearer ...'}
      />
    </HeaderInputStyled>
  );
};
