import {
  $,
  resetInput,
  disableElements,
  activateElements,
} from "../util/domUtil.js";
import { ERROR_MESSAGE } from "../util/errorMessage.js";
import { CAR_NAME_MAX_LENGTH } from "../util/constant.js";

export default class CarNameInput {
  constructor(props) {
    this.props = props;
    this.mountDOM();

    this.bindEvents();
  }

  mountDOM() {
    this.$target = $(".car-name-input-containter");
    this.$carNameInput = $(".car-name-input-containter input[type=text]");
    this.$carNameSummitBtn = $(".car-name-input-containter button");
  }

  bindEvents() {
    this.$carNameSummitBtn.addEventListener(
      "click",
      this.handleSubmitCarName.bind(this),
    );
  }

  handleSubmitCarName() {
    const { setCarNames } = this.props;
    const inputCarName = this.$carNameInput.value;
    const carNames = inputCarName.split(",").map((name) => name.trim());
    const errorMessage = this.checkValidInput({ inputCarName, carNames });

    if (errorMessage) {
      alert(errorMessage);
      resetInput(this.$carNameInput);
      return;
    }

    disableElements(this.$carNameInput, this.$carNameSummitBtn);
    setCarNames(carNames);
  }

  resetElements() {
    activateElements(this.$carNameInput, this.$carNameSummitBtn);
    resetInput(this.$carNameInput);
  }

  checkValidInput({ inputCarName, carNames }) {
    if (this.isEmptyCarName(inputCarName.trim())) {
      return ERROR_MESSAGE.EMPTY_CAR_NAME_INPUT;
    }

    if (this.isOneCarName(carNames)) {
      return ERROR_MESSAGE.ONE_CAR_NAME_INPUT;
    }

    if (this.isContainEmptyString(carNames)) {
      return ERROR_MESSAGE.EMPTY_STRING_CAR_NAME_INPUT;
    }

    if (this.isDuplicatedCarName(carNames)) {
      return ERROR_MESSAGE.DUPLICATED_CAR_NAME_INPUT;
    }

    if (this.isOverMaxLengthCarName(carNames)) {
      return ERROR_MESSAGE.OVER_MAX_LENGTH_CAR_NAME_INPUT;
    }

    return "";
  }

  isEmptyCarName(inputCarName) {
    return inputCarName === "";
  }

  isOneCarName(carNames) {
    return carNames.length < 2;
  }

  isContainEmptyString(carNames) {
    return carNames.some((carName) => this.isEmptyCarName(carName));
  }

  isDuplicatedCarName(carNames) {
    return carNames.length !== new Set(carNames).size;
  }

  isOverMaxLengthCarName(carNames) {
    return carNames.some((carName) => carName.length > CAR_NAME_MAX_LENGTH);
  }
}
