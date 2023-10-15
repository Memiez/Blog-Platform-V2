// ฟังก์ชันสำหรับดึงข้อมูลจากไฟล์ JSON
function fetchBlogs() {
    fetch('<https://jsonplaceholder.typicode.com/posts>')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log('Error:', error));
  }
  
  // ฟังก์ชันสำหรับแสดงบล็อกในเว็บไซต์
  function displayBlogs(blogs) {
    const blogs = [
        { id: 1, title: 'First Blog' },
        { id: 2, title: 'Second Blog' }
      ];
      
      const newBlog = { id: 3, title: 'Third Blog' };
      blogs.push(newBlog);

      const idToDelete = 2;
      const index = blogs.findIndex(blog => blog.id === idToDelete);
if (index !== -1) {
  blogs.splice(index, 1);
}
const updatedBlog = { id: 1, title: 'Updated First Blog' };
const index = blogs.findIndex(blog => blog.id === updatedBlog.id);
if (index !== -1) {
  blogs[index] = updatedBlog;
}

  // รันฟังก์ชันเมื่อหน้าเว็บโหลด
  window.onload = fetchBlogs;
  