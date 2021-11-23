
  interface ConfigType {
    locales: LangDataType;
    defualtLang?: string;
    lang?: string;
    themeColor?: string;
    isVerifiyApi?: boolean;
    isHint?: boolean;
    homePath: string;
  }
  
  interface LangDataType {
    [propName: string]: {
      [propName: string]: string
    };
  }

  interface RegionType {
    [propName: string]: string
  }
  

export {
  ConfigType,
  LangDataType,
  RegionType
}
