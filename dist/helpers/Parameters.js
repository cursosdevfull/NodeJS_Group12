"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Parameters=void 0;class Parameters{static get DB_CONFIG(){return{host:process.env.DB_HOST||"localhost",port:Number(process.env.DB_PORT)||3306,entities:[process.env.DB_ENTITIES||"src/**/infrastructure/**/*.entity.ts"],username:process.env.DB_USERNAME||"user",password:process.env.DB_PASSWORD||"password",database:process.env.DB_DATABASE||"db",synchronize:"false"!==process.env.DB_SYNCHRONIZE,logging:"false"!==process.env.DB_LOGGING,poolSize:Number(process.env.DB_POOL_SIZE)||10,maxQueryExecutionTime:Number(process.env.DB_MAX_QUERY_EXECUTION_TIME)||1e4}}}exports.Parameters=Parameters,Parameters.PORT=process.env.PORT||3e3;