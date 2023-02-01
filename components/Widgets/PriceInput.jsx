import { Input, Select } from 'antd';
import React, { memo } from 'react';
const { Option } = Select;

export default memo((props) => {
  const { value, onChange, disabled } = props;
  console.log('price', props.name, props);
  const triggerChange = (changedValue) => {
    onChange?.({
      ...value,
      ...changedValue,
    });
  };
  const onNumberChange = (e) => {
    const newNumber = parseInt(e.target.value || '0', 10);
    triggerChange({
      number: newNumber,
    });
  };
  const onCurrencyChange = (newCurrency) => {
    triggerChange({
      currency: newCurrency,
    });
  };

  return (
    <span>
      <Input
        type="text"
        value={value?.number}
        onChange={onNumberChange}
        disabled={disabled}
        style={{
          width: 100,
        }}
      />
      <Select
        value={value?.currency}
        style={{
          width: 80,
          margin: '0 8px',
        }}
        disabled={disabled}
        onChange={onCurrencyChange}
      >
        <Option value="rmb">RMB</Option>
        <Option value="dollar">Dollar</Option>
      </Select>
    </span>
  );
});
