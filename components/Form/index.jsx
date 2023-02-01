import React, { useCallback, useMemo, memo, useState } from 'react';
import { Form } from 'antd';
import * as Widgets from '../Widgets';
import _ from 'lodash';
import { observer } from 'mobx-react';
import produce from 'immer';
import { toJS } from 'mobx';
import { useFormStore } from '../../stores/form';

const { useForm } = Form;

export default memo(function (props) {
  const {
    onChange,
    prefixItems,
    suffixItems,
    disabled: formDisabled = false,
    fields,
  } = props;
  const [form] = useForm();
  const [fieldsData, setFieldsData] = useState(fields);
  const formStore = useFormStore();
  const { formValues } = formStore;
  // console.log('formValues1', formValues, values, fields);

  // useEffect(() => {
  //   if (!_.isNil(formValues) && !_.isEmpty)
  // }, [])

  const { dependOnTriggers, conditionsTriggers } = useMemo(() => {
    const dependOnTriggers = {};
    const conditionsTriggers = {};
    fields?.forEach((field, index) => {
      field.dependOn?.forEach((key) => {
        if (dependOnTriggers[key]) {
          dependOnTriggers[key].push({ key: field.key, index });
        } else {
          dependOnTriggers[key] = [{ key: field.key, index }];
        }
      });
      field.conditions?.forEach((key) => {
        if (conditionsTriggers[key]) {
          conditionsTriggers[key].push({ key: field.key, index });
        } else {
          conditionsTriggers[key] = [{ key: field.key, index }];
        }
      });
    });
    return { dependOnTriggers, conditionsTriggers };
  }, [fields]);

  const fieldsData1 = useMemo(() => {
    console.log('123');
    return fields?.map((item) => {
      let hidden = false;
      if (!_.isEmpty(item.conditions)) {
        hidden = item.conditions.some((key) => {
          const val = _.get(formValues, key);
          return _.isNil(val) || val === '';
        });
      }
      let disabled = formDisabled;
      if (!disabled && !_.isEmpty(item.dependOn)) {
        disabled = item.dependOn.some((key) => {
          const val = _.get(formValues, key);
          return _.isNil(val) || val === '';
        });
      }
      return { ...item, hidden, disabled };
    });
  }, [fields, formValues]);

  const handleChange = useCallback(
    (val, allValues) => {
      console.log('current12', val, allValues);
      const name = Object.keys(val)[0];
      const value = val[name];
      const isInvalid = _.isNil(value) || value === '';
      let tempArr = [...fieldsData];
      if (dependOnTriggers[name]) {
        dependOnTriggers[name].forEach(({ key, index }) => {
          allValues[key] = null;
          form.setFieldValue(key, null);
          tempArr[index].disabled = isInvalid;
        });
      }
      if (conditionsTriggers[name]) {
        conditionsTriggers[name].forEach(({ index }) => {
          tempArr[index].hidden = isInvalid;
        });
      }
      setFieldsData(tempArr);
      onChange(allValues);
    },
    [fields]
  );
  console.log('fieldsData', fieldsData, fields);

  return (
    <Form form={form} onValuesChange={handleChange}>
      {prefixItems}
      {fieldsData?.map((field) => {
        const {
          componentType,
          key,
          label,
          isRequired,
          hidden,
          disabled,
          defaultText,
        } = field;
        if (hidden) return null;
        const Widget = Widgets[componentType];
        const itemProps = {
          key,
          name: key,
          label,
          required: isRequired,
          initialValue: _.get(formValues, key) || defaultText,
        };
        return (
          Widget && (
            <Form.Item {...itemProps}>
              <Widget disabled={disabled} name={key} />
            </Form.Item>
          )
        );
      })}
      {suffixItems}
    </Form>
  );
});
