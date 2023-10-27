/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import PostView from "./PostView";
import { APIURL } from "../API/api";
import { useState, useEffect } from "react";

export default function EditPostView({ post, reRender, token }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [willDeliver, setWillDeliver] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const updatePost = async (post) => {
        try {
            const response = await fetch(`${APIURL}/posts/${post._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    post: {
                        title: title,
                        description: description,
                        price: price,
                        location: location,
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

    async function handleUpdate(e) {
        e.preventDefault();

        const result = await updatePost(post);
        setIsEditing(false);
        await reRender();
    }
    useEffect(() => {
        function initData() {
            setTitle(post.title);
            setDescription(post.description);
            setPrice(post.price);
            setLocation(post.location);
            setWillDeliver(post.willDeliver);
        }
        initData();
    }, []);
    return (
        <div>
            <PostView post={post} token={token} />
            <br />
            <div>
                <button onClick={() => {
                    setIsEditing(isEditing ? false : true);
                }}>
                    {isEditing ? "Cancel" : "Edit Post"}
                </button>
            </div>
            {isEditing && (
                <form onSubmit={handleUpdate}>
                    <label>
                        <div className="title">Title</div>
                        <input type="text" value={title} onChange={(e) => {setTitle(e.target.value);
                        }} />
                    </label>
                    <label>
                        <div className="description">Description</div>
                        <input type="text" value={description} onChange={(e) => {
                            setDescription(e.target.value);
                        }} />
                    </label>
                    <label>
                        <div className="price">Price</div>
                        <input type="text" value={price} onChange={(e) => {
                            setPrice(e.target.value);
                        }} />
                    </label>
                    <label>
                        <div className="location">Location</div>
                        <input type="text" value={location} onChange={(e) => {
                            setLocation(e.target.value);
                        }} />
                    </label>
                    <label>
                        <div>Will Deliver</div>
                        <select value={willDeliver} onChange={(e) => {
                            setWillDeliver(e.target.value);
                        }}>
                            <option value={false}>false</option>
                            <option value={true}>true</option>
                        </select>
                    </label>
                    <br />
                    <button type="submit">
                        <div>Save Changes</div>
                    </button>
                </form>
            )}
        </div>
    );
}