const postsModule = require('./posts.model');

module.exports = {
    Query:{
        // posts: (parent)=>{
        //     return parent.posts;
        // }
        posts:()=>{
            return postsModule.posts;
        }
    }
}