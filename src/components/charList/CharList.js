import { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner'
import PropTypes from 'prop-types'; 
import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)
    
    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        updateCharList(offset, true)
    },[])

    const onCharListLoaded = (newCharList) => {
        let ended = false
        if (newCharList.length < 9) {
            ended = true
        }
        
        setCharList(charList => [...charList, ...newCharList])
        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(ended)
    }

    const updateCharList = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const refList = useRef([])

    const focusOnItem = (id) => {
        refList.current.forEach(item => item.classList.remove('char__item_selected'));
        refList.current[id].classList.add('char__item_selected');
        refList.current[id].focus();
    }
 
    const renderItems = (charList) => {
        const items = charList.map((item, i) => {           
            
            let styleImg = item.thumbnail.includes('image_not_available') ? 'unset' : 'cover'  
            styleImg = item.thumbnail.includes('4c002e0305708.gif') ? 'unset' : styleImg

            return (
                <CSSTransition key={item.id} timeout={500} classNames="char__item">                    
                    <li 
                        className="char__item"
                        key={item.id}
                        ref={el => refList.current[i] = el}
                        tabIndex="0"
                        onClick={() => {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onCharSelected(item.id);
                                focusOnItem(i);
                        }}}>        
                            <img src={item.thumbnail} alt={item.name} style={{objectFit: styleImg}}/>
                            <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        })
    
        return (
           <ul className='char__grid'>
                <TransitionGroup component={null}>
                    {items}            
                </TransitionGroup>
           </ul>
        )
    }

    const items = renderItems(charList)
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading && !newItemLoading ? <Spinner/> : null
        
    return (
        <div className="char__list">               
                {errorMessage}
                {spinner}    
                {items}           
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => updateCharList(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )    
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;