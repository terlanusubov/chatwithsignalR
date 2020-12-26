function ErrorModel(key, value) {
    return {
        errorKey: key,
        errorValue: value
    };
}
function Validation() {
    this.hasError = false;
    this.validateAsync = async function (form,isUser) {
        let errors = [];
        //Validation of Name,Surname and Fathername
        this.name_input = form.find("#name");
        if (this.name_input.length) {
            let valueOfNameInput = this.name_input.val().trim();
            let names = valueOfNameInput.split(" ");
            let requireNames = ["Ad", "Soyad", "Ata adı"];
            if (names.length != 3) {
                this.hasError = true;
                errors.push(new ErrorModel("Ad , Soyad , Ata adı", "Bütün tələblərin doğruluğunu yoxlayın."));
            }
            else {
                let counter = 0;
                for (let name of names) {
                    if (name == "" || name == " ") {
                        this.hasError = true;
                        let errorKey = requireNames[counter];
                        errors.push(new ErrorModel(errorKey + " xətası", errorKey + " boş ola bilməz."));
                    }
                    counter++;
                }

            }
        }
        this.day = form.find("#day");
        this.month = form.find("#month");
        this.year = form.find("#year");

        if (this.day.length || this.month.length || this.year.length) {
            if (this.day.val() == undefined || this.month.val() == undefined || this.year.val() == undefined) {
                errors.push(new ErrorModel("Doğum tarixi xətası", "Doğum tarixi düzgün daxil olunmayıb."));
            }
            //Validation of Birthday
            if (this.day.val() == null) {
                errors.push(new ErrorModel("Doğum tarixi xətası", "Gün daxil edin!"));
            }
            if (this.month.val() == null) {
                errors.push(new ErrorModel("Doğum tarixi xətası", "Ay daxil edin!"));
            }
            if (this.year.val() == null) {
                errors.push(new ErrorModel("Doğum tarixi xətası", "İl daxil edin!"));
            }
        }


        //Valdiation of Phone Number
        this.phone = form.find("#phone");
        if (this.phone.length) {
            if (this.phone.val() == "") {
                errors.push(new ErrorModel("Nömrə xətası", "Nömrə boş qala bilməz!"));
            }

            if (this.phone.val().length != 9) {
                errors.push(new ErrorModel("Nömrə xətası", "Nömrə düzgün daxil edilməyib!"));
            }
        }


        //this.photo = form.find("#upload");
        //if (this.photo.val() == null) {
        //    errors.push(new ErrorModel("Şəkil xətası", "Şəkil boş qala bilməz!"));
        //}


        //Validation of Password
        this.password = form.find("#password");
        if (this.password.length) {
            if (this.password.val() == "") {
                errors.push(new ErrorModel("Şifrə xətası", "Şifrə boş qala bilməz!"));
            }

            if (this.password.val().length < 6) {
                errors.push(new ErrorModel("Şifrə xətası", "Şifrənin uzunluğu ən azı 6 olmalıdır!"));
            }
            else if(!isUser){
                let hasUpperCase = false;
                for (var letter of this.password.val()) {
                    if (letter == letter.toUpperCase()) {
                        hasUpperCase = true;
                        break;
                    }
                }

                if (!hasUpperCase) {
                    errors.push(new ErrorModel("Şifrə xətası", "Şifrədə ən azı 1 böyük hərf olmalıdır"));
                }

                let hasNumber = false;
                for (var number of this.password.val()) {
                    if (!isNaN(number)) {
                        hasNumber = true;
                        break;
                    }
                }

                if (!hasNumber) {
                    errors.push(new ErrorModel("Şifrə xətası", "Şifrədə ən azı 1 rəqəm olmalıdır"));
                }
            }
        }


        this.email = form.find("#email");
        if (this.email.length) {
            if (this.email.val() == "") {
                errors.push(new ErrorModel("Email xətası", "Email boş qala bilməz"));
            }
            else {
                if (!this.email.val().includes("@")) {
                    errors.push(new ErrorModel("Email xətası", "Email düzgün deyil"));
                }
            }
            
        }

        return errors;

    };
}