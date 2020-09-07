import { demo } from './schemas/demo.js';
export const isInvalid = (body,formType) => {
    return schemas[formType].validator(body);
  };
const schemas = {
    demoFormType: demo
};