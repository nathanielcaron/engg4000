// React
import { Container, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useState } from 'react';

// Stylesheet
import './post.css';

// Resources
import StaticMap from '../maps/StaticMap';
import { FRow, FCol } from '../FlexContainers';

function Post({postData}) {

  const [postImageModal, setPostImageModal] = useState(false);
  const [avatarImageModal, setAvatarImageModal] = useState(false);

  // Create Tags for rendering
  const tags = postData.tags.map(tag => {
    return <Button variant="outline-primary" className="tag" key={tag}>{tag}</Button>;
  });

  // Format the given date
  const date = new Date(postData.date_created);
  const date_string = format(date, 'MMMM d, yyyy');

  return (
    <>
      <Container className="outer-container">
        <FRow>
          <FCol>
            <button className="image-button avatar clickable hover-outline" onClick={() => setAvatarImageModal(true)}>
              <img className="avatar" src={postData.author.avatar_url} />
            </button>
            <div className="user-name text-center">{postData.author.name}</div>
          </FCol>

          <FCol className="post-body">
            <FRow className="post-content">
              <FCol  className="post-description">
                <FRow className="title-section">
                  <div className="post-title">{postData.title}</div> 
                  <div className="text-muted">{date_string}</div>
                </FRow>
                <div className="post-body">{postData.body}</div>
                <FRow className="tag-container">
                  {tags}
                </FRow>
              </FCol>
            </FRow>
            <FRow>
              <FCol className="post-image">
                <button className="image-button" onClick={() => setPostImageModal(true)}>
                  <img className="clickable hover-outline" src={postData.img_URL} />
                </button>
              </FCol>

              <FCol className="post-location">
                <StaticMap width={2000} height={500} position={postData.location}/>
                <div className="text-muted text-center">{postData.location_string}</div>
              </FCol>
            </FRow>
          </FCol>
        </FRow>
      </Container>

      <Modal size='xl' scrollable show={postImageModal} onHide={() => setPostImageModal(false)}>
        <Modal.Header closeButton>{postData.title}</Modal.Header>
        <Modal.Body style={{width:'100%', height:window.innerHeight}}>
          <img className="modal-image" src={postData.img_URL} />
        </Modal.Body>
      </Modal>

      <Modal size='xl' scrollable show={avatarImageModal} onHide={() => setAvatarImageModal(false)}>
        <Modal.Header closeButton>{postData.author.name}</Modal.Header>
        <Modal.Body style={{width:'100%', height:window.innerHeight}}>
          <img className="modal-image" src={postData.author.avatar_url} />
        </Modal.Body>
      </Modal>
    </>
  )
}

Post.propTypes = {
  postData: PropTypes.shape({
    author: PropTypes.shape({
      name: PropTypes.string,
      avatar_url: PropTypes.url,
    }),
    body: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    img_URL: PropTypes.string,
    date_created: PropTypes.string,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    location_string: PropTypes.string
  })
}

export default Post;