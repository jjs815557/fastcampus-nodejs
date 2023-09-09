const commenModel = require('./comments.resolvers')

module.exports = {
    // Query : {
    //     comments: (parent) => parent.comments
    // }

    Query : {
        comments:()=>{
            return commenModel.getAllcomments();
        }
    }
}