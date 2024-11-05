# User Guide for NestJS Middleware Project

This document provides step-by-step instructions on how to use the NestJS middleware project.

## Overview

The NestJS middleware project demonstrates the use of middleware in a NestJS application to log HTTP requests and responses.

## Middleware Explanation

The project includes a `LoggerMiddleware` that tracks and logs HTTP request/response information. Here's what it does:

1. For each incoming request, the middleware:
   - Captures the timestamp when the request starts
   - Waits for the response to finish
   - Logs the following information:
     - Timestamp in ISO format
     - HTTP method (GET, POST, etc.)
     - Request path
     - Response status code
     - Request duration in milliseconds

Example log output:
```
[Response] 2024-03-14T10:30:45.123Z GET /health 200 5ms
```

## Issues

### Class Constructor Error
When running `server.js`, you might encounter the following error:
```
[Nest] ERROR [ExceptionsHandler] Class constructor LoggerMiddleware cannot be invoked without 'new'
```

This error occurs due to middleware instantiation issues in the compiled JavaScript. Note that this error doesn't occur when running `server.compiled.js` due to different compilation handling by Bytenode.

## Prerequisites

Before you begin, ensure you have Node.js and npm/yarn installed on your system.

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
npm install
# or yarn install
```

### 3. Build the Project

To build the project, run the following command:

```bash
npm build
# or yarn build
```

This command compiles the TypeScript code and outputs the files to the `prod/` directory.

## Running the Project

You can run the project using one of the following commands:

- To start the server using the compiled JavaScript:

```bash
node prod/server.js
```

- Alternatively, to run the pre-compiled file:

```bash
node prod/server.compiled.js
```


## Testing the Health Endpoint

To verify that the server is running correctly, you can test the health endpoint. Open a new terminal window and execute:

```bash
curl http://localhost:3000/health
```

If the server is functioning properly, you should receive a successful response indicating that the service is healthy.

Please check the program logs as well.

## Webpack Configuration

The project uses Webpack for building the application. Below is the configuration file (`webpack.config.js`) used in this project:

```javascript
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BytenodeWebpackPlugin } = require('@herberttn/bytenode-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: {
    server: './src/main.ts',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  node: {
    dirname: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BytenodeWebpackPlugin({ keepSource: true }),
  ],
  optimization: {
    minimize: false,
  },
  performance: {
    maxEntrypointSize: 1000000000,
    maxAssetSize: 1000000000,
  },
  output: {
    path: path.resolve(__dirname, 'prod'),
    filename: '[name].js',
  },
};
```