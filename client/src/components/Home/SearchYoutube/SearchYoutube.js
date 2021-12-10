import React, {useState} from 'react';
import NavbarMenu from '../NavbarMenu/NavbarMenu';
import { Container, Row, Col  } from 'react-bootstrap';
import './SearchYoutube.scss';
import axios from 'axios';
import moment from 'moment';

const SearchYoutube = () => {
    const [search, setSearch] = useState('')
    const [videos, setVideos] = useState([])


    const handleSearchYoutube = async () => {
        let res = await axios({
            "method": "GET",
            "url": 'https://www.googleapis.com/youtube/v3/search',
            "params": {
                'part': 'snippet',
                'maxResults': '20',
                'key': 'AIzaSyA6NR329zwya78lWW9f5Y--VVt42XzrAoA',
                'type': 'video',
                'q': search
            }
        })
        if (res && res.data && res.data.items) {
            let raw = res.data.items;
            let result = [];
            if (raw && raw.length > 0) {
                raw.map(item => {
                    let object = {};
                    object.id = item.id.videoId;
                    object.title = item.snippet.title;
                    object.createdAt = item.snippet.publishedAt;
                    object.author = item.snippet.channelTitle;
                    object.description = item.snippet.description;

                    result.push(object)
                })
            }

            setVideos(result)
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter' || e.keyCode === 13){
            handleSearchYoutube();
        }
    }
  
    return (
        <>
            <NavbarMenu />
            <Container >
                <div className="search__form mt-4 mb-5">
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                    <button 
                        type="button"
                        onClick={handleSearchYoutube}
                    >Search</button>
                </div>
                {videos && videos.length > 0 && 
                    videos.map(item => {
                        return (
                            <Row key={item.id} className="mb-3">
                                <Col md={5} className="d-flex justify-content-end">
                                    <iframe 
                                        width="360" 
                                        height="200" 
                                        src={`https://www.youtube.com/embed/${item.id}`}
                                        title="YouTube video player" 
                                        frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                    ></iframe>
                                </Col>
                                <Col md={6} >
                                    <div className="search__title mb-2">
                                        {item.title}
                                    </div>
                                    <div className="search__time mb-2">
                                        Created At: {moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss A')}
                                    </div>
                                    <div className="search__author mb-2">
                                        Author: {item.author}
                                    </div>
                                    <div className="search__desc">
                                        {item.description}
                                    </div>
                                </Col>
                            </Row>
                        )
                    })
                }
            </Container>
        </>
    )
}

export default SearchYoutube
