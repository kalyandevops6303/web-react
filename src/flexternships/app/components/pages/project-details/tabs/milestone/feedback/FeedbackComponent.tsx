import { Question } from "survey-core";

const CUSTOM_TYPE = "color-picker";

export class FeedbackComponent extends Question {
    getType() {
      return CUSTOM_TYPE;
    }
    get colorPickerType() {
      return this.getPropertyValue("colorPickerType");
    }
    set colorPickerType(val) {
      this.setPropertyValue("colorPickerType", val);
    }
  
    get disableAlpha() {
      return this.getPropertyValue("disableAlpha");
    }
    set disableAlpha(val) {
      this.setPropertyValue("disableAlpha", val);
    }
  }