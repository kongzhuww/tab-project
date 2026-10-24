import { reactive } from "vue";

export type AppDialogType = "prompt" | "confirm" | "alert";

export interface AppDialogState {
  isOpen: boolean;
  type: AppDialogType;
  title: string;
  message: string;
  value: string;
  placeholder: string;
  inputType: "text" | "password";
  confirmText: string;
  cancelText: string;
  danger: boolean;
  resolve?: (value: any) => void;
}

export const appDialogState = reactive<AppDialogState>({
  isOpen: false,
  type: "confirm",
  title: "",
  message: "",
  value: "",
  placeholder: "",
  inputType: "text",
  confirmText: "确定",
  cancelText: "取消",
  danger: false,
  resolve: undefined
});

export const appDialog = {
  prompt(options: {
    title: string;
    message?: string;
    defaultValue?: string;
    placeholder?: string;
    inputType?: "text" | "password";
    confirmText?: string;
    cancelText?: string;
  }): Promise<string | null> {
    return new Promise((resolve) => {
      appDialogState.isOpen = true;
      appDialogState.type = "prompt";
      appDialogState.title = options.title || "请输入";
      appDialogState.message = options.message || "";
      appDialogState.value = options.defaultValue || "";
      appDialogState.placeholder = options.placeholder || "";
      appDialogState.inputType = options.inputType || "text";
      appDialogState.confirmText = options.confirmText || "确定";
      appDialogState.cancelText = options.cancelText || "取消";
      appDialogState.danger = false;
      appDialogState.resolve = resolve;
    });
  },

  confirm(options: {
    title: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    danger?: boolean;
  }): Promise<boolean> {
    return new Promise((resolve) => {
      appDialogState.isOpen = true;
      appDialogState.type = "confirm";
      appDialogState.title = options.title || "请确认";
      appDialogState.message = options.message || "";
      appDialogState.value = "";
      appDialogState.confirmText = options.confirmText || "确定";
      appDialogState.cancelText = options.cancelText || "取消";
      appDialogState.danger = options.danger ?? true;
      appDialogState.resolve = resolve;
    });
  },

  alert(options: {
    title?: string;
    message: string;
    confirmText?: string;
  }): Promise<void> {
    return new Promise((resolve) => {
      appDialogState.isOpen = true;
      appDialogState.type = "alert";
      appDialogState.title = options.title || "提示";
      appDialogState.message = options.message || "";
      appDialogState.value = "";
      appDialogState.confirmText = options.confirmText || "我知道了";
      appDialogState.cancelText = "";
      appDialogState.danger = false;
      appDialogState.resolve = () => resolve();
    });
  },

  handleConfirm() {
    const fn = appDialogState.resolve;
    const type = appDialogState.type;
    const val = appDialogState.value;
    appDialogState.isOpen = false;
    appDialogState.resolve = undefined;
    if (fn) {
      if (type === "prompt") fn(val);
      else if (type === "confirm") fn(true);
      else fn(undefined);
    }
  },

  handleCancel() {
    const fn = appDialogState.resolve;
    const type = appDialogState.type;
    appDialogState.isOpen = false;
    appDialogState.resolve = undefined;
    if (fn) {
      if (type === "prompt") fn(null);
      else if (type === "confirm") fn(false);
      else fn(undefined);
    }
  }
};

if (typeof window !== "undefined") {
  (window as any).appDialog = appDialog;
}
