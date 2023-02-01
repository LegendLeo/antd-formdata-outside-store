import React, { useEffect } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import ConfigForm from './components/Form';
import { useFormStore } from './stores/form';
import { observer } from 'mobx-react';

const formDefinition = [
  {
    key: 'username',
    defaultText: '123',
    isRequired: true,
    label: '用户名',
    componentType: 'Input',
  },
  {
    key: 'price',
    label: '价格',
    isRequired: true,
    componentType: 'PriceInput',
    dependOn: ['username'],
  },
  {
    key: 'dict',
    label: '字典',
    isRequired: false,
    componentType: 'Dictionary',
    dependOn: ['username', 'price'],
  },
  {
    key: 'username2',
    defaultText: '123',
    isRequired: true,
    label: '用户名2',
    componentType: 'Input',
  },
  {
    key: 'price2',
    label: '价格2',
    isRequired: true,
    componentType: 'PriceInput',
  },
  {
    key: 'preview',
    label: '测试数据',
    isRequired: false,
    componentType: 'ValuePreviewer',
    conditions: ['username', 'price'],
  },
];

const App = () => {
  // const formStore = new FormStore(
  //   { username: '111', price: null },
  //   formDefinition
  // );
  // const formStore = useContext(FormContext);
  const formStore = useFormStore();
  useEffect(() => {
    formStore.setFormDefinition(formDefinition);
    formStore.setFormValues({ username: '111', price: null });
  }, []);

  return (
    <>
      {/* <FormContext.Provider value={formStore}> */}
      <ConfigForm
        onChange={formStore.setFormValues}
        fields={formStore.formDefinition}
        suffixItems={
          <>
            <pre className="language-bash">
              {JSON.stringify(formStore.formValues, null, 2)}
            </pre>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </>
        }
      />

      {/* </FormContext.Provider> */}
    </>
  );
};

export default observer(App);
