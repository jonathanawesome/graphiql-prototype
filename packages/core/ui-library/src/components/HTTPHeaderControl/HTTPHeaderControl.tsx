// components
import { Button } from '../Button';
import { Control, ControlProps } from '../Control';
import { Switch } from '../Switch';

// hooks
import {
  HTTPHeaderPlacement,
  HTTPHeaderValue,
  useHTTPHeaders,
} from '../../../../useHTTPHeaders';

// styles
import {
  StyledHTTPHeaderControlWrap,
  StyledHTTPHeaderControl,
  StyledAddHeaderButtonWrap,
  StyledRemoveHeaderButtonWrap,
} from './styles';

const SEPARATOR = `--`;

export const HTTPHeaderControl = ({
  placement,
  values,
}: {
  placement: HTTPHeaderPlacement;
  values: HTTPHeaderValue[];
}) => {
  const { addHeader, updateHeader, removeHeader } = useHTTPHeaders();

  // console.log('HTTPHeaderControl', { values });

  const handleChange: ControlProps['control']['handleChange'] = ({ name, value }) => {
    const id = name.split(SEPARATOR)[0];
    const valueType = name.split(SEPARATOR)[1];

    if (valueType === 'kVSwitch') {
      updateHeader({ id, payload: { enabled: value as boolean }, placement });
    } else {
      updateHeader({
        id,
        payload: { keyOrValue: valueType as 'key' | 'value', value: value as string },
        placement,
      });
    }
  };

  return (
    <StyledHTTPHeaderControlWrap>
      <StyledHTTPHeaderControl>
        <span>Enabled</span>
        <span>Key</span>
        <span>Value</span>
      </StyledHTTPHeaderControl>
      {values.map((v) => (
        <StyledHTTPHeaderControl key={v.id}>
          <Switch
            handleChange={handleChange}
            isChecked={v.enabled}
            isDisabled={!v.key || !v.value}
            name={`${v.id}${SEPARATOR}kVSwitch`}
            size="SMALL"
          />
          <Control
            alignment="LEFT"
            control={{
              controlType: 'INPUT',
              handleChange,
              name: `${v.id}${SEPARATOR}key`,
              placeholder: 'Authorization',
              value: v.key,
            }}
            displayLabel={false}
            isDisabled={v.isRequired}
            labelCopy={`Value for Key`}
            list={false}
          />
          <Control
            alignment="LEFT"
            control={{
              controlType: 'INPUT',
              handleChange,
              name: `${v.id}${SEPARATOR}value`,
              placeholder: 'Bearer ...',
              value: v.value,
            }}
            displayLabel={false}
            isDisabled={v.isRequired}
            labelCopy={`Value for Value`}
            list={false}
          />
          <StyledRemoveHeaderButtonWrap>
            <Button
              action={() => {
                removeHeader({ id: v.id, placement });
              }}
              icon="Plus"
              isDisabled={v.isRequired || v.enabled}
              label="Button Copy"
              size="SMALL"
              style="ICON"
            />
          </StyledRemoveHeaderButtonWrap>
        </StyledHTTPHeaderControl>
      ))}
      <StyledAddHeaderButtonWrap>
        <Button
          action={() => addHeader({ placement })}
          label="Add another HTTP header"
          size="MEDIUM"
          style="GHOST"
        />
      </StyledAddHeaderButtonWrap>
    </StyledHTTPHeaderControlWrap>
  );
};
