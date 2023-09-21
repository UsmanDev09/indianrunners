const {codegen} = require('swagger-axios-codegen');

codegen({
    remoteUrl: 'http://localhost:5000/docs.json',
    outputDir: './src/pages/api',
    // useStaticMethod: true,
    modelMode: 'interface',
    enumNamePrefix: 'Enum',
    classNameMode: 'parentPath',
    methodNameMode: 'operationId', // Specify the method name generation mode
    outputFileMode: 'interface', // Specify that you want TypeScript interfaces
});