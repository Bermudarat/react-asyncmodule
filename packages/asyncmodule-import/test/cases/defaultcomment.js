import AsyncModule from 'react-asyncmodule'; 
const AsyncComponent = AsyncModule({
    delay: 300
});
const Home = AsyncComponent(import(
    /* webpackChunkName: "ilikethis" */
    /* webpackMode: "lazy" */
    './views/home'
));