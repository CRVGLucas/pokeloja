import React from 'react';
var axios = require('axios').default;
export default class Search extends React.Component {

    componentDidMount(){
        axios.fetch(`http://localhost:3000/busca`).then((content) => {
            console.log('qaqui: ', content)
        })

    }
    render() {
            return (
                <div>
                    <p>ofsoif</p>
                    <p>ofsoif</p>
                    <p>ofsoif</p>
                    <p>ofsoif</p>
                    <p>ofsoif</p>
                </div>

            );
        }

}
