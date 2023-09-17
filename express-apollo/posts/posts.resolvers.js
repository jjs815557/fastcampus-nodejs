const postsModule = require('./posts.model');

module.exports = {
    Query:{
        // posts: (parent)=>{
        //     return parent.posts;
        // }
        posts:()=>{
            return postsModule.posts;
        },
        post: (_,args)=>{
            return postsModule.getAllposts(args.id);
        }
    },
    Mutation: {
        addNewPost:(_,args)=>{
            return postsModule.addNewPost(args.id, args.title, args.description)
        }
    }
}