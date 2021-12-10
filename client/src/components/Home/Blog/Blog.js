import React, { useState, useEffect } from 'react';
import NavbarMenu from '../NavbarMenu/NavbarMenu';
import queryString from 'query-string';
import axios from 'axios';
import './Blog.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostSuccess } from '../../../actions/postAction';
import Pagination from '../Pagination/Pagination';
import { Spinner } from 'react-bootstrap';
import SearchBlog from '../SearchBlog/SearchBlog';
import { useHistory } from 'react-router-dom';

const Blog = () => {
    const [filters, setFilters] = useState({
        _limit: 8,
        _page: 1
    })
    const [pagination, setPagination] = useState({
        _page: 1,
        _limit: 8,
        _totalRows: 1,
    });
    const dispatch = useDispatch()
    const postList = useSelector(state => state.postList);
    const [isloading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const fetchPostList = async () => {
            try {
                const paramString = queryString.stringify(filters);
                const res = await axios.get(`https://js-post-api.herokuapp.com/api/posts?${paramString}`);
                if(res) {
                    dispatch(fetchPostSuccess(res.data.data))
                    setIsLoading(false)
                    setPagination(res.data.pagination);
                }
            } catch (error) {
                
            }
        }
        fetchPostList()
    },[filters])

    const onPageChange = (newPage) => {
        setFilters({
            ...filters,
            _page: newPage
        })
    }

    const handleSearchBlog = (data) => {
        setFilters({
            ...filters,
            _page: 1,
            title_like: data.search
        })
    }

    const handleOnClick = (id) => {
        history.push(`/blog/${id}`)
    }

    return (
        <>
            <NavbarMenu />
            {isloading === true 
            ?
                <div className="spinner">
                    <div className="spinner-container">
                        <Spinner animation="border" variant="info" />
                    </div>
                </div>
            :
                <div>
                    <h1 className="blog-heading">POST LIST</h1>
                    <div style={{width: '30%', marginLeft: 'auto', marginRight: 'auto'}}>
                        <SearchBlog 
                            handleSearch={handleSearchBlog} 
                        />
                    </div>

                    <div className="blog-container">
                        {postList.postList && postList.postList.length > 0 &&
                            postList.postList.map(item => {
                                return (
                                    <div 
                                        className="blog-container__item" 
                                        key={item.id}
                                        onClick={() => handleOnClick(item.id)}
                                        style={{cursor: 'pointer'}}
                                    >
                                        <img 
                                            src={item.imageUrl}
                                            alt=""
                                            className="blog-container__item--img"
                                        />
                                        <h4 className="blog-container__item--title">{item.title}</h4>
                                        <div className="blog-container__item--desc">
                                            {item.description}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="blog-pagination">
                        <Pagination pagination={pagination} onPageChange={onPageChange} />
                    </div>
                </div>
            }
            
        </>
    )
}

export default Blog
