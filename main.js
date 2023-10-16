let blogs = [];
const pageSize = 6;
let currentPage = 1;

// Fetch and display blogs from JSON
function fetchBlogs() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(retrievedBlogs => {
        blogs = retrievedBlogs;
        showBlogs();
        displayPopularBlogs(); // display popular blogs after blogs are fetched
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        // Potentially display this error to the user in the UI.
    });
}

function showBlogs() {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const blogsToShow = blogs.slice(startIndex, endIndex);
  const mainElement = document.querySelector('main');

  mainElement.innerHTML = '';
  blogsToShow.forEach(blog => {
      const blogArticle = document.createElement('article');
      const randomImage = `https://picsum.photos/seed/${blog.id}/600/400`;
      blogArticle.innerHTML = `
          <img src="${randomImage}" alt="Blog Image" class="article-image" />
          <h2>${blog.title}</h2>
          <p>${blog.body}</p>
          <a href="#">Read More..</a> <!-- Changed to maintain language consistency -->
      `;
      mainElement.appendChild(blogArticle);
  });
}

function displayPopularBlogs() {
  const popularBlogs = blogs.slice(0, 3);
  const popularSection = document.getElementById('popularBlogsSection');

  if (!popularSection) {
      console.error("Couldn't find the popular blogs section in your HTML.");
      return;
  }

  popularSection.innerHTML = '';

  if (popularBlogs.length > 0) {
    // Main blog (the first blog)
    const mainBlog = popularBlogs[0];
    const mainBlogImage = `https://picsum.photos/seed/${mainBlog.id}/600/400`;
    const mainBlogArticle = document.createElement('div');
    mainBlogArticle.className = 'main-blog';
    mainBlogArticle.innerHTML = `
      <img src="${mainBlogImage}" alt="Main Blog Image" />
      <h1>${mainBlog.title}</h1>
      <a href="#">READ MORE</a>
    `;
    popularSection.appendChild(mainBlogArticle);

    // The other blogs (the rest in the list)
    const blogsGrid = document.createElement('div');
    blogsGrid.className = 'blogs-grid';
    popularBlogs.slice(1).forEach(blog => {
        const blogArticle = document.createElement('div');
        blogArticle.className = 'blog-item';
        const randomImage = `https://picsum.photos/seed/${blog.id}/600/400`;
        blogArticle.innerHTML = `
            <img src="${randomImage}" alt="Blog Image" />
            <p>${blog.title}</p>
        `;
        blogsGrid.appendChild(blogArticle);
    });

    popularSection.appendChild(blogsGrid);
  }
}

function showNextPage() {
  const totalPages = Math.ceil(blogs.length / pageSize);
  if (currentPage < totalPages) {
    currentPage++;
    showBlogs();
  }
}

function showPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    showBlogs();
  }
}

document.getElementById('nextPageButton').addEventListener('click', showNextPage);
document.getElementById('previousPageButton').addEventListener('click', showPreviousPage);


// statistics
const data = {
  totalBlogs: 123,   // จำนวนบล็อกทั้งหมด
  totalViews: 4567   // จำนวนผู้เข้าชม
};

document.getElementById('totalBlogs').textContent = data.totalBlogs;
document.getElementById('totalViews').textContent = data.totalViews;


window.onload = fetchBlogs;
