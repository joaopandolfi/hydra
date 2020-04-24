
    function blockControls(){
        document.getElementById("loader").hidden = false;
        let btnSave = document.getElementById("btnSave");
        btnSave.disabled = true; 
        btnSave.classList.toggle("btgrey");
    }

    function releaseControls(){
        document.getElementById("loader").hidden = true;
        let btnSave = document.getElementById("btnSave");
        btnSave.disabled = false; 
        btnSave.classList.toggle("btgrey");
    }

    function clearForm(){
        $('#genericForm')[0].reset();
    }

    function validateForm(){
         if (!$("[name='name']").val()) return 'Favor preencha o campo'
    }

