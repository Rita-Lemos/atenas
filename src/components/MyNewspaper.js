import React, { Component } from 'react'
import SecondaryNavigation from './SecondaryNavigation'
import ListNewsList from './ListNewsList'
import { listnews } from '../css/listnews.css';

class MyNewspaper extends Component {

    render() {
        return (
            <div className="a_BodyMeuJornal">
                <ListNewsList />
            </div>
        )
    }
}

export default MyNewspaper;