const forms = [
 {
  model: "Form",
  documents: [
   {
    _id: "5f5b05bea1c3d7f864bd8d45", // You can change this ID
    fields: [
     { label: "Full Name", type: "text", required: true },
     { label: "Gender", type: "radio", options: ["Male", "Female"], required: true },
     { label: "Agree to terms", type: "checkbox", options: ["Yes"], required: false },
     { label: "Country", type: "dropdown", options: ["USA", "Canada", "Other"], required: true },
    ],
   },
  ],
 },
];

module.exports = forms;
