import React, { ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import DefaultLayout from '../layouts/DefaultLayout';

import { SERVER_IP, Page } from "../../Config";

import { user } from "../../auth/auth";
import { BoardPost } from "../../type/BoardPosts"

import '../../stylesheets/pages/board.css';
import Button from "../../stylesheets/modules/button.module.css";

const Board = () => {
    const navigate = useNavigate();

    const [userId, setUserId] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const [posts, setPosts] = useState<BoardPost[]>(() => []);

    const [totalPostsCount, setTotalPostsCount] = useState(0);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [totalBlockCount, setTotalBlockCount] = useState(0);

    const [curPage, setCurPage] = useState(1);

    const [sort, setSort] = useState("origin,desc&num,asc");

    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
        setAccessToken(localStorage.getItem('accessToken'));

        getTotalPostsCount();
    }, []);

    /* 비동기 때문에 나눠야 한다. */
    useEffect(() => {
        setTotalPageCount(Math.ceil(totalPostsCount / Page.perPageSize));
    }, [totalPostsCount]);

    useEffect(() => {
        setTotalBlockCount(Math.ceil(totalPageCount / Page.perBlockSize));
    }, [totalPageCount]);
    /* 비동기 때문에 나눠야 한다. */

    useEffect(() => {
        getPosts(`/board/posts?page=${curPage}&sort=${sort}`);
    }, [curPage, sort]);

    const showPage = () => {
        // console.log("totalPostsCount: "+totalPostsCount);
        // console.log("totalPageCount: "+totalPageCount);
        // console.log("totalBlockCount: "+totalBlockCount);
        // console.log("curPage: "+curPage);
        // console.log("posts: "+posts);
    }

    const getTotalPostsCount = () => {
        const response = fetch(SERVER_IP+"/board/posts/totalPostsCount", {
            method: 'GET',
        })
        .then(response => response.json())
        .then(body => {
            setTotalPostsCount(body.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const getPosts = (uri: string) => {
        const response = fetch(SERVER_IP+uri, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(body => {
            setPosts(body.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const write = async () => {
        const isAuth = await user(userId || '', accessToken || '');
        if(isAuth) navigate('/write');
        else navigate('/signIn');
    }

    return (
        <DefaultLayout>
            <div id='boardFrame'>
                <div id='boardHeader'>
                    <div id='boardHeader-top'></div>
                    <div id='boardHeader-bottom' onClick={ showPage }>
                        <button className={ Button.primary } onClick={ write }>write</button>
                    </div>
                </div>

                <div id='boardSection'>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }}></th>
                                <th style={{ width: '40%' }}>title</th>
                                <th style={{ width: '20%' }}>email</th>
                                <th style={{ width: '20%' }}>date</th>
                                <th style={{ width: '10%' }}>view</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => {
                                return (
                                    <tr key={post.id}>
                                        <td>{post.id}</td>
                                        <td className='title'>{post.title}</td>
                                        <td className='email'>{post.user.email}</td>
                                        <td>{post.createdDate}</td>
                                        <td>{post.viewCount}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div id='boardFooter'>
                    <div id='boardFooter-top'>
                        <ReactPaginate
                            pageCount={totalPageCount}
                            onPageChange={ ({selected}) => setCurPage(selected + 1)}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            previousLabel="<"
                            nextLabel=">"  
                        />
                    </div>
                    <div id='boardFooter-bottom'></div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Board;