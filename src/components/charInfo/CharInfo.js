import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService'
import PropTypes from 'prop-types'; 
import setContent from '../../utils/setContent';
import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null)

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar()
        // eslint-disable-next-line
    },[props.charId])

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = () => {
        const {charId} = props
        if (!charId) return

        clearError()
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('success'))
    }
    

    return (
        <div className="char__info">
            {setContent(process, View, char, false, true)}
        </div>
    )    
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data

    let styleImg = thumbnail.includes('image_not_available') ? 'unset' : 'cover'

    return (
        <>
        <div className="char__basics">
                <img src={thumbnail} alt={name} style={{objectFit: styleImg}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
               {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length ? null : 'No comics featuring this character have been found'}
                {       
                    comics.map((item, i) => {
                        if (i > 9) return false
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li> 
                        )
                    })
                }
                               
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;