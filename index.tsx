import ReactDom from 'react-dom';
import App from './App';
import './app.scss';

import { createUploadLink} from 'apollo-upload-client'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";
import 'bootstrap/dist/css/bootstrap.min.css';
const client = new ApolloClient({
    link: createUploadLink({
        uri: "http://localhost:8080/graphql/",
    }),
    cache: new InMemoryCache()
});


ReactDom.render(<ApolloProvider client={client}><App /></ApolloProvider>,document.getElementById("root"))