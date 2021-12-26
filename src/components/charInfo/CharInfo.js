import { Component } from 'react';
import MarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner'
import Skeleton from '../skeleton/Skeleton'
import PropTypes from 'prop-types'; 
import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProsp) {
        if (this.props.charId !== prevProsp.charId){
            this.updateChar()
        }
    }

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true           
        })
    }

    onError = () => {
        this.setState({
            loading: false, 
            error: true
        })
    }

    updateChar = () => {
        const {charId} = this.props
        if (!charId) return

        this.onCharLoading()
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render(){
        const {char, loading, error} = this.state
        const skeleton = char || loading || error ? null : <Skeleton/> 
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error || !char) ? <View char={char}/> : null

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char

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

CharInfo.prosType = {
    charId: PropTypes.number
}

export default CharInfo;