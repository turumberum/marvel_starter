import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Spinner from '../components/spinner/Spinner'
import Skeleton from '../components/skeleton/Skeleton'

const setContent = (process, Component, data, newItemLoading = false, skeleton =  false) => {
    switch (process) {
        case 'waiting':
            return skeleton ? <Skeleton/> : <Spinner/>
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>
        case 'error':
            return <ErrorMessage/>
        case 'success':
            return <Component data={data}/>
        default:
            throw new Error()
    }
}

export default setContent