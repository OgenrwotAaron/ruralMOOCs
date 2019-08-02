import React from 'react';
import Jumbotron from '../Jumbotron/jumbotron';

const Categories = (props) => {
    const imageName=()=>{
        let name=null

        switch (props.match.params.id) {
            case 'science':
                name='/images/science.jpg'
            break;
            case 'agriculture':
                    name='/images/agriculture.jpg'
            break;
            case 'arts':
                name='/images/history.png'
            break;
            case 'commerce':
                name='/images/economics.jpg'
            break;
            default:
                name=null;
                break;
        }
        return name;
    }
    return (
        <div>
            <Jumbotron type='category' image={imageName()}/>
        </div>
    );
};

export default Categories;