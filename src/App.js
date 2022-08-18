import React, { useEffect, useState } from 'react';
import './App.css';
import Preview from './compoents/Preview'; {/* 04:48كاين كلام حول طريقة الاستيراد الفيديو 05 إضافة ملاحظه الدقيقه */ }
import Message from './compoents/Message';
import NotesContainer from './compoents/Notes/NotesContainer';
import NotesList from './compoents/Notes/NotesList';
import Note from './compoents/Notes/Note'

import NoteForm from './compoents/Notes/NoteForm';
import Alert from './compoents/Alert';

function App() {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectNote, setselecNote] = useState(null);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [validateionErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('notes')) {
      setNotes(JSON.parse(localStorage.getItem('notes')));
    } else {
      localStorage.setItem('notes', JSON.stringify([]))
    }
  }, []
  );

  // داله الحفظ في التخزين الداخلي 
  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  // دالة عرض الخطأ 
  const validate = () => {
    const validateionErrors = [];
    let passed = true;
    if (!title) {
      validateionErrors.push("الرجاء ادخال عنوان الملاحظه")
      passed = false;
    }
    if (!content) {
      validateionErrors.push('الرجاء ادخال محتوى الملاحظه ')
      passed = false ;
    }
    setValidationErrors(validateionErrors);
    return passed;
  }

  // تغيير عنوان الملاحظه 
  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
    console.log(title);
  }
  // تغيير  محتوى  الملاحظه
  const changeContentHandler = (event) => {
    setContent(event.target.value);
  }

  // حفظ  الملاحظه   
  const saveNoteHandler = () => {
if (!validate()) return; // الخروج من الداله في حال تحقق الشرط 
    const note = {
      id: new Date(),
      title: title,
      content: content
    }
    if (title === '') {
      //  setTitle('ملاحزه')
      note.title = ' ملاحظه غير معنونه ';
    }
    if (content === '') {
      note.content = 'من دون محتوى'
    }


    const updateNotes = [...notes, note]; // معامل النشر es6
    saveToLocalStorage('notes', updateNotes)
    setNotes(updateNotes);
    setCreating(false);
    setselecNote(note.id);
    setTitle('');
    setContent('');
  }
  // اختيار الملاحظه
  const selectNoteHandler = noteId => {
    setselecNote(noteId);
    setCreating(false);
    setEditing(false);
  }
  // الانتقال الى وضع تعديل ملاحظه01:15 الدرس 07
  const editNoteHandler = () => {
    console.log("is clecked ");
    const note = notes.find(note => note.id === selectNote);
    setCreating(false);
    setEditing(true);
    setTitle(note.title);
    setContent(note.content);
  }
  // تعديل ملاحظه 
  const updateNotesHandeler = () => {
    const updateNotes = [...notes];
    const noteIndex = notes.findIndex(note => note.id === selectNote);
    updateNotes[noteIndex] = {
      id: selectNote,
      title: title,
      content: content
    };
    saveToLocalStorage('notes', updateNotes);
    setNotes(updateNotes);
    setEditing(false);
    setTitle('');
    setContent('');
  }
  // حذف ملاحظه 
  const deleteNoteHandler = () => {
    //console.log('اهلا من داخل دالة الحذف');
    const updateNotes = [...notes];
    const noteIndex = updateNotes.findIndex(note => note.id === selectNote);
    notes.splice(noteIndex, 1); ///     هي داله تدخل معرف من مصفوفه و عدد العناصر المراد حذفها بدءا منه splice   و
    saveToLocalStorage('notes', notes);
    setNotes(notes);
    setselecNote(null);

  }
  // الانتقال الى واجهة اضافة  ملاحظه
  const addNoteHandler = () => {
    setCreating(true);
    setEditing(false);
    setTitle('');
    setContent('');
  }



  const getAddNote = () => {
    return (
      <NoteForm
        fromTitle=" ملاحظه جديده  "
        title={title}
        content={content}
        titleChanged={changeTitleHandler}
        contentChanged={changeContentHandler}
        submitText="حفظ"
        submitClicked={saveNoteHandler}
      />
    );


  };

  const getPreview = () => {
    if (notes.length === 0) {
      return <Message title="لا يوجد ملاحظه لعرضها " />   /*  hg 15:50 لاحظ لم نخطط للمكون ميساج قبل البدأ  hhg  */
    }
    if (!selectNote) {
      return <Message title="الرجاء اختيار ملاحظه" />
    }

    const note = notes.find(note => {   // تكلم عن هذه اداله في فديو اضافة ملاحظه في جوايه  16:30
      return note.id === selectNote;
    });

    let noteDisplay = (
      <div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>

      </div>
    )

    if (editing) {
      noteDisplay = (
        <NoteForm
          fromTitle=" تعديل ملاحظه  "
          title={title}
          content={content}
          titleChanged={changeTitleHandler}
          contentChanged={changeContentHandler}
          submitText="حفظ"
          submitClicked={updateNotesHandeler}
        />

      );


    }

    //////
    <div> <h2>تعديل ملاحظة </h2>
            <form>
              <input
                type="text"
                name="title"
                className="form-input mb-30"
                placeholder="العنوان"
                value={title}
                onChange={changeTitleHandler}
              />
    
              <textarea
                rows="10"
                name="content"
                className="form-input"
                placeholder="النص"
                value={content}
                onChange={changeContentHandler}
              />
    
              <a href="#" className="button green" onClick={updateNotesHandeler}>
                حفظ
              </a>
            </form>
          </div>
          //////////


    return (
      <div>
        {!editing &&
          <div className="note-operations">
            <a href="#" onClick={editNoteHandler} >
              <i className="fa fa-pencil-alt" />
            </a>
            <a href="#" onClick={deleteNoteHandler}>
              <i className="fa fa-trash" />
            </a>

          </div>
        }
        {noteDisplay}

      </div>
    );
  };


  return (
    <div className="App">
      <NotesContainer>
        <NotesList>
          {notes.map(note =>
            <Note
              key={note.id}
              title={note.title}
              noteClicked={() => selectNoteHandler(note.id)}
              active={selectNote === note.id}
            />
          )}

        </NotesList>
        <button className="add-btn" onClick={addNoteHandler}>+</button>
      </NotesContainer>
      <Preview>
        {creating ? getAddNote() : getPreview()}
      </Preview>
      {validateionErrors.length !== 0 && <Alert validateionMessages={validateionErrors} /> }
    </div>
  );
}

export default App;
