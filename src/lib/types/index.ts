import {DeepPartial} from '@/lib/types/special';

export type Option = {
  slug: string,
  [key: string]: any,
};

export interface IsProperties {
  [isProp: string]: string,
}

export interface AnimationOptions {
  delay: number,
  duration: number,
  easing: (fraction: number) => number,
}

export interface TransitionOptions {
  animation: Partial<AnimationOptions>,
  options: {
    appear: boolean,
    mode: 'in-out'|'out-in',
  },
}

export interface TransitionHooks {
  beforeEnter: (native: {el: HTMLElement}, animation: AnimationOptions) => void,
  enter: (native: {el: HTMLElement; done: () => void}, animation: AnimationOptions) => void,
  afterEnter: (native: {el: HTMLElement}, animation: AnimationOptions) => void,
  enterCancelled: (native: {el: HTMLElement}, animation: AnimationOptions) => void,
  beforeLeave: (native: {el: HTMLElement}, animation: AnimationOptions) => void,
  leave: (native: {el: HTMLElement; done: () => void}, animation: AnimationOptions) => void,
  afterLeave: (native: {el: HTMLElement}, animation: AnimationOptions) => void,
  leaveCancelled: (native: {el: HTMLElement}, animation: AnimationOptions) => void,
}

export interface Transition extends Partial<TransitionOptions> {
  name: string,
  hooks?: Partial<TransitionHooks>,
}

export interface ComponentConfig {
  class: string,
  isProperties: IsProperties,
  transition?: 'fade'|string|null,
}

export type ButtonConfig = ComponentConfig

export interface DropdownConfig extends ComponentConfig {
  openClass: string,
  closeClass: string,

  triggerClass: string,
  openTriggerClass: string,
  closeTriggerClass: string,

  dropdownClass: string,
  openDropdownClass: string,
  closeDropdownClass: string,
}

export interface ModalConfig extends ComponentConfig {
  moveToBody: boolean,
  blockBodyScroll: boolean,

  openClass: string,
  closeClass: string,

  overlayClass: string,
  openOverlayClass: string,
  closeOverlayClass: string,

  bodyClass: string,
  openBodyClass: string,
  closeBodyClass: string,
}

export interface CheckboxConfig extends ComponentConfig {
  checkedClass: string,
  uncheckedClass: string,
  disabledClass: string,
  requiredClass: string,
  inputClass: string,
  spanClass: string,
}

export interface RadioConfig extends ComponentConfig {
  checkedClass: string,
  uncheckedClass: string,
  disabledClass: string,
  requiredClass: string,
  inputClass: string,
  spanClass: string,
}

export type RadioGroupConfig = ComponentConfig;
export type CheckboxGroupConfig = ComponentConfig;

export interface ConfigComponents {
  button: ButtonConfig,
  dropdown: DropdownConfig,
  modal: ModalConfig,
  checkbox: CheckboxConfig,
  radio: RadioConfig,
  radioGroup: RadioGroupConfig,
  checkboxGroup: CheckboxGroupConfig,
  [key: string]: any,
}

export interface Config {
  stylesheets: [string] | [],
  globalClass: string,
  transitions: {
    [name: string]: Transition,
  },
  components: ConfigComponents,
}

export type PartialConfig = DeepPartial<Config>;
