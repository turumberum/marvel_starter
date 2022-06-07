import { useHttp } from  '../hooks/http.hook'

const useMarvelService = () => {

    const {loading, error, request, clearError, process, setProcess} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=d65aa8c74d07a932af77e385f25e3409'
    const _offsetChar = 210
    
    const getAllCharacters = async (offset = _offsetChar) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }   

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }   

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0])
    }
    
    const getCharByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const _transformCharacter = (char) => {        
        return {
            id: char.id,
            name: char.name,         
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }

    const _transformComics = (comic) => {      
        return {
            title: comic.title,
            id: comic.id,
            description: comic.description || 'There is no description.',
            pageCount: comic.pageCount ? `${comic.pageCount} pages` : 'No information about the number of pages',
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            language: comic.textObject ? comic.textObject.language : 'en-us',
            price: comic.prices.price ? `$${comic.prices.price}` : 'not available',
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic, getCharByName, process, setProcess}
}

export default useMarvelService;