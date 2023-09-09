const express = require('express');
const app = express();
const port = 4000;
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const {makeExecutableSchema} = require('@graphql-tools/schema');
const {loadFilesSync} = require('@graphql-tools/load-files')
const path = require('path');

//graphql 스키마 작성
// 느낌표(!)는 값이 무조건 있어야 한다는걸 명시
// type query를 쿼리 스키마
// posts:[Post]의 [Post]정의는 type Post에 정의된 스키마를 따른다
// comments:[Comment]는 type Comment의 스카마 정의를 따른다
// const schema = buildSchema(` //! buildSchema 대신 makeExecutableSchema 사용
//     type Query{
//         description: String
//         name: String
//         posts:[Post]
//         comments:[Comment]
//     }

//     type Post{
//         id: ID!
//         title: String!
//         description: String!
//         comments:[Comment]
//     }

//     type Comment{
//         id: ID!
//         text: String!
//         likes: Int
//     }
// `);

// const schemaString =

//     `type Query{
//         posts:[Post]
//         comments:[Comment]    
//     }
    
//     type Post{
//         id: ID!
//         title: String! 
//         description: String!
//         comments:[Comment]
//     }

//     type Comment{
//         id: ID!
//         text: String!
//         likes: Int
//     }
// `

//@graphql-tools/load-files 조건을 맞족하는 스키마 파일을 가져온다
const loadedFiles = loadFilesSync('**/*',{// **/*-> 모든 파일
    extensions : ['graphql']
});

const loadedResolvers = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'),);

//@graphql-tools/schema 스키마 파일들을 분리해 놓으면 다시 하나로 모아 합쳐주는 도구
const schema = makeExecutableSchema({
    typeDefs: [loadedFiles], //[schemaString]
    resolvers:loadedResolvers
    
    // resolvers: { // resolvers-> 특정 값 혹은 조건에 맞는 데이터만 가져오기 
    //     Query: { //쿼리 -> 실질적인 DB에 접근하여 데이터를 가져와야 할 경우 async await를 사용
    //         posts: (parent, args, context, info) =>{
    //             return parent.posts; //parent.posts-> 하드코딩으로 작성한 graphql 결과 값과 같음
    //         },
    //         comments: (parent, args, context, info) =>{
    //             return parent.comments;
    //         },
    //         // posts: async (parent) =>{
    //         //     const product = await Promise.resolve(parent.products);
    //         //     return products;
    //         // },
    //         // posts: async (parent, args, context, info) =>{
    //         //     const product = await Promise.resolve(parent.posts);
    //         //     return product;
    //         // },
    //         // comments: async (parent, args, context, info) =>{
    //         //     const comment = await Promise.resolve(parent.comments);
    //         //     return comment;
    //         // }

    //     }
    // }
});

// 스키마에 해당하는 value 값(응답값)
const root = {
    description : 'hello world2',
    name : 'jjs',
    posts : require('./posts/posts.model'),
    comments:require('./comments/comments.model')
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    // rootValue: root,
    // graphiqlSche: true, //웹으로 자신의 스키마를 쉽게 확인
    graphiql : true //graphql를 쉽게 테스트 할 수 있게 하는 편집모드
}))


app.listen(port,()=>{
    console.log(`running a GraphQL API SERVER at http://loclhost:  ${port}/graphql`);
});