import config from '../src/config/config';

declare global {
  type ReplaceReturnType<T extends (...args: any) => any, TNewReturn> = (
    ...args: Parameters<T>
  ) => TNewReturn;

  type ActionToPropsType<T extends (...args: any) => any> = ReplaceReturnType<T, void>;

  type ListStateType<T extends any> = {
    datas: Array<T>;
    needMore: boolean;
    isLoading: boolean;
  };

  type MultiListStateType<T = any, CT = any> = {
    [key in string]?: T & {
      list: ListStateType<CT>;
    };
  };

  interface OptionType {
    label: React.ReactNode;
    value: any;
  }

  const _CONFIG_: typeof config;
  const android: any;
  const webkit: any;

  namespace Express {
    interface Request {
      dispatchScheduler: Array<any>;
    }
  }

  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    __PRELOADED_STATE__: any;
  }
}
