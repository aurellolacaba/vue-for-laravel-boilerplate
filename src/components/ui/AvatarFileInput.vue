<template>
    <FilePond
        class="filepond"
        name="file"
        ref="pond"
        :files="files"
        accepted-file-types="image/*"
        labelIdle="Upload Avatar"
        imagePreviewHeight="170" 
        imageCropAspectRatio="1:1"
        imageResizeTargetWidth="200" 
        imageResizeTargetHeight="200" 
        stylePanelLayout="compact circle"
        styleLoadIndicatorPosition="center bottom"
        styleProgressIndicatorPosition="right bottom"
        styleButtonRemoveItemPosition="left bottom"
        styleButtonProcessItemPosition="right bottom"
        @init="handleFilePondInit"
        @updatefiles="updateFiles"
        @processfile="handleProcessFile"
        :server="serverConfig"
    />
</template>


<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import vueFilePond from 'vue-filepond';
import { AuthService } from '../../services/AuthService';

// Import FilePond and necessary plugins
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';

// Register plugins
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit
);

// Define props for customization
const props = defineProps({
  previewHeight: {
    type: Number,
    default: 170
  },
  cropAspectRatio: {
    type: String,
    default: '1:1'
  },
  resizeTargetWidth: {
    type: Number,
    default: 200
  },
  resizeTargetHeight: {
    type: Number,
    default: 200
  },
  panelLayout: {
    type: String,
    default: 'compact'
  }
});

// Define emit for file updates
const emit = defineEmits(['update:files', 'process:files']);

// File state management
const files = ref([]);

const serverConfig = {
  process: {
    url: 'http://localhost:8000/api/v1/upload',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': AuthService.getBearer()
    },
    onload: (response) => {
      console.log('Raw response:', response);

      try {
        const { id } = JSON.parse(response);
        files.value.push(id)
      } catch (e) {
        console.error('Failed to parse server response:', e);
      }
    },
  },
  revert: {
    url: 'http://localhost:8000/api/v1/delete', // Optional: URL for reverting/deleting files
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': AuthService.getBearer()
    },
    onload: (response) => {
      console.log('Revert response:', response);
      // Optionally update form or handle revert response
      form.fileId = null;
      form.fileName = null;
    }
  },
  onremovefile: (error, file) => {
    if (error) {
      console.error('File removal error:', error);
      return;
    }
    
    // Clear fileId and fileName when a file is removed
    form.fileId = null;
    form.fileName = null;
  },
};

// Emit the file update to the parent component
const updateFiles = (newFiles) => {
  files.value = newFiles;
  emit('update:files', newFiles);
};

const handleFilePondInit = () => {
    console.log('filepond initialized')
}

const handleProcessFile = () => {
    emit('process:files', files.value);
    console.log('File upload completed:', fileItem);
};
</script>

<style>
.filepond--panel-root {
    @apply bg-gray-50 dark:bg-gray-700;
}

.filepond--drop-label {
    @apply dark:text-white;
}
</style>