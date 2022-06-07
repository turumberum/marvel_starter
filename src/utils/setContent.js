import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Spinner from '../components/spinner/Spinner'
import Skeleton from '../components/skeleton/Skeleton'

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return (<Skeleton/>)
        case 'loading':
            return (<Spinner/>)
        case 'erroe':
            return (<ErrorMessage/>)
        case 'success':
            return <Component data={data}/>
        default:
            throw new Error()
    }
}

export default setContent