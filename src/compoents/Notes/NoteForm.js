import propTypes from 'prop-type';
import React from 'react';
import Select from 'react-select';

const NoteForm =(props)=>{
  const { fromTitle,title,content,titleChanged,contentChanged,submitClicked,submitText} = props;
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  return (
<div>
<h2>{fromTitle}</h2>
<div>
<input
type="text"
name="titLe"
className="form-input mb-30"
placeholder="العنوان"
value={title}
onChange={titleChanged}
/>
<div className='dive-select-section'>
  
  <Select className="form-select"  options={options} />
  <Select className="form-select"  options={options} />
  
</div>
<textarea
  rows="10"
  name="content"
  className="form-input"
  placeholder="النص"
  value={content}
  onChange={contentChanged}
/>
<a href='#' className="button green" onClick={submitClicked} >{submitText}</a>
</div>

</div>

  );

}

export default NoteForm;

NoteForm.prototypes ={
  title: propTypes.string ,
}