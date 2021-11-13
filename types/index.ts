
  interface ConfigType {
    locales: LangDataType;
    defualtLang?: string;
    lang?: string;
    themeColor?: string;
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
