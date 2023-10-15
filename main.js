// ฟังก์ชันสำหรับดึงข้อมูลจากไฟล์ JSON
function fetchBlogs() {
    fetch('blogs.json')
      .then(response => {
        // ตรวจสอบถ้ามีปัญหาในการดึงข้อมูล
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // แปลงข้อมูลที่ได้เป็น JSON
      })
      .then(blogs => {
        // ใช้ข้อมูล blogs ที่ได้เป็น JSON ทำงานที่นี่
        // เช่น: แสดงบล็อกในเว็บไซต์
        displayBlogs(blogs);
      })
      .catch(error => {
        // จัดการกับข้อผิดพลาดที่เกิดขึ้น
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  
  // ฟังก์ชันสำหรับแสดงบล็อกในเว็บไซต์
  function displayBlogs(blogs) {
    const blogContainer = document.getElementById('blog-list'); // ตัวอย่าง ID ของคอนเทนเนอร์ที่จะแสดงบล็อก
  
    blogs.forEach(blog => {
      // สร้าง HTML สำหรับแต่ละบล็อก
      const blogItem = `
        <div class="blog-item">
          <h2>${blog.title}</h2>
          <p>${blog.summary}</p>
          <!-- แสดงข้อมูลอื่น ๆ ตามที่ต้องการ -->
        </div>
      `;
  
      // แทรก HTML ที่สร้างในคอนเทนเนอร์ของบล็อก
      blogContainer.innerHTML += blogItem;
    });
  }
  
  // รันฟังก์ชันเมื่อหน้าเว็บโหลด
  window.onload = fetchBlogs;
  