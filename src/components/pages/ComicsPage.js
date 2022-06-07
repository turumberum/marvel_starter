import { Helmet } from 'react-helmet'   
import AppBanner from "../appBanner/AppBanner";
import ComicsList from '../comicsList/ComicsList';

const ComicPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of Marvel comics"
                />
                <title>Comics page</title>
            </Helmet>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicPage