const commetns = [
    {
        id: 'comment1',
        text:'it is a first comment',
        likes : 1,
    },
    {
        id: 'comment2',
        text:'it is a second comment',
        likes : 10,
    }
]

function getAllcomments(){
    return commetns;
}

function getCommentsByLikes(minLikes){
    return commetns.filter(comment =>{
        return comment.likes >= minLikes
    });
}

function addNewComment(id, text){
    const newComment = {
        id,
        text,
        likes:0
    }
    commetns.push(newComment);
    return newComment;
}

module.exports = {
    getAllcomments,
    getCommentsByLikes,
    addNewComment
}