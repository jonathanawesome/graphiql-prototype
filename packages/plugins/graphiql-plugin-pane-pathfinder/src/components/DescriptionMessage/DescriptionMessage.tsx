// components
import { Message } from '@graphiql-prototype/ui-library';

//styles
import { StyledDescriptionMessage } from './styles';

const Msg = ({ description }: { description: string }) => {
  return (
    <>
      <span>Description</span>
      <p>{description}</p>
    </>
  );
};

export const DescriptionMessage = ({ description }: { description: string }) => {
  return (
    <StyledDescriptionMessage>
      <Message message={<Msg description={description}></Msg>} variant="INFO" />
    </StyledDescriptionMessage>
  );
};
