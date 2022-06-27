import React, { useState } from "react";
import {axios} from 'axios'
import { Button, Container } from "react-bootstrap";
import '../App.css'

export const ColumnLeft = () => {
    const [images, setImages] = useState([])

    const fetchImages = async () => {
        const { data } = await axios.get(
          'https://picsum.photos/v2/list?page=0&limit=2'
        );
        setImages(data);
      };
     
    return (
        <Container className="column-left">
            <h2>Left Column</h2>
            <Button
              onClick={() => {
                  fetchImages()
              }}
            >
                Get Images
            </Button>
            {images.map((c,i) => {
                const {author, download_url} = c;
                return (
                    <div key = {i}>
                        <img src={download_url} alt={author} />
                    </div>
                )
            })}
        </Container>
    )
}