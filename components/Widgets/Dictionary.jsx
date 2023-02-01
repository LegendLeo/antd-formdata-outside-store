import React, { memo } from 'react';
import { Input, Form, Space, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default memo(function (props) {
  const { name } = props;
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{ display: 'flex', marginBottom: 8 }}
              align="baseline"
            >
              <Form.Item
                {...restField}
                name={[name, 'left']}
                rules={[{ required: true, message: 'Key必填' }]}
              >
                <Input placeholder="Key" />
              </Form.Item>
              <Form.Item {...restField} name={[name, 'right']}>
                <Input />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add field
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
});
