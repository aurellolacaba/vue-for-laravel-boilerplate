import { reactive, ref, watch } from 'vue';

export function useForm(initialValues = {}) {
  // Reactive form state
  const form = reactive({
    ...initialValues,
    isProcessing: false,
    isDirty: false,
  });

  // Save the initial state to compare for dirty checking
  const initialState = { ...initialValues };

  // Watch for changes to detect if the form is dirty
  watch(
    () => ({ ...form }), // Shallow watch to detect changes in form fields
    () => {
      form.isDirty = Object.keys(initialState).some(key => form[key] !== initialState[key]);
    },
    { deep: true }
  );

  const startProcessing = () => {
    form.isProcessing = true;
  };

  const stopProcessing = () => {
    form.isProcessing = false;
  };

  const reset = () => {
    Object.keys(initialState).forEach(key => {
      form[key] = initialState[key];
    });
    form.isDirty = false;
  };

  return form;
}