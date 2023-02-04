import React, {useState, useRef, useMemo, useEffect} from "react";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../requests/PostService";
import {getPagesCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import MyLoader from "../components/UI/loader/MyLoader";
import MyPagination from "../components/UI/pagination/MyPagination";


function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: "", query: ""})
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    // const bodyInputRef = useRef();//можем напрямую получить доступ к DOM элементу
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts(response.data)
        const totalCount = response.headers["x-total-count"]
        setTotalPages(getPagesCount(totalCount, limit));
    })
    useEffect(() => {
        fetchPosts(limit, page)
    }, [])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const changePage = (page) => {
        setPage(page)
        fetchPosts(limit, page  )
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>Create post</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{margin: "15px"}} />
            <PostFilter filter={filter} setFilter={setFilter}/>
            {postError && <h1>Error: {postError}</h1>}
            {isPostsLoading
                ? <div style={{display: "flex", justifyContent: "center", marginTop: 30}}><MyLoader /></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="List posts"/>
            }
            <MyPagination page={page}
                          changePage={changePage}
                          totalPages={totalPages}/>

        </div>
    );
}

export default Posts;
