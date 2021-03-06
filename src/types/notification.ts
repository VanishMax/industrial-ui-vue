// eslint-disable-next-line import/no-unresolved,import/extensions
import {CombinedVueInstance} from 'vue/types/vue';
import {ComponentConfig} from '@/types/components';
import Timer from '@/utils/timer';

export type NotificationTimeouts = {
  [key: string]: Timer,
}

export interface NotificationGroupConfig extends ComponentConfig {
  hasNotificationsClass: string,
  hasNoNotificationsClass: string,
  notificationClass: string,
  notificationComponent: CombinedVueInstance<any, any, any, any, any>|null,

  next: 'first'|'last'|'replace'|'force-replace',
  maxAmount: number|null,
  timeout: number,

  closeOnClick: boolean,
  closeOnDrag: boolean,
  pauseOnFocusLost: boolean,
}

export interface NotificationConfig {
  class: string,
  isProp: string, // IsProperty string. Configurable in the NotificationGroupConfig
  timeout: number|null,

  closeOnClick: boolean,
  closeOnDrag: boolean,

  // Any other property
  [key: string]: any,
}

type NotData = () => {
  value: string[],
};

export type NotificationClass = {
  id: string,
  remove: () => void,
  removeFirst: () => void,
  removeLast: () => void,
  removeAll: () => void,
};

export type ComponentOrOptions = CombinedVueInstance<any, any, any, any, any> | NotificationConfig | string

export type NotificationAddMethod = (
  componentOrOptions: ComponentOrOptions,
  options?: Partial<NotificationConfig>,
) => NotificationClass|null;

type NotMethods = {
  pushNotification: (notification: Notification) => void,
  checkClosing: (e: Event, id: string) => void,
  add: (componentOrOptions: ComponentOrOptions,
        options?: Partial<NotificationConfig>) => string|null,
  remove: (id: string) => void,
  removeFirst: () => void,
  removeLast: () => void,
  removeAll: () => void,
};

type NotComputed = {
  properties: () => Record<string, unknown>,
  notifications: () => [],
};

export type NotificationInstance = CombinedVueInstance<Vue, NotData, NotMethods, NotComputed, NotificationGroupConfig>;
