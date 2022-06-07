import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService'
import setContent from '../../utils/setContent';
import './comicsList.scss';

const ComicsList = () => {
    
    const [comicsList, setComicsList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [comicsEnded, setComicsEnded] = useState(false)
    const {getAllComics, process, setProcess} = useMarvelService()
    
    useEffect(() => {
        updateComicsList(offset, true)
        // eslint-disable-next-line
    }, [])

    const onComicsListLoaded = (newComicsList) => {
        let ended = false

        if (newComicsList.length < 8) {
            ended = true
        }
        
        setComicsList(comicsList => [...comicsList, ...newComicsList])
        setNewItemLoading(false)
        setOffset(offset => offset + 8)
        setComicsEnded(ended)
    }

    const updateComicsList = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('success'))
    }

    const renderItems = (comicsList) => {
     
        const items = comicsList.map( (item , i) => {
            
        return (
            <li className="comics__item"
                key={i}
                tabIndex="0">
                <Link to={`/comics/${item.id}`}>
                    <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </Link>
            </li>
        )
        })

        return( 
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comicsList), null, newItemLoading)} 
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': comicsEnded ? 'none' : 'block'}}
                    onClick={() => updateComicsList(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )    
}

export default ComicsList;

