var daDangNhapVaoAcc;
function registerAccount() {
    event.preventDefault();

   // Lấy giá trị từ các trường input
   var hoTen = document.getElementById('hoTen').value;
   var sdt = document.getElementById('sdt').value;
   var email = document.getElementById('email').value;
   var pass = document.getElementById('pass').value;
   var passXN = document.getElementById('passXN').value;
   var maGT = document.getElementById('maGT').value; // Không bắt buộc

   // Kiểm tra dữ liệu nhập

  //kiểm tra họ tên

  var reghoTen = /^[A-Za-z\s]{2,}$/;
   if(hoTen && !reghoTen.test(hoTen)) {
       alert('Họ tên không hợp lệ');
       return;
   }

   // kiểm tra định dạng email 
   var regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
   if(email && !regEmail.test(email)) {
       alert('Email không hợp lệ');
       return;
   }

   // Kiểm tra định dạng số điện thoại
   var regPhone = /((\+84)|0)[3|5|7|8|9]+([0-9]{8})\b/;
   if(sdt && !regPhone.test(sdt)) {
       alert('Số điện thoại không hợp lệ');
       return;
   }

   // Kiểm tra định dạng mật khẩu
   var regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[!|@|#|$|%|^|&|*]).{8,}$/;
   if(pass.length < 8 ||  !regPass.test(pass)) {
       alert('Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ cái, số à kí tự đặc biệt');
       return;
   }

   //  Kiểm tra mật khẩu nhập lại
   if(pass != passXN) {
       alert('Mật khẩu xác nhận không khớp');
       return;
   }

   const users = JSON.parse(localStorage.getItem('users') || '[]');
   const userExists = users.some(user => user.email === email || user.sdt === sdt);

   if(userExists) {
       alert('Người dùng đã tồn tại.');
       return;
   }


   users.push({hoTen, sdt, email, pass, passXN, maGT});
   localStorage.setItem('CurrentUser', JSON.stringify(users));

   alert('Đăng ký thành công');

   location.href = "../html/index.html";
}


function loginAccount() {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    // Lấy giá trị từ các trường input trong form đăng nhập
    var sdtEmail = document.getElementById('SDT_Email').value; // Số điện thoại hoặc email
    var password = document.getElementById('password').value;

    // Kiểm tra xem người dùng đã nhập thông tin hay chưa
    if (!sdtEmail || !password) {
        alert('Vui lòng nhập đầy đủ thông tin đăng nhập.');
        return;
    }

    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Tìm kiếm người dùng trong mảng
    const user = users.find(user => (user.sdt === sdtEmail || user.email === sdtEmail) && user.pass === password);

    if (user) {
        alert('Đăng nhập thành công!');

        // Lưu trạng thái đăng nhập vào localStorage
        localStorage.setItem('isLoggedIn', true);
        // Nếu modal chưa thay đổi, thực hiện thay đổi và đặt biến modalChanged thành true
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        // Nếu isLoggedIn có giá trị true và modal chưa thay đổi, thực hiện thay đổi và đặt biến modalChanged thành true
       
        document.addEventListener('DOMContentLoaded', function() {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (isLoggedIn === 'true') {
                // Nếu đã đăng nhập thành công, thay đổi data-bs-target thành #daDangNhap
               
                $("#users").attr("data-bs-target", "#daDangNhap");
            }
        });
        daDangNhapVaoAcc= true;
        // Chuyển hướng trang
        // Sau khi đăng nhập thành công
        var daDangNhapVaoAcc = true;
        capNhatGiaoDien(daDangNhapVaoAcc);

        // Lưu trạng thái đăng nhập vào Local Storage
        localStorage.setItem("loggedInState", "true");
        location.href = "../html/index.html";
        
    } else {
        alert('Số điện thoại/email hoặc mật khẩu không chính xác. Vui lòng thử lại.');
    }
}
window.onload = function() {
    var loggedInState = localStorage.getItem("loggedInState");
    var daDangNhapVaoAcc = loggedInState === "true";
    capNhatGiaoDien(daDangNhapVaoAcc);
};

// Hàm để cập nhật giao diện dựa trên trạng thái đăng nhập
function capNhatGiaoDien(daDangNhap) {
    var userIcon = document.getElementById("users");
    if (daDangNhap) {
        // Nếu đã đăng nhập, mở modal đã đăng nhập
        userIcon.setAttribute("data-bs-toggle", "modal");
        userIcon.setAttribute("data-bs-target", "#daDangNhap");
    } else {
        // Nếu chưa đăng nhập, mở modal đăng nhập
        userIcon.setAttribute("data-bs-toggle", "modal");
        userIcon.setAttribute("data-bs-target", "#dangNhap");
    }
}
function getTenDangNhap() {
    var usernameInput = localStorage.getItem('hoTen');
    return usernameInput.value;
}


// Hàm để đăng xuất
function dangXuat() {
    // Xử lý đăng xuất ở đây
    // Sau khi đăng xuất
    var daDangNhapVaoAcc = false;
    capNhatGiaoDien(daDangNhapVaoAcc);

    // Xóa trạng thái đăng nhập khỏi Local Storage
    localStorage.removeItem("loggedInState");
}
// Hàm get set cho người dùng hiện tại đã đăng nhập
function getCurrentUser() {
    return JSON.parse(window.localStorage.getItem('CurrentUser')); // Lấy dữ liệu từ localstorage
}

function setCurrentUser(u) {
    window.localStorage.setItem('CurrentUser', JSON.stringify(u));
}
//dang xuat ,xoa nguoi dung dang dang nhap
function logOut() {
    window.localStorage.removeItem('CurrentUser');
    location.reload();
}

function layThongTin() {
    var hoTen = document.getElementById('hoTen').value;
    var sdt = document.getElementById('sdt').value;
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;
    var passXN = document.getElementById('passXN').value;
    var maGT = document.getElementById('maGT').value;

    // Hiển thị thông tin trong console
    console.log("Họ và tên:", hoTen);
    console.log("Số điện thoại:", sdt);
    console.log("Email:", email);
    console.log("Mật khẩu:", pass);
    console.log("Xác nhận mật khẩu:", passXN);
    console.log("Mã giới thiệu:", maGT);

    // Thực hiện các thao tác khác với thông tin ở đây, như gửi dữ liệu đến server
}