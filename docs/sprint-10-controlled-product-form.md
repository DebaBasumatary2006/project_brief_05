# Sprint 10: Controlled Product Form and Validation

## Sprint Goal
Build a project-specific Product Entry form whose values are managed by React state, with client-side validation and useful feedback before backend integration.

## Completed Work
- All nine fields are controlled by the Product Entry component's React state.
- Submit prevents the default browser navigation and validates values before processing.
- Invalid submissions show field-specific feedback, accessible error associations, and a summary alert.
- Product name, SKU, price, quantity, reorder level, and description rules are enforced.
- Valid submission logs the form data locally, announces success, and clears the fields.
- Reset clears all values and any visible errors or success message.
- The form does not send data to the backend.

## Validation Explanation (100–150 Words)
The Product Entry form requires nine fields: product name, SKU, category, supplier, purchase price, selling price, stock quantity, reorder level, and description. Product names must have at least two non-space characters. SKUs may contain only letters, digits, and hyphens. Both prices must be greater than zero, and selling price cannot be lower than purchase price. Quantity and reorder level must be whole numbers greater than or equal to zero. Descriptions require at least ten non-space characters. These rules prevent incomplete or inconsistent entries before submission. Each message appears beside its field and is associated with the input for assistive technology. Empty or invalid submissions do not reload the page. After a valid submission, the form logs its data to the browser console, displays a success confirmation, and clears the controlled fields. Data remains in the frontend; it is not sent to the backend.

## Verification
- Browser-tested empty submission: all nine field errors appeared and the URL did not change.
- Browser-tested valid submission: success feedback appeared and form values cleared.
- Browser-tested Reset: values and feedback cleared.
- Production build completed successfully after the accessibility updates.

## GitHub
No commit or push was performed. Work remains local as requested.
