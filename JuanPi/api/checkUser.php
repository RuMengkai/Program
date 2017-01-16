<?php
    header("Content-type:text/html;charset=utf-8");
    function doPost(){
        $conn=new mysqli("localhost","root","","usercenter");
        mysqli_query($conn,"set character set 'utf8'");//读库
        mysqli_query($conn,'set names utf8');//写库
        $result=$conn->query("select * from t_user where ".$_POST["condition"].";");
        $exist=0;
        while($row = mysqli_fetch_assoc($result)){
            $exist=1;
        }
        $conn->close();
        echo $exist;
    }
    doPost();
?>