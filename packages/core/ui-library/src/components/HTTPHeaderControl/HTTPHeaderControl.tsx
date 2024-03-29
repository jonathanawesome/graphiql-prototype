// components
import { Button } from '../Button';
import { Control, ControlProps } from '../Control';
import { Switch } from '../Switch';

// hooks
import {
  HTTPHeaderPlacement,
  HTTPHeaderValue,
  useHTTPHeaders,
} from '@graphiql-prototype/store';

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

  const hasEnabledHeaders = () => {
    const filtered = values.filter((v) => v.enabled === true);
    return filtered.length > 0;
  };

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
    <div className={StyledHTTPHeaderControlWrap()}>
      <div className={StyledHTTPHeaderControl()}>
        <span>Enabled</span>
        <span>Key</span>
        <span>Value</span>
      </div>
      {values.map((v) => (
        <div className={StyledHTTPHeaderControl()} key={v.id}>
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
          <div
            className={StyledRemoveHeaderButtonWrap({
              isDisabled: v.isRequired || v.enabled || !hasEnabledHeaders(),
            })}
          >
            <Button
              action={() => {
                removeHeader({ id: v.id, placement });
              }}
              icon="Plus"
              isDisabled={v.isRequired || v.enabled || !hasEnabledHeaders()}
              label="Button Copy"
              size="SMALL"
              style="ICON"
            />
          </div>
        </div>
      ))}
      <span className={StyledAddHeaderButtonWrap()}>
        <Button
          action={() => addHeader({ placement })}
          label="Add header"
          size="MEDIUM"
          style="GHOST"
        />
      </span>
    </div>
  );
};
