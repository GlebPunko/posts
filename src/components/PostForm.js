import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {
    const [post, setPost] = useState({title: "", body: ""})

    const addNewPost = (e) => {
        e.preventDefault()//предотвращаем деволтное поведение браузера для кнопки
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title: "", body: ""})
    }

    return (
        <form>
            <MyInput
                type="text"
                onChange={e => setPost({...post, title: e.target.value})}
                placeholder="Name of post"
                value={post.title}
            />
            {<MyInput
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                type="text"
                placeholder="Description of post"
            />}
            <MyButton type="submit" onClick={addNewPost}>Create post</MyButton>
        </form>
    );
};

export default PostForm;