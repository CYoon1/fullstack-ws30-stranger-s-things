/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { APIURL } from "../API/api";
import PostView from "./PostView";

export default function PostList({ token }) {
    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState("");

    function filterPost(post) {
        return searchText === ""
        ? post
        : post.title.toLowerCase().includes(searchText.toLowerCase());
    }

    async function fetchPosts() {
        try {
            const response = await fetch(`${APIURL}/posts`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const results = await response.json();
            setPosts(results.data.posts);
            console.log(results.data.posts);
            return results;
        } catch (err) {
            console.error("Trouble fetching PostList: ", err);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>
            <div>
                <label className="search">
                    Search
                    <input type="text" placeholder="Search Text" value={searchText} onChange={(e) => {
                        setSearchText(e.target.value);
                    }} 
                    />
                </label>
                <h1 className="subtitle">POSTS</h1>
                <br />
            </div>
            <div>
                {posts && posts.filter(filterPost).map((post) => {
                    return <PostView key={post._id} post={post} token={token} />;
                })}
            </div>
            <br />
        </>
    )
}