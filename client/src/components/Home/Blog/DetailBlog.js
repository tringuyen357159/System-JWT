import axios from 'axios';
import React, { useState, useEffect }  from 'react'
import { useParams } from "react-router-dom";
import NavbarMenu from '../NavbarMenu/NavbarMenu';
import './DetailBlog.css'
import PersonIcon from '@material-ui/icons/Person';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const DetailBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({})
    const [blogs, setBlogs] = useState([])
    const history = useHistory();
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        const getDetailBlog = async () => {
            try {
                const res = await axios.get(`https://js-post-api.herokuapp.com/api/posts/${id}`);
                if(res && res.data) {
                    setBlog(res.data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        const fetchPostList = async () => {
            const randomIndex = Math.floor(Math.random() * 5);
            try {
                const res = await axios.get(`https://js-post-api.herokuapp.com/api/posts?_limit=4&_page=${randomIndex}`);
                if(res && res.data && res.data.data) {
                    setBlogs(res.data.data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getDetailBlog()
        fetchPostList()

        let timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500);

        return () => {
            clearInterval(timer)
        }

    },[id])

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
                <div className="bg-content">
                    <div className="img-banner">
                        <img 
                            src={blog.imageUrl} 
                            alt=""
                            className="detailImg" 
                        />
                    </div>
                    <div className="content-header">
                        <div className='row full-box'>
                            <div className="col-md-12">
                                <h3>{blog.title}</h3>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-md-12 author">
                                <PersonIcon />
                                <span>{blog.author}</span>
                            </div>
                        </div>
                    </div>
                    <div className="main-content">
                        <p>
                            {blog.description}
                        </p>
                    </div>
                    <div>
                        <h4>CÁC BLOG NỔI BẬC</h4>
                    </div>
                    <div className="blog-container">
                        {blogs && blogs.length > 0 &&
                            blogs.map((item, index) => {
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
                </div>
            }
        </>
    )
}

export default DetailBlog
