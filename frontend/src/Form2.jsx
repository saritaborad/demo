import React, { useState } from 'react';

const Form = () => {
  const [formFields, setFormFields] = useState([
    { type: 'text', label: 'Text Field', value: '', required: true },
    { type: 'radio', label: 'Radio Button', options: ['Option 1', 'Option 2'], selected: '', required: false },
    { type: 'checkbox', label: 'Checkbox', options: ['Option 1', 'Option 2'], selected: [], required: true },
    { type: 'dropdown', label: 'Dropdown', options: ['Option 1', 'Option 2'], selected: '', required: false },
  ]);

  const handleChange = (index, field, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][field] = value;
    setFormFields(updatedFields);
  };

  const handleAddField = (type) => {
    setFormFields([...formFields, getDefaultField(type)]);
  };

  const getDefaultField = (type) => {
    switch (type) {
      case 'text':
        return { type: 'text', label: 'Text Field', value: '', required: true };
      case 'radio':
        return { type: 'radio', label: 'Radio Button', options: ['Option 1', 'Option 2'], selected: '', required: false };
      case 'checkbox':
        return { type: 'checkbox', label: 'Checkbox', options: ['Option 1', 'Option 2'], selected: [], required: true };
      case 'dropdown':
        return { type: 'dropdown', label: 'Dropdown', options: ['Option 1', 'Option 2'], selected: '', required: false };
      default:
        return {};
    }
  };

  const handleSubmit = () => {
    // Validation check
    const isValid = formFields.every((field) => !field.required || (field.required && field.value !== '' && field.selected !== ''));
    
    if (!isValid) {
      alert('Please fill in all required fields.');
      return;
    }

    // You can handle form submission logic here
    console.log(formFields);
  };

  return (
    <div>
      <h1>Create a Form</h1>
      <form>
        {formFields.map((field, index) => (
          <div key={index}>
            <label>
              {field.label}
              {field.required && ' (*)'}
            </label>
            {field.type === 'text' && (
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleChange(index, 'value', e.target.value)}
              />
            )}
            {field.type === 'radio' && (
              <div>
                {field.options.map((option, optionIndex) => (
                  <label key={optionIndex}>
                    <input
                      type="radio"
                      value={option}
                      checked={field.selected === option}
                      onChange={() => handleChange(index, 'selected', option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {field.type === 'checkbox' && (
              <div>
                {field.options.map((option, optionIndex) => (
                  <label key={optionIndex}>
                    <input
                      type="checkbox"
                      value={option}
                      checked={field.selected.includes(option)}
                      onChange={() => {
                        const selected = field.selected.includes(option)
                          ? field.selected.filter((item) => item !== option)
                          : [...field.selected, option];
                        handleChange(index, 'selected', selected);
                      }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {field.type === 'dropdown' && (
              <select
                value={field.selected}
                onChange={(e) => handleChange(index, 'selected', e.target.value)}
              >
                <option value="">Select an option</option>
                {field.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            <button type="button" onClick={() => handleAddField(field.type)}>
              Add {field.type === 'text' ? 'Text Field' : field.type}
            </button>
          </div>
        ))}
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
