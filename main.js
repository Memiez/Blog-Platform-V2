let blogs = []; // ตัวแปรสำหรับเก็บบล็อกทั้งหมด
const pageSize = 6; // จำนวนบทความต่อหน้า
let currentPage = 1; // หน้าปัจจุบัน

// ฟังก์ชันสำหรับดึงข้อมูลจากไฟล์ JSON และแสดงบล็อกในเว็บไซต์
function fetchBlogs() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(retrievedBlogs => {
        blogs = retrievedBlogs; // จัดเก็บบล็อกในตัวแปร blogs
        showBlogs(); // แสดงบล็อกในหน้าแรก
    })
    .catch(error => console.error('Error fetching data:', error));
}

function showBlogs() {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const blogsToShow = blogs.slice(startIndex, endIndex);

  // โค้ดสำหรับแสดงบล็อก
  const mainElement = document.querySelector('main');
  mainElement.innerHTML = ''; // ล้างบล็อกก่อนหน้า

  blogsToShow.forEach(blog => {
      const blogArticle = document.createElement('article');
      const randomImage = `https://picsum.photos/seed/${blog.id}/600/400`;
      blogArticle.innerHTML = `
          <img src="${randomImage}" alt="Random Image for blog post" class="article-image" />
          <h2>${blog.title}</h2>
          <p>${blog.body}</p>
          <a href="#">Read More..</a>
      `;
      mainElement.appendChild(blogArticle);
  });
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

// ตั้งค่า Event Listener สำหรับปุ่ม
document.getElementById('nextPageButton').addEventListener('click', showNextPage);
document.getElementById('previousPageButton').addEventListener('click', showPreviousPage);

// เมื่อหน้าเว็บโหลดเสร็จ ให้เรียก fetchBlogs เพื่อเริ่มการดึงข้อมูล
window.onload = fetchBlogs;
