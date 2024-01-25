import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitForm } from '../actions/formActions';

const Form = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState([
    { label: '', type: 'text', required: false },
  ]);

  const handleAddField = ()=> {
    setFormFields([...formFields, { label: '', type: 'text', required: false }]);
  };

  const handleInputChange = (index, key, value ) => {
    const updatedFields = [...formFields];
    updatedFields[index][key] = value;
    setFormFields(updatedFields);
  };

  const handleSubmit = () => {
    dispatch(submitForm(formFields));
  };

  return (
    <div>
      {formFields.map((field, index) => (
        <div key={index}>
          <label>
            Label:
            <input
              type="text"
              value={field.label}
              onChange={(e) => handleInputChange(index, 'label', e.target.value)}
            />
          </label>
          <label>
            Type:
            <select
              value={field.type}
              onChange={(e) => handleInputChange(index, 'type', e.target.value)}
            >
              <option value="text">Text</option>
              <option value="radio">Radio</option>
              <option value="checkbox">Checkbox</option>
              <option value="dropdown">Dropdown</option>
            </select>
          </label>
          <label>
            Required:
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => handleInputChange(index, 'required', e.target.checked)}
            />
          </label>
        </div>
      ))}
      <button onClick={handleAddField}>Add Field</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Form;
