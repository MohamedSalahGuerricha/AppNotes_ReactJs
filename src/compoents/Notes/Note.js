import React from 'react';
import  PropTypes  from 'prop-type';
const Note = (props) => {

    const {title,noteClicked,active} = props;

return (

    <li className = {`note-item ${active && 'active'}`} onClick={noteClicked}>{title}</li>
) 

}
export default Note;

Note.propTypes =  {
    title: PropTypes.string,
}