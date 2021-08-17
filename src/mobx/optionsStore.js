// Imports
import { makeObservable, observable, action } from 'mobx';

class OptionsStore {
  toggleOptions = false;

  options = {};

  tempOptions = {};

  currentOptions = {};

  optionsShouldUpdate = true;

  darkMode = false;

  toggleEditInputOption = false;

  inputOptionValue = '';

  errorInput = false;

  editContentId = null;

  toggleAddOptionsContent = false;

  toggleEditOptionsContent = false;

  constructor() {
    makeObservable(this, {
      toggleOptions: observable,
      options: observable,
      tempOptions: observable,
      currentOptions: observable,
      optionsShouldUpdate: observable,
      darkMode: observable,
      toggleEditInputOption: observable,
      toggleAddOptionsContent: observable,
      toggleEditOptionsContent: observable,
      inputOptionValue: observable,
      errorInput: observable,
      editContentId: observable,
      openOptions: action,
      getInitialOptions: action,
      selectCurrentOptions: action,
      editInputOption: action,
      addOptionsContent: action,
      editOptionsContent: action,
      checkArchivePath: action,
      applyInputOption: action,
      cancelOptions: action,
      submitOptions: action,
      isChangedOptions: action,
      onChangeInputOption: action,
      applyAddOptionsContent: action,
      cancelAddOptionsContent: action,
      cancelEditOptionsContent: action,
      deleteOptionsContent: action,
    });
  }

  getInitialOptions = (data) => {
    // { headers, initialContent }
    this.options = { header: data.headers, content: data.initialContent };
    this.optionsShouldUpdate = false;

    this.currentOptions = {
      header: this.options.header[0],
      content: this.options.content[this.options.header[0].value],
    };
    this.darkMode = this.options.content.visual[0].contentValue;
  };

  // open options
  openOptions = () => {
    this.toggleOptions = true;
    this.tempOptions = JSON.parse(JSON.stringify(this.options));
  };

  // button ok to close options
  submitOptions = () => {
    this.toggleOptions = false;
    this.toggleEditInputOption = false;
    this.inputOptionValue = '';
    this.toggleAddOptionsContent = false;
    this.toggleEditOptionsContent = false;
    this.editContentId = null;
    this.errorInput = false;
  };

  // chechs options for changes
  isChangedOptions = () => {
    return JSON.stringify(this.options) !== JSON.stringify(this.tempOptions);
  };

  // exit options
  cancelOptions = () => {
    this.toggleOptions = false;
    this.toggleEditInputOption = false;
    this.inputOptionValue = '';
    this.toggleAddOptionsContent = false;
    this.toggleEditOptionsContent = false;
    this.editContentId = null;
    this.errorInput = false;
    this.options = JSON.parse(JSON.stringify(this.tempOptions));
    this.currentOptions = {
      header: this.currentOptions.header,
      content: this.tempOptions.content[this.currentOptions.header.value],
    };
    this.darkMode = this.options.content.visual[0].contentValue;
  };

  // change current option view
  selectCurrentOptions = (id) => {
    this.toggleEditInputOption = false;
    this.inputOptionValue = '';
    this.toggleAddOptionsContent = false;
    this.toggleEditOptionsContent = false;
    this.editContentId = null;
    this.errorInput = false;
    const optionsHeader = this.options.header.find(
      (option) => option.id === id,
    );
    this.currentOptions = {
      header: optionsHeader,
      content: this.options.content[optionsHeader.value],
    };
  };

  // button edit existing option
  editInputOption = ({ _id, _value }) => {
    this.toggleEditInputOption = !this.toggleEditInputOption;
    this.editContentId = this.toggleEditInputOption === true ? _id : null;
    this.inputOptionValue = this.toggleEditInputOption === true ? _value : '';
  };

  // button add new options to content
  addOptionsContent = () => {
    this.toggleAddOptionsContent = true;
  };

  checkArchivePath = () => {};

  // add new option to content
  applyAddOptionsContent = (data) => {
    if (this.inputOptionValue === '') {
      this.errorInput = true;
    }

    if (this.inputOptionValue !== '') {
      this.toggleAddOptionsContent = false;

      const addedContent = [
        ...this.options.content[data.header.value],
        {
          contentId: this.options.content[data.header.value].length + 1,
          contentValue: this.inputOptionValue,
        },
      ];

      this.options.content[data.header.value] = addedContent;
      this.currentOptions.content = addedContent;
      this.inputOptionValue = '';
      this.errorInput = false;
    }
  };

  // button to cancel adding new content
  cancelAddOptionsContent = () => {
    this.toggleAddOptionsContent = false;
    this.inputOptionValue = '';
    this.errorInput = false;
  };

  // button to edit existing list of content
  editOptionsContent = () => {
    this.toggleEditOptionsContent = true;
    this.errorInput = false;
  };

  // button to cancel editing of existing list of content
  cancelEditOptionsContent = () => {
    this.toggleEditOptionsContent = false;
    this.inputOptionValue = '';
    this.errorInput = false;
  };

  // delete option from content
  deleteOptionsContent = ({ headerValue, contentId }) => {
    const copyContent = JSON.parse(
      JSON.stringify(this.options.content[headerValue]),
    );
    const filteredOptions = copyContent.filter(
      (option) => option.contentId !== contentId,
    );

    this.currentOptions.content = filteredOptions;

    this.options.content[headerValue] = filteredOptions;
    this.toggleEditOptionsContent = false;
    this.inputOptionValue = '';
  };

  // apply value when edit existing option
  applyInputOption = ({ optionType, optionValue, contentId }) => {
    // 'select' 'orderHeaders' 1
    if (this.inputOptionValue === '' && optionType !== 'switch') {
      this.errorInput = true;
    }

    if (
      (this.inputOptionValue !== '' && optionType !== 'select') ||
      optionType === 'switch'
    ) {
      const updatedContent = this.options.content[optionValue].map(
        (content) => {
          const newContentValue =
            optionType === 'switch'
              ? !content.contentValue
              : this.inputOptionValue;

          if (content.contentId === contentId) {
            return {
              ...content,
              contentValue: newContentValue,
            };
          }

          return content;
        },
      );

      this.currentOptions.content = updatedContent;
      this.options.content[optionValue] = updatedContent;
      this.darkMode = this.options.content.visual[0].contentValue;
      this.toggleEditInputOption = false;
      this.editContentId = null;
      this.inputOptionValue = '';
      this.errorInput = false;
    }

    if (this.inputOptionValue !== '' && optionType === 'select') {
      const oldValue = this.options.content[optionValue].find(
        (option) => option.contentId === contentId,
      );
      const newValue = this.options.content[optionValue].find(
        (option) => option.contentValue === this.inputOptionValue,
      );

      const updatedContent = this.options.content[optionValue].map(
        (content) => {
          if (content.contentId === oldValue.contentId) {
            return {
              ...content,
              contentValue: newValue.contentValue,
            };
          }

          if (content.contentId === newValue.contentId) {
            return {
              ...content,
              contentValue: oldValue.contentValue,
            };
          }

          return content;
        },
      );

      this.currentOptions.content = updatedContent;
      this.options.content[optionValue] = updatedContent;
      this.darkMode = this.options.content.visual[0].contentValue;
      this.toggleEditInputOption = false;
      this.editContentId = null;
      this.inputOptionValue = '';
      this.errorInput = false;
    }
  };

  // on change input value
  onChangeInputOption = (value) => {
    this.errorInput = false;
    this.inputOptionValue = value;
  };
}

export default OptionsStore;
