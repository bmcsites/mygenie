export interface ProfileInterface {
  id?: string
  username: string
  website: string
  avatar_url: string
}

export interface InputObj {
  name: string;
  label: string;
  moreLabel?: string;
  inputType: string;
  controlName: string;
  mask?: string;
  maxlength?: number;
  thousandSeparator?: string;
  notificationList: NotificationObj[];
  radioList?: RadioList[];
}

export interface NotificationObj {
  notificationType: string;
  text: string;
}

export interface RadioList {
  value: number;
  text: string;
}
