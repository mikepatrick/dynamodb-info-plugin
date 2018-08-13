export interface ServerlessInstance {
    cli: CLI;
    processedInput: ProcessedInput;
    getProvider: () => ServerlessProvider;
    setProvider: (name: string, provider: ServerlessProvider) => void;
    service: ServerlessService
    getVersion: () => string;
    init: () => Promise<any>;
    
}

export interface ServerlessService {
    app: string;
    custom: { [key: string]: string | Object };
    functions: ServerlessFunctions;
    package: any
    plugins: string[];
    pluginData: any;
    provider: ServerlessServiceProvider;
    resources: ServerlessResources;
    service: string;
    serviceObject: { name: string },
    tenant: any;
    getAllEventsInFunction: (functionName: string) => any; //TODO
    getAllFunctions: () => any;
    getAllFunctionsNames: () => string[];
    getEventInFunction: (eventName: string, functionName: string) => any;
    getFunction: (functionName: string) => any;
    getServiceName: () => string;
    getServiceObject: () => { name: string };
}

export interface ServerlessFunctions {

}

export interface ServerlessResources {
    Resources: { [key: string]: ServerlessResource }
}

export interface ServerlessResource {
    Type: string;
    Properties: any;
}

export interface CLI {
    consoleLog: (message: string) => void;
    log: (message: string) => void;
}

export interface ProcessedInput {
    commands: string[];
    options: { [key: string]: string };
}

export interface ServerlessServiceProvider {
    name: string;
    region: string;
    remoteFunctionData: any;
    runtime: string;
    stage: string;
    variableSyntax: string;
    versionFunctions: boolean;
}

export interface ServerlessOptions {
    region: string;
    stage: string;
}
export interface AwsProvider extends ServerlessProvider {
    options: ServerlessOptions;
    sdk: any;
}