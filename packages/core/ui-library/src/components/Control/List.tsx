import { useEffect, useState } from 'react';
import cuid from 'cuid';

// components
import { Icon } from '../Icon';
import { Input } from './Input';
import { Select } from './Select';

// styles
import {
  StyledAddItemButton,
  StyledList,
  StyledListItem,
  StyledRemoveItemButton,
} from './styles';

// types
import { ListProps, ControlData } from './types';

export const List = ({
  controlType,
  handleChange,
  name,
  options,
  placeholder,
  value,
}: ListProps) => {
  const [items, setItems] = useState<Array<ControlData>>(
    (value as string[]).map((v) => ({ name: `${cuid.slug()}-${v}`, value: v }))
  );

  // console.log('List', { name, value });

  useEffect(() => {
    handleChange({
      name,
      value: items.map((item) => item.value as string),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const handleItemControlChange = ({ name, value }: ControlData) => {
    setItems((prev) =>
      prev.map((p) => (p.name === name ? { ...p, value: value as string } : p))
    );
  };

  const handleAddItem = ({ name }: { name: string }) => {
    setItems((prev) => [
      ...prev,
      {
        name,
        value: '',
      },
    ]);
  };

  const handleRemoveItem = ({ name }: { name: string }) => {
    setItems((items) => items.filter((item) => item.name !== name));
  };

  return (
    <div className={StyledList()}>
      {items.length > 0 &&
        items.map((item) => (
          <div className={StyledListItem()} key={`${item.name}`}>
            <button
              className={StyledRemoveItemButton()}
              onClick={() => handleRemoveItem({ name: item.name })}
            >
              <Icon name="Close" />
            </button>
            {controlType === 'INPUT' && (
              <Input
                controlType={controlType}
                handleChange={handleItemControlChange}
                name={item.name}
                placeholder={placeholder}
                value={item.value}
              />
            )}
            {controlType === 'SELECT' && (
              <Select
                controlType={controlType}
                handleChange={handleItemControlChange}
                name={item.name}
                options={options}
                placeholder={placeholder}
                value={item.value}
              />
            )}
          </div>
        ))}
      <button
        className={StyledAddItemButton()}
        onClick={() => handleAddItem({ name: `${cuid.slug()}` })}
        type="button"
      >
        {`Add item +`}
      </button>
    </div>
  );
};
