import { createContext, useContext } from 'react';
import { makeAutoObservable } from 'mobx';
import _ from 'lodash';

class FormStore {
  constructor(initialValues, fields) {
    makeAutoObservable(this);
    console.log(fields);
    this.formValues = initialValues;
    this.formDefinition = fields;
  }
  formValues = {};
  formDefinition = [];
  showErrorStatus = '';
  setItemValue = (name, value) => {
    // const tempValues = { ...this.formValues };
    // tempValues[name] = value;
    // this.formValues = tempValues;
    _.set(this.formValues, name, value);
  };
  setFormValues = (values) => (this.formValues = values);
  setFormDefinition = (val) => (this.formDefinition = val);
  setFormField = (name, field) => {
    const index = this.formDefinition.findIndex((item) => item.key === name);
    this.formDefinition.splice(index, 1, field);
  };
  setShowErrorStatus = val => this.showErrorStatus = val;
}

export default FormStore;
export const FormContext = createContext(new FormStore());
export const useFormStore = () => useContext(FormContext);
