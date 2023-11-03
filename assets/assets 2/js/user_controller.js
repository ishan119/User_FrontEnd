export class UserController{
    constructor() {
        $("#btnSaveDetails").click(e=>{
            e.preventDefault()
            this.save()
        });

        $("#btnClear").click(e=>{
            e.preventDefault()
            this.clear()
        })

    }


    save(){
        if (!this.validateInputs()){
            return;
        }
        let name = $("#txtName").val();
        let contact = $("#txtContact").val();
        let email = $("#txtEmail").val();
        let birthday = $("#txtBirthDay").val();
        let gender = $(".gen:checked").val();
        var profile_pic = $('#profile_pic').prop('files')[0];
        var nic_front = $('#nic_front').prop('files')[0];
        var nic_rear = $('#nic_rear').prop('files')[0];
        let nic = $("#txtNicNo").val();

        console.log("Name : "+name);
        console.log("Contact : "+contact);
        console.log("Email : "+email);
        console.log("Birthday : "+birthday);
        console.log("Gender : "+gender);
        console.log("NIC : "+nic);


        var form = new FormData();
        form.append("userName", name);
        form.append("password", "123456");
        form.append("contact", contact);
        form.append("email", email);
        form.append("birthday", birthday);
        form.append("gender", gender);
        form.append("nicNo", nic);
        form.append("profilePic", profile_pic, "file");
        form.append("nicFront", nic_front, "file");
        form.append("nicRear", nic_rear, "file");

        var settings = {
            "url": "http://localhost:8081/api/v1/user/0",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        $.ajax(settings).done(function (response) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Account Create Success ',
                showConfirmButton: false,
                timer: 1500
            });
        }).fail(e => {
            console.log(e)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Fill All the fields and try again",
            })
        });

    }


    clear(){
        $("#txtName").val('');
        $("#txtContact").val('');
        $("#txtEmail").val('');
        $("#txtBirthDay").val('');
        $('#profile_pic').val('')
        $('#nic_front').val('');
        $('#nic_rear').val('');
        $("#txtNicNo").val('');
        $("#profile_pic_img").attr("src","");
        $("#nic_front_img").attr("src","");
        $("#nic_rear_img").attr("src","");
    }

    validateInputs() {
        // Regular expressions
        const nameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
        const contactRegex = /^\d{10}$/; // Allows exactly 10 digits
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Assumes yyyy-mm-dd format
        const nicRegex = /^\d{10,12}$/; // Assumes xxxxx-xxxxxxx-x format

        // Get input values
        let name = $("#txtName").val();
        let contact = $("#txtContact").val();
        let email = $("#txtEmail").val();
        let birthday = $("#txtBirthDay").val();
        let gender = $(".gen:checked").val();
        let nic = $("#txtNicNo").val();

        var profile_pic = $('#profile_pic').prop('files')[0];
        var nic_front = $('#nic_front').prop('files')[0];
        var nic_rear = $('#nic_rear').prop('files')[0];

        // Validate inputs
        if (!nameRegex.test(name)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Please enter a valid name.",
            })
            return false;
        }

        if (!contactRegex.test(contact)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Please enter a valid 10-digit contact number.",
            })
            return false;
        }

        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Please enter a valid email address.",
            })
            return false;
        }

        if (!dateRegex.test(birthday)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Please enter a valid date",
            })

            return false;
        }

        if (!nicRegex.test(nic)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Please enter a valid NIC",
            })
            return false;
        }


        if (!profile_pic) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Please import a profile picture.",
            })
            return false;
        }

        if (!nic_front) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Please import a NIC Front picture.",
            })
            return false;
        }

        if (!nic_rear) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Please import a NIC Rear picture.",
            })
            return false;
        }
        return true;
    }


}
new UserController();