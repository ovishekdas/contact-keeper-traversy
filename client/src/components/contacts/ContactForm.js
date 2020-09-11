import React, {useState, useContext, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext'
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; // ES6

let modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  /* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
 let formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

export default function ContactForm() {
    
    const contactContext = useContext(ContactContext);
    const {addContact, updateContact, clearCurrent, current} = contactContext;

    useEffect(()=>{
        if(current !== null){
            setContact(current);
        }else{
            setContact({
                name: '',
                email: '',
                phone: '',
                blog: '',
                type: 'personal'
            })
        }
    }, [contactContext, current]);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        blog: '',
        type: 'personal'
    });
    const {name, email, phone, blog, type} = contact;

    const onChange = e => setContact({...contact, [e.target.name]: e.target.value})
    const onChangeBlog = html => setContact({...contact, blog: html})

    const onSubmit = e => {
        e.preventDefault();
        if(current === null){
            contactContext.addContact(contact);
        } else{
            updateContact(contact);
        }
       clearAll();
        // setContact({
        //     name: '',
        //     email: '',
        //     phone: '',
        //     type: 'personal'
        // })
    }

    const clearAll = ()=>{
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type="text" 
            placeholder="name"
            name="name"
            value={name}
            onChange={onChange}
            />
            <input 
            type="email" 
            placeholder="email"
            name="email"
            value={email}
            onChange={onChange}
            />
            <input 
            type="text" 
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={onChange}
            />
            <h5>Contact Type: </h5>
            <input
            type="radio"
            name="type"
            value="personal"
            checked={type === 'personal'}
            onChange={onChange}
            /> Personal{' '}
            <input
            type="radio"
            name="type"
            value="professional"
            checked={type === 'professional'}
            onChange={onChange}
            /> Professional
            <div>
                <input
                    type="submit"
                    value={current ? 'Edit Contact' : 'Add Contact'}
                    className="btn btn-primary btn-block"
                />
            </div>
            <div>
            <ReactQuill value={blog || ''}
                  onChange={onChangeBlog}
                  name="blog"
                  modules={modules}
                    formats={formats}
                   />
            </div>
            
            {current && <div>
                <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
                </div>}
                
        </form>
    )
}


  
  