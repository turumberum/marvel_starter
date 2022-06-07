import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from 'react';
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
const MainPage = lazy (() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const PageError = lazy(() => import('../pages/404'))
const SinglePage = lazy(() => import('../pages/SinglePage'))
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));

// {
//     routesMassive.map(
//         ({path, element}) => {                                                             
//             return <Route path={path} element={element}/>
//         }
//     )
// }  


// const routesMassive = [
//     {path: "/", element: <MainPage/>},
//     {path: "/comics", element: <ComicsPage/>},
//     {path: "/comics/:comicId", element:<SingleComicPage/>},                      
//     {path: "*", element: <PageError/>}
// ]

// const Content = () => {
//     let location = useLocation();

//     return (
//         <div className="app">            
//                 <AppHeader/>
//                 <main>
//                     <Suspense fallback={<Spinner/>}>
//                         <TransitionGroup component={null}>
//                             <CSSTransition key={location.key} classNames="opacity" timeout={300}>
//                                 <Routes location={location}>
//                                     <Route path="/" element={<MainPage/>}/>                            
//                                     <Route path="/comics" element={<ComicsPage/>}/>
//                                     <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
//                                     <Route path="*" element={<PageError/>}/>
//                                 </Routes> 
//                             </CSSTransition>   
//                         </TransitionGroup>                    
//                     </Suspense>                  
//                 </main>       
//             </div>
//     )
// }

const App = () => {
    return (
      <Router>
            <div className="app">            
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>                        
                        <Routes >
                            <Route path="/" element={<MainPage/>}/>                            
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic'/>}/>
                            <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>}/>
                            <Route path="*" element={<PageError/>}/>
                        </Routes>                   
                    </Suspense>                  
                </main>                   
            </div>
      </Router>
    )       
}


export default App;