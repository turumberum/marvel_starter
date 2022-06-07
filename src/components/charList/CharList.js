import { useState, useEffect, useRef, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import setContent from '../../utils/setContent'
import useMarvelService from '../../services/MarvelService'
import PropTypes from 'prop-types'; 
import './charList.scss';

// const setContent = (process, Component, newItemLoading) => {
//     switch (process) {
//         case 'waiting':
//             return <Spinner/>;
//         case 'loading':
//             return newItemLoading ? <Component/> : <Spinner/>;
//         case 'success':
//             return <Component/>;
//         case 'error':
//             return <ErrorMessage/>;
//         default:
//             throw new Error('Unexpected process state');
//     }
// }

const CharList = (props) => {

    const [charList, setCharList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)
    
    const {getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateCharList(offset, true)
        // eslint-disable-next-line
    },[])

    const updateCharList = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('success'))
    }

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
   
    const elements = useMemo( () => {
        return setContent(process, () => renderItems(charList), null, newItemLoading)
        // eslint-disable-next-line
    }, [process])
    
    return (
        <div className="char__list"> 
            {elements}           
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