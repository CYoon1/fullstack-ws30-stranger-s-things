/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { APIURL } from "../API/api";
import PostView from "./PostView";
import EditPostView from "./EditPostView";

export default function Profile({ token }) {
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [willDeliver, setWillDeliver] = useState(false);
    const [location, setLocation] = useState("");

    const myData = async () => {
        try {
            const response = await fetch(`${APIURL}/users/me`, {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = await response.json();
            console.log(result);
            if (result.success) {
                setPosts(result.data.posts);
                setUsername(result.data.username);
            }
            return result;
        } catch (err) {
            console.error(err);
        }
    };

    const makePost = async () => {
        try {
            const response = await fetch(`${APIURL}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    post: {
                        title: title,
                        description: description,
                        price: price,
                        seller: seller,
                        willDeliver: willDeliver,
                    },
                }),
            });
            const result = await response.json();
            console.log(result);
            return result;
        } catch (err) {
            console.error(err);
        }
    };
    const deletePost = async (id) => {
        try {
            const response = await fetch(`${APIURL}/posts/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = await response.json();
            console.log(result);
            if(result.success) {
                setPosts(result.data.posts);
            }
            return result;
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const result = myData();
    }, []);
    function resetInput() {
        setTitle("");
        setDescription("");
        setPrice("");
        setLocation("");
        setWillDeliver("");
    }

    async function handleAdd(e) {
        e.preventDefault();

        const result = await makePost();
        await myData();
        resetInput();
    }

    async function handleDelete(post) {
        await deletePost(post._id);
        await myData();
        resetInput();
    }
    async function getData() {
        await myData();
    }

    return (
        <div>
            <div className="welcome">{`Welcome, ${username}`}</div>
            <form onSubmit={handleAdd} className="card flex">
                <label>
                    <div className="title">Title: </div>
                    <input type="text" value={title} onChange={(e) => {
                        setTitle(e.target.value);
                    }} />
                </label>
                <label>
                    <div className="description">Description: </div>
                    <input type="text" value={description}  onChange={(e) => {
                        setDescription(e.target.value);
                    }}/>
                </label>
                <label>
                    <div className="price">Price: </div>
                    <input type="text" value={price} onChange={(e) => {
                        setPrice(e.target.value);
                    }} />
                </label>
                <label>
                    <div>Will Deliver: </div>
                    <select value={willDeliver} onChange={(e) => {
                        setWillDeliver(e.target.value);
                    }}>
                        <option value={false}>NO</option>
                        <option value={true}>YES</option>
                    </select>
                </label>
                <br />
                <button type="submit">
                    <div>Add Post</div>
                </button>
            </form>
            <div>
                <h1 className="subtitle">Your Active Posts</h1>
                {posts &&
                    posts
                        .filter((post) => {
                            return post.active === true;
                        })
                        .map((post) => {
                            return (
                                <div className="card" key={`${post._id} container`}>
                                    <EditPostView
                                        key={post._id}
                                        post={post}
                                        reRender={getData}
                                        token={token}
                                    />
                                    <button onClick={async (e) => {
                                        await handleDelete(post);
                                    }}>
                                        Delete
                                    </button>
                                </div>
                            );
                        })}
            </div>
            <div>
                <h1 className="subtitle">Deleted Posts</h1>
                {posts && 
                posts
                .filter((post) => post.active === false)
                .map((post) => {
                    return (
                        <div key={`${post._id} container`}>
                            <PostView key={post._id} post={post} token={token} />
                            <div>(Deleted Post)</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}