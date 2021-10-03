import React from 'react'
import ListItem from '../ListItem'
import './style.css'

export default class Content extends React.Component {
    constructor() {
        super();
        this.state = { albums: [] };
    }



    async componentDidMount() {
        try {
            const data = await (await fetch('https://jsonplaceholder.typicode.com/albums')).json();
            console.log(data)
            this.setState({ albums: data });

        } catch(e) {
            console.log(e.message)
        }
    }

    render() {
        return (
            <div class="content__container">
                { this.state.albums.length === 0 
                ? <h3>Something went wrong during getting content.</h3> 
                : ( <>
                    <div className="content__title">
                        <h2>Albums</h2>
                    </div>
                    <div className="content__list-container">
                        <ul className="content__list">
                            {this.state.albums.map(album => <ListItem title={album.title} key={album.id}/>)}
                        </ul>
                    </div> 
                    </>
                 ) }
        </div>)
    }
}
