// components
import { Message } from '@graphiql-prototype/ui-library';

//styles
import { StyledDeprecatedMessage } from './styles';

const Msg = ({ deprecationReason }: { deprecationReason: string }) => {
  return (
    <>
      <span>Deprecated</span>
      <p>{deprecationReason}</p>
    </>
  );
};

export const DeprecatedMessage = ({
  deprecationReason,
}: {
  deprecationReason: string;
}) => {
  return (
    <div className={StyledDeprecatedMessage()}>
      <Message
        message={<Msg deprecationReason={deprecationReason}></Msg>}
        variant="WARNING"
      />
    </div>
  );
};
