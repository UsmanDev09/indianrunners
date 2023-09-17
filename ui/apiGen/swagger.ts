const {codegen} = require('swagger-axios-codegen');

codegen({
    remoteUrl: 'http://localhost:5000/docs.json',
    outputDir: './src/pages/api',
    // useStaticMethod: true,
    classNameMode: 'parentPath',
    methodNameMode: 'operationId', // Specify the method name generation mode
});