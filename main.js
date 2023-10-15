// ฟังก์ชันสำหรับดึงข้อมูลจากไฟล์ JSON และแสดงบล็อกในเว็บไซต์
function fetchBlogs() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(blogs => {
        displayBlogs(blogs);  // ส่งบล็อกที่ได้รับมาให้กับฟังก์ชัน displayBlogs
    })
    .catch(error => console.error('Error fetching data:', error));
}

// ฟังก์ชันสำหรับแสดงบล็อกในเว็บไซต์
function displayBlogs(blogs) {
  const mainElement = document.querySelector('main');

  if (!mainElement) {
      console.error("Couldn't find the main element in your HTML.");
      return;
  }

  // ล้างเนื้อหาที่มีอยู่ใน mainElement
  mainElement.innerHTML = "";

  blogs.forEach(blog => {
      const blogArticle = document.createElement('article');
      const randomImage = `https://picsum.photos/seed/${blog.id}/600/400`;
      blogArticle.innerHTML = `
      <img src="${randomImage}" alt="Random Image for blog post" class="article-image" />          <h2>${blog.title}</h2>
          <p>${blog.body}</p>
          <a href="#">อ่านเพิ่มเติม</a>
      `;
      mainElement.appendChild(blogArticle);
  });
}

// เมื่อหน้าเว็บโหลดเสร็จ ให้เรียก fetchBlogs เพื่อเริ่มการดึงข้อมูล
window.onload = fetchBlogs;
