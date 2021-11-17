<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Multi Select Sortable</title>

    <!--jQuery & jQuery UI-->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.0/jquery-ui.min.js"></script>

    <!--multiselect-sortable-->
    <script src="assets/js/jquery.multiselect.sortable.js"></script>
    <link rel="stylesheet" href="assets/css/jquery.multiselect.sortable.js.css">
    <script>
        jQuery(function($){
            $('.multiselectsortable').multiselect_sortable();
            
            $('.submit_btn').on('click',function(){
                var a = $('.hasan').val()
                console.log(a)
                return false;
            })
            
        })
    </script>
</head>
<body>

<?php
    print_r($_POST);
?>

<form action="" method="post">
    <select name="multiselectsortable" class="multiselectsortable hasan" multiple>
        <option value="1" selected data-deneme="deneme" disabled>ID</option>
        <option value="2" selected disabled>Username</option>
        <option value="3" disabled>3</option>
        <option value="4" selected>4</option>
    </select>
    <input type="submit" class="submit_btn">
</form>

</body>
</html>