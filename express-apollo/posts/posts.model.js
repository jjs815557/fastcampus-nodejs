const posts = [{
    id: 'post1',
    title: 'it is a first post',
    description: 'it is a first post description',
    comments:[{
        id:'comment1',
        text : 'it is a first comment',
        like : 1,
    }]
},
{
    id: 'post2',
    title: 'it is a second post',
    description: 'it is a second post description',
    comments:[]
}]

function getAllposts() {
    return posts;
}

function getPostById(id){
    return posts.find(post =>{
        return post.id === id;
    });
}

function addNewPost(id, title, description){
    const newPost ={
        id,
        title,
        description,
        comments:[]
    }
    posts.push(newPost);
    return newPost;
}

module.exports = {
    getAllposts,
    getPostById,
    addNewPost
}