import { useState, useEffect } from "react";
import { Post } from "../modules/post";
import axios from "axios";
import './getPosts.css'



const PostInfo = () => {
  const [postId, setPostId] = useState('');
  const [author, setPostAuthor] = useState('');
  const [title, setPostTitle] = useState('');
  const [content, setPostContent] = useState('');
  let post: boolean=false;
  //const [post, setPost] = useState<Post>();
  const [error, setError] = useState(null);

  const fetchPostInfo = async () => {
    
      axios.get('http://localhost:3000/post/'+postId).then(response => {
        console.log(response.data.data);
        setPostTitle(response.data.data.title);
        console.log(response.data.data.author);
        post=true;
        setPostContent(response.data.data.content);
        setPostAuthor(response.data.data.author);
        console.log(content);
        console.log(post);
      }).catch((err) => console.log(err))
      //const {author, content, title}= response.data;
      
      
      

  };
  
  return (
    <div>
      <input
        type="text"
        placeholder="Enter post ID"
        value={postId}
        onChange={(e) => setPostId(e.target.value)}
      />
      <button onClick={fetchPostInfo}>Get Post Info</button>
      { (
        <div>
          <h2>{title}</h2>
          <p>{content}</p>


          <p>Author: {author}</p>
        </div>
      )}
      
    </div>
  );
};

export default PostInfo;































 /* interface GetPostsProps {
    postsUpdated: boolean;
    setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
} */
/*
function GetPosts({ postsUpdated, setSelectedPost } : GetPostsProps){
    const [users, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/user')
        .then((result) => setPosts(result.data))
        .catch((err) => console.log(err))
    }, [postsUpdated] );

    const handlePostClick = (post: Post) => {
        setSelectedPost(post);
    };


    return (
        <div className="users-container">
            <div className="table-container">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Author</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((post, index ) => (
                                    <tr key = {index} onClick={() => handlePostClick(post)}>
                                    <td>{post._id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.content}</td>
                                    <td>{post.author}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GetPosts;

 */


/* interface FormErrors {
    [key: string]: string;
}

function PropExempl() {

    const [post, setPost] = useState<Post>();

    const handleSubmit= (e: React.FormEvent<HTMLFormElement>)=> {e.preventDefault(); useEffect(() => {
        axios.get('http://localhost:3000/post/'+id)
        .then((result) => setPost(result.data))
        .catch((err) => console.log(err))
    });

}    
    
    

        
        const [id, setId] = useState('');
        const [title, setTitle] = useState('');
        const [content, setContent] = useState('');
        const [author, setAuthor] = useState('');
        
        const [errors, setErrors] = useState<FormErrors>({});
    
        useEffect(() => {
            if (post) {
                //setId(post._id.toString());
                setTitle(post.title.toString());
                setContent(post.content.toString());
                setAuthor(post.author.toString());
                
                //setGender(user.gender.toString());
            }
        }, [post]);
    
    return (
        <div >
            <form onSubmit={handleSubmit} >
                            <div>
                                <label>Id</label>
                                <input type="text" value={id} onChange={(e) => { setId(e.target.value); }} />
                                {errors.id && <span style={{ color: 'red' }}>{errors.id}</span>}
                            </div>
                        <button type="submit">Submit</button>
                    </form>
            {post ? (
                <div>
                    
                    <form  >
                            <h2>User Details:</h2>
                            <div>
                                <label>Id</label>
                                <input type="text" value={id}  />
                                
                            </div>
                            <div>
                                <label>Title</label>
                                <input type="text" value={title}  />
                                
                            </div>
                            <div>
                                <label>Content</label>
                                <input type="text" value={content}  />
                                
                            </div>
                            <div>
                                <label>Author</label>
                                <input type="text" value={author} />
                                
                            </div>
                            
                            
                            
                        </form>
                </div>
            ) : (
                <p>Please .</p>
            )}
        </div>
    );
}

export default PropExempl; */