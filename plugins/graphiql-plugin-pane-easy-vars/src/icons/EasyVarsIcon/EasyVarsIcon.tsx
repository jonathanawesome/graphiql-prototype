import {
  // getActiveEditorTab,
  useGraphiQLEditor,
} from '@graphiql-prototype/graphiql-editor';
import { styled } from '@graphiql-prototype/graphiql-ui-library';

const EasyVarsIconStyled = styled('div', {
  position: 'relative',
});

const EasyVarsTally = styled('div', {
  position: 'absolute',
  top: -3,
  right: -6,
  height: 12,
  width: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid $gray100',
  backgroundColor: '$white',
  fontSize: 8,
  fontWeight: 600,
  color: '$gray100',
  borderRadius: '50%',
  boxShadow: '0 1px 3px hsla(0, 0%, 0%, 0.2)',
});

export const EasyVarsIcon = () => {
  const { activeEditorTabId, editorTabs } = useGraphiQLEditor();

  const activeEditorTab = editorTabs.find(
    (editorTab) => editorTab.editorTabId === activeEditorTabId
  );

  const variableDefinitions = activeEditorTab?.operationDefinition?.variableDefinitions;

  return (
    <EasyVarsIconStyled>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V4.81396C14.2293 5.01204 15.7359 5.67527 16.6841 6.6235C16.977 6.9164 16.977 7.39127 16.6841 7.68416C16.3912 7.97705 15.9163 7.97704 15.6234 7.68414C14.8318 6.89247 13.355 6.29111 11.9798 6.2541C11.1702 6.23231 10.4933 6.40895 10.0371 6.75448C9.61231 7.07627 9.28848 7.61147 9.28848 8.53845C9.28848 8.93731 9.37814 9.2236 9.50971 9.44402C9.64386 9.66878 9.84661 9.86654 10.131 10.0475C10.7298 10.4286 11.5598 10.662 12.5435 10.9303C12.564 10.9359 12.5845 10.9415 12.6051 10.9471C13.5113 11.1941 14.5559 11.4788 15.3666 11.9947C15.7961 12.268 16.1883 12.6219 16.4706 13.0948C16.7555 13.5721 16.9038 14.1296 16.9038 14.7692C16.9038 16.2001 16.2764 17.2754 15.3047 17.9559C14.5699 18.4706 13.6697 18.7397 12.75 18.8129V20.9999C12.75 21.4141 12.4142 21.7499 12 21.7499C11.5858 21.7499 11.25 21.4141 11.25 20.9999V18.7659C9.71292 18.5519 8.16706 17.8316 7.24618 16.6038C6.99765 16.2724 7.0648 15.8023 7.39617 15.5538C7.72754 15.3053 8.19764 15.3724 8.44617 15.7038C9.16499 16.6622 10.58 17.2783 12.0269 17.3303L12 18.0798L12.0269 17.3303C12.9764 17.3644 13.8406 17.15 14.4443 16.7272C15.0178 16.3256 15.4038 15.7074 15.4038 14.7692C15.4038 14.3704 15.3141 14.0841 15.1826 13.8637C15.0484 13.6389 14.8457 13.4411 14.5612 13.2601C13.9625 12.8791 13.1325 12.6457 12.1488 12.3774C12.1283 12.3718 12.1078 12.3662 12.0872 12.3606C11.181 12.1136 10.1364 11.8289 9.32571 11.313C8.8962 11.0397 8.50401 10.6858 8.2217 10.2128C7.93681 9.73552 7.78848 9.17805 7.78848 8.53845C7.78848 7.20848 8.28215 6.20207 9.13145 5.55877C9.74362 5.09508 10.4879 4.85971 11.25 4.78211V3C11.25 2.58579 11.5858 2.25 12 2.25Z"
          fill="#000000"
        />
      </svg>
      {variableDefinitions && variableDefinitions.length > 0 && (
        <EasyVarsTally>{variableDefinitions.length}</EasyVarsTally>
      )}
    </EasyVarsIconStyled>
  );
};
