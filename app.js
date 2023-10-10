const objectsArray = [];
// const postsArray =[];

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) =>
    json.forEach((Object) => {
      const newProduct = new Product(Object.title, Object.price, Object.image);

      const div_s = document.createElement("div");
      div_s.innerHTML = `
            <div > 
            <img src="${Object.image}" alt="A beautiful image" style=" height: 200px ;     width:150px ">
            </div>
            <div style="padding : 20px">
            <p> ${Object.title}</p>
            <p> ${Object.price}</p>
            <div/>  
        `;
      objectsArray.push(newProduct);

      //adding style to the div
      div_s.style.backgroundColor = "gray";
      div_s.style.color = "white";
      //   div_s.style.padding = "10px";
      div_s.style.border = "1px solid black";
      div_s.style.display = "flex";
      div_s.style.flexDirection = "column";
      div_s.style.alignSelf = "center";
      div_s.style.alignItems = "center";
      div_s.style.justifyContent = "space-around";
      div_s.style.height = "100%";
      div_s.style.margin = "10px";
      div_s.style.marginTop = "20px";
      div_s.style.borderRadius = "25px";

      div_s.style.gridAutoColumns = "true";
      div_s.style.fontSize = "larger";

      document.getElementById("main").appendChild(div_s);

      //   console.log(newProduct);
      // console.log(`${Object.id} ${Object.title} ${Object.price}  ${Object.image}`);
    })
  );

console.log(objectsArray);

// fetch('http://localhost:3000/post')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => data.forEach((Object) => {
//     const newPost =new Post(Object.id ,Object.userName ,Object.content);
//     postsArray.push(newPost);

//     const post_1 = document.createElement("div");
//     post_1.innerHTML =
//         `   <div>
//             <p> ${Object.userName}</p>
//             <p> ${Object.content}</p>
//             <div/>
//         `;
//         post_1.style.backgroundColor = "gray";
//         post_1.style.color = "white";
//         post_1.style.borderRadius="25px";
//         post_1.style.margin="25px";
//         post_1.style.paddingLeft="25px";
//         post_1.style.border = "1px solid black";

//         document.getElementById("posts").appendChild(post_1);

//   }))
//   .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
//   });
//   console.log(postsArray);

//   document.addEventListener('DOMContentLoaded', function () {
//     const postForm = document.getElementById('postForm');
//     const responseDiv = document.getElementById('response');
//     const userName = document.getElementById('userName');
//     const content = document.getElementById('content');

//     postForm.addEventListener('submit', function (e) {
//         e.preventDefault();
//         console.log(postForm.value);
//         const formData = new FormData(postForm);

//         fetch('http://localhost:3000/post', {
//             method: 'POST',

//             body: JSON.stringify(Object.fromEntries(formData)),
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             responseDiv.innerHTML = `New post created:<br>
//                 Title: ${data.userName}<br>
//                 Body: ${data.content}`;
//         })
//         .catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//         });
//     });
// });
//   function Post(id, userName,content) {
//     this.id = id;
//     this.userName = userName;
//     this.content = content;
//   }

//   class Post {
//     constructor(id, userName, content) {
//       this.id = id;
//       this.userName = userName;
//       this.content = content;
//     }
//   }

// Constructor function for creating product objects
function Product(title, price, image) {
  this.title = title;
  this.price = price;
  this.image = image;
}

document.addEventListener("DOMContentLoaded", function () {
  const postForm = document.getElementById("postForm");
  const responseDiv = document.getElementById("response");
  const userNameInput = document.getElementById("userName");
  const contentInput = document.getElementById("content");
  const postsArray = []; // Initialize the array

  // Function to fetch and display all posts
  function fetchAllPosts() {
    fetch("http://localhost:3000/post")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Assuming data is an array of posts, loop through and display them
        data.forEach((post) => {
          const newPost = new Post(post.id, post.userName, post.content);
          postsArray.push(newPost);

          const postElement = createPostElement(newPost);
          document.getElementById("posts").appendChild(postElement);
        });
      })
      .catch((error) => {
        console.error("There was a problem with fetching all posts:", error);
      });
  }

  // Function to create a Post object
  class Post {
    constructor(id, userName, content) {
      this.id = id;
      this.userName = userName;
      this.content = content;
    }
  }

  // Function to generate the post element
  function createPostElement(post) {
    const postDiv = document.createElement("div");
    postDiv.innerHTML = `
        <div>
          <p>UserName: ${post.userName}</p>
          <p>Content: ${post.content}</p>
          <button onclick="deleteContent(${post.id})">Delet</button>
        </div>`;


    postDiv.style.backgroundColor = "gray";
    postDiv.style.color = "white";
    postDiv.style.borderRadius = "25px";
    postDiv.style.margin = "25px";
    postDiv.style.paddingLeft = "25px";
    postDiv.style.border = "1px solid black";
    return postDiv;
  }
 
  
  // Event listener for form submission
  postForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(postForm);
    
    fetch("http://localhost:3000/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    })

    
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const newPost = new Post(data.id, data.userName, data.content);
        postsArray.push(newPost);
        
        responseDiv.innerHTML = `New post created:<br> 
            Title: ${data.userName}<br>
            Body: ${data.content}`;
            
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });
  
  
  
  
  // Fetch and display all posts when the page loads
  fetchAllPosts();
  console.log(postsArray);
});

function deleteContent(postid) {
  fetch(`http://localhost:3000/post/${postid}`, {
    method: 'DELETE',
  })
    .then(response => {
      console.log('post deleted. Response status:', response.status);

      // postsArray = postsArray.filter(post => post.id !== postId);


    })
    .catch(error => {
      console.error('Error deleting product:', error);
    });
}

