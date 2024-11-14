import { ElementFactory } from "survey-core";
import { FeedbackComponent } from "./FeedbackComponent";


const CUSTOM_TYPE = "color-picker";

export function registerFeedbackComponent() {
  ElementFactory.Instance.registerElement(
    CUSTOM_TYPE,
    (name) => {
      return new FeedbackComponent(name);
    }
  );
}
