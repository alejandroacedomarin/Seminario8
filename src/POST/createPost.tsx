import { useState } from "react";
import axios from "axios";
import { Post } from "../modules/post";
//import './creates.css';
//import '../App.css';

interface CreatePostProps {
    updatePostList: () => void;
}

interface FormErrors {
    [key: string]: string;
}

interface NewPost {
    title: string,
    content: string,
    author: string
}

function CreatePost({ updatePostList }: CreatePostProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    const validateField = (fieldName: string, value: string) => {
        let errorMessage = '';

        switch (fieldName) {
            case 'title':
                errorMessage = value.trim() === '' ? 'Title is required' : '';
                break;
            case 'content':
                errorMessage = value.trim() === '' ? 'Content is required' : '';
                break;
            case 'author':
                errorMessage = value.trim() === '' ? 'Author is required' : '';
                break;
            default:
                break;
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: errorMessage
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if (isFormValid) {
            axios.get("http://localhost:3000/user/" + author)
                .then(response => {
                    // Verificar si el autor existe
                    if (response.data) {
                        const post: NewPost = {
                            title: title,
                            content: content,
                            author: author
                        };
                        axios.post("http://localhost:3000/post", post)
                            .then(result => {
                                console.log(result);
                                updatePostList();
                                setTitle('');
                                setContent('');
                                setAuthor('');
                            })
                            .catch(err => console.error(err));
                    } else {
                        // Si el autor no existe, mostrar un mensaje de error
                        setErrors(prevErrors => ({
                            ...prevErrors,
                            author: 'Author does not exist'
                        }));
                    }
                })
                .catch(err => {
                    console.error(err);
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        author: 'Author does not exist'
                    }));
                });
        }
    };

    const validateForm = () => {
        let isValid = true;

        validateField('title', title);
        validateField('content', content);
        validateField('author', author);

        for (const error in errors) {
            if (errors[error] !== '') {
                isValid = false;
                break;
            }
        }

        return isValid;
    };

    return (
        <div className="component">
            <h2>Create Post Component</h2>
            <form onSubmit={handleSubmit} className="create-form">
                <div>
                    <label>Title </label>
                    <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); validateField('title', e.target.value); }} />
                    {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
                </div>
                <div>
                    <label>Content </label>
                    <input type="text" value={content} onChange={(e) => { setContent(e.target.value); validateField('content', e.target.value); }} />
                    {errors.content && <span style={{ color: 'red' }}>{errors.content}</span>}
                </div>
                <div>
                    <label>Author ID</label>
                    <input type="text" value={author} onChange={(e) => { setAuthor(e.target.value); validateField('author', e.target.value); }} />
                    {errors.author && <span style={{ color: 'red' }}>{errors.author}</span>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreatePost;