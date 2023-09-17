const express = require('express');
// const {buildSchema} = require('graphql');
const {makeExecutableSchema} = require('@graphql-tools/schema');
const {loadFilesSync} = require('@graphql-tools/load-files')
const path = require('path');
const port = 4000;
const { ApolloServer } = require('apollo-server-express');


//@graphql-tools/load-files 조건을 맞족하는 스키마 파일을 가져온다
const loadedFiles = loadFilesSync('**/*',{// **/*-> 모든 파일
    extensions : ['graphql']
});
const loadedResolvers = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'),);


async function startApolloServer(){
    const app = express();
    
    //@graphql-tools/schema 스키마 파일들을 분리해 놓으면 다시 하나로 모아 합쳐주는 도구
    const schema = makeExecutableSchema({
        typeDefs: [loadedFiles], //[schemaString]
        resolvers:loadedResolvers
        
    });

    const server = new ApolloServer({
        schema,
    });
    await server.start();

    server.applyMiddleware({ app, path: '/graphql'});

    app.listen(port,()=>{
        console.log('running GraphQL server');
    });
}
startApolloServer();





// // 스키마에 해당하는 value 값(응답값)
// const root = {
//     description : 'hello world2',
//     name : 'jjs',
//     posts : require('./posts/posts.model'),
//     comments:require('./comments/comments.model')
// }
