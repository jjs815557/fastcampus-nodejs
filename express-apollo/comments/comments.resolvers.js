const commenModel = require('./comments.model')

module.exports = {
    // Query : {
    //     comments: (parent) => parent.comments
    // }

    Query : {
        comments:()=>{
            return commenModel.getAllcomments();
        },
        commentsByLikes : (_, args) => {
            return commenModel.getCommentsByLikes(args.minLikes);
        }
    },
    Mutation : {
        addNewComment :(_,args)=>{
            return commenModel.addNewComment(args.id, args.text);
        }
    }
    
}