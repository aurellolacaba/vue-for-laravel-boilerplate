import cloneDeep from "lodash.clonedeep";
import isEqual from "lodash.isequal";
import { reactive, watch } from "vue";

export function useForm(fields) {
  let defaults =  fields
  let recentlySuccessfulTimeoutId

  const form = reactive({
    fields: cloneDeep(fields),
    errors: {},
    isDirty: false,
    hasErrors: false,
    isProcessing: false,
    wasSuccessful: false,
    recentlySuccessful: false,

    async submit(submitfn, hooks = {}) {
      if (this.isProcessing) return

      const _hooks = {
        onBefore: async () => {
          this.isProcessing = true
          this.wasSuccessful = false
          this.recentlySuccessful = false
          clearTimeout(recentlySuccessfulTimeoutId)

          if (hooks.onBefore) {
            await hooks.onBefore();
          }
        },
        onSuccess: async (response) => {
          this.clearErrors()
          this.wasSuccessful = true
          this.recentlySuccessful = true

          recentlySuccessfulTimeoutId = setTimeout(() => {
            this.recentlySuccessful = false
          }, 200)

          if(hooks.onSuccess) {
            await hooks.onSuccess(response)
          }

          defaults = cloneDeep(this.fields)
        },
        onError: async (error) => {
          this.hasErrors = true

          if (error?.status === 422) {
            this.clearErrors()
            this.setErrors(error?.errors)
          }

          if(hooks.onError) {
            await hooks.onError(error)
          }
        },
        onFinish: async () => {
          this.isProcessing = false
          
          if(hooks.onFinish) {
            await hooks.onFinish()
          }
        },
      }

      await _hooks.onBefore()

      try {
        const response = await submitfn(this.fields)
        await _hooks.onSuccess(response)
      } catch (error) {
        await _hooks.onError(error)
      } finally {
        await _hooks.onFinish()
      }
    },
    reset(...fields) {
      const cloneDefaults = cloneDeep(defaults)

      if (fields.length === 0) {
        this.fields = cloneDefaults
      } else {
        fields.forEach((field) => {
          if (cloneDefaults[field] !== undefined) {
            this.fields[field] = cloneDefaults[field]
          }
        })
      }
    },
    clearErrors(...fields) {
      if (fields.length === 0) {
        this.errors = {}
      } else {
        fields.forEach((field) => delete this.errors[field])
      }

      this.hasErrors = Object.keys(this.errors).length > 0
    },
    setErrors(errors) {
      this.errors = {
        ...this.errors,
        ...errors
      }

      this.hasErrors = Object.keys(this.errors).length > 0
    },
    setDefaults(newDefaults) {
      defaults = newDefaults
    
      // // Reset the form fields to the updated defaults
      this.fields = cloneDeep(newDefaults);
    
      // // Update isDirty based on new defaults
      // this.isDirty = !isEqual(this.fields, defaults);
    }
  })

  watch(
    () => form.fields,
    () => {
      form.isDirty = !isEqual(form.fields, defaults)
    },
    { immediate: true, deep: true }
  )

  return form
}

















// import { reactive, ref, watch } from 'vue';

// export function useForm(initialValues = {}) {
//   // Reactive form state
//   const form = reactive({
//     ...initialValues,
//     isProcessing: false,
//     isDirty: false,
//   });

//   // Save the initial state to compare for dirty checking
//   const initialState = { ...initialValues };

//   // Watch for changes to detect if the form is dirty
//   watch(
//     () => ({ ...form }), // Shallow watch to detect changes in form fields
//     () => {
//       form.isDirty = Object.keys(initialState).some(key => form[key] !== initialState[key]);
//     },
//     { deep: true }
//   );

//   const startProcessing = () => {
//     form.isProcessing = true;
//   };

//   const stopProcessing = () => {
//     form.isProcessing = false;
//   };

//   const reset = () => {
//     Object.keys(initialState).forEach(key => {
//       form[key] = initialState[key];
//     });
//     form.isDirty = false;
//   };

//   return form;
// }