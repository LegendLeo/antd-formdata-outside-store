import React, { memo } from 'react';
import { Typography } from 'antd';
import _ from 'lodash';
import { useFormStore } from '../../stores/form';

export default function (props) {
  const { formValues } = useFormStore();
  // const formValues = {};
  console.log('12', props, formValues);

  return (
    <Typography>
      {_.map(formValues, (value, name) => (
        <pre key={name}>
          {name}: {JSON.stringify(value, null, 2)}
        </pre>
      ))}
    </Typography>
  );
};
