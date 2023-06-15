import React, { useState, useEffect, } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { useFlags, } from 'flagsmith/react'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { favComic, unFavComic, } from '../../redux/actions/comic'
import notFoundImage from '../../assets/not-found.jpg'
import modalBackground from '../../assets/modal-background.jpg'

import './ComicModal.scss'

Modal.setAppElement('#root')

function ComicModal({ 
  unFavComicCallback,
  fetchFavItems,
  favComics,
  unFavComic,
  favComic,
  comic,
  disablePrevPaginator,
  disableNextPaginator,
  openNextComic,
  openPrevComic,
  openDefaultValue,
  onCloseCallback,
}) {
  const flags = useFlags(['copy_link_feature'],)

  const [open, setOpen] = useState(false)
  const [forceClose, setForceClose] = useState(false)

  const domain = new URL(window.location.href)
  const copyPageURL = domain.origin + '/comic/' + comic.id

  useEffect(() => {
    if (openDefaultValue && open && forceClose) {
      setForceClose(false)
    }
  }, [])

  const handleOpenModalOperation = () => {
    setOpen(true)
  }
  
  const handleCloseModalOperation = () => {
    setOpen(false)
    setForceClose(true)
    if (onCloseCallback) {
      setForceClose(false)
      onCloseCallback()
    } else if (disableNextPaginator && disablePrevPaginator) {
      setForceClose(false)
    }
  }

  const handleFavouriteComicClick = () => {
    favComic(comic.id)
  }

  const handleUnfavouriteComicClick = () => {
    unFavComic(comic.id)
    if (fetchFavItems) {
      handleCloseModalOperation()
      unFavComicCallback(fetchFavItems)
    }
  }

  function getModalStyles() {
    if (window.innerWidth < 650) {
      return styles.comicModalMobile
    }
    return styles.comicModal
  }

  function getInnerIconStyles() {
    let innerStyles = { 
      ...styles.icon, 
      right: 32,
      bottom: 511,
      position: 'absolute',
    }
    if (disableNextPaginator && disablePrevPaginator) {
      innerStyles.bottom = 548
    }
    if (window.innerWidth < 650) {
      innerStyles = {
        ...innerStyles,
        ...styles.iconMobile,
      }
      if (disableNextPaginator && disablePrevPaginator) {
        innerStyles.bottom = 466
      }
    }
    return innerStyles
  }

  const __renderPaginationLinks = () => {
    if (disableNextPaginator && disablePrevPaginator) {
      return null
    }
    return (
      <div>
        <button 
          style={styles.linkBtn} 
          className={`btn btn-link ${disablePrevPaginator ? 'disabled' : ''}`}
          onClick={() => { setOpen(false); openPrevComic();  }}
        >
          Previous
        </button>
        <button 
          style={{ ...styles.floatRightBtn, ...styles.linkBtn, }}
          className={`btn btn-link float-right ${disableNextPaginator ? 'disabled' : ''}`}
          onClick={() => {  setOpen(false); openNextComic();  }}
        >
          Next
        </button>
      </div>
    )
  }

  const __renderImage = () => {
    let image = notFoundImage
    if (comic.images.length) {
      image = comic.images[0].path+'.'+comic.images[0].extension
    }
    return <CardMedia
      component='img'
      height='450'
      image={image}
      alt={comic.title}
      className='comic-image'
    />
  }
  
  function __renderFavouriteIcon() {
    if (!favComics.ids.includes(comic.id)) {
      return <FavoriteBorderIcon 
        onClick={handleFavouriteComicClick}
        style={getInnerIconStyles()}
        fontSize='large' 
        color='warning' 
      />
    }
    return <FavoriteIcon
      onClick={handleUnfavouriteComicClick}
      style={getInnerIconStyles()}
      fontSize='large' 
      color='warning' 
    />
  }
  
  return (
    <>
      <div className='comic-thumbnail-container' id={comic.id}>
        <img 
          onClick={handleOpenModalOperation}
          className='comic-thumbnail'
          src={comic.thumbnail.path+'.'+comic.thumbnail.extension} 
          alt={comic.title} 
        />
        <p onClick={handleOpenModalOperation}>{comic.title}</p>
      </div>
      <Modal
          isOpen={function() {
            let res = open || openDefaultValue
            if (forceClose) {
              res = false
            }
            return res
          }()}
          contentLabel='Comic Modal'
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          onRequestClose={handleCloseModalOperation}
          style={getModalStyles()}
          onAfterOpen={() => { console.log('opened comic', comic) }}
        >
        <Card sx={{ maxWidth: 345 }}>
          {__renderPaginationLinks()}
          {__renderImage()}
          {__renderFavouriteIcon()}
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {comic.title}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <span dangerouslySetInnerHTML={{ __html: comic.description, }} ></span>
            </Typography>
          </CardContent>
          <hr/>
          <CardActions>
            <a 
              className='btn btn-dark store-page-link'
              href={comic.urls[0].url}
              style={styles.linkBtn}
            >
              Store page
            </a>
          </CardActions>
          <CardActions>
            <a 
              onClick={handleCloseModalOperation} 
              className='btn btn-warning close-modal-btn close-modal-btn'
              style={styles.linkBtn}
            >
              Close
            </a>
            {flags.copy_link_feature.enabled ?
              <a 
                href={copyPageURL} 
                className='btn btn-primary close-modal-btn copy-link-btn'
                style={{ ...styles.linkBtn, ...styles.floatRightBtn }}
              >
                Comic page
              </a> :
            null}
          </CardActions>
        </Card>
      </Modal>
    </>
  )
}

const styles = {
  linkBtn: {
    textDecoration: 'none',
    outline: 'none',
    boxShadow: 'none',
  },
  comicModal: { 
    content: { 
      width: 375, 
      height: 630, 
      left: '40%', 
      backgroundImage: `url(${modalBackground})`,
    },
  },
  comicModalMobile: {
    content: { 
      width: 320, 
      height: 550, 
      backgroundImage: `url(${modalBackground})`,
    },
  },
  iconMobile: {
    cursor: 'pointer',
    right: 32,
    bottom: 427,
    fontSize: 50,
    position: 'absolute',
  },
  icon: {
    cursor: 'pointer',
    right: 32,
    bottom: 645,
    fontSize: 50,
    position: 'absolute',
  },
  floatRightBtn: {
    position: 'absolute',
    right: 27,
  },
}

const mapStateToProps = state => ({
  favComics: state.comic.favComics,
})
const mapDispatchToProps = dispatch => ({
  favComic: id => dispatch(favComic(id)),
  unFavComic: id => dispatch(unFavComic(id)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ComicModal)
