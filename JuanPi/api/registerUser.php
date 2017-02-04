<?php
header("Content-type:text/html;charset=utf-8");
function doPost(){
    session_start();
    $success=0;
    $conn=new mysqli("localhost","root","","usercenter");
    mysqli_query($conn,"set character set 'utf8'");//读库
    mysqli_query($conn,'set names utf8');//写库
    $value="'".$_POST["user"]."','".$_POST["mobile"]."','".$_POST["mail"]."','".$_POST["secret"]."','".$_POST["name"]."'";

    if($conn->query("insert into t_user (user,mobile,mail,secret,name) values (".$value.");")==true){
        $success=1;
        $result=$conn->query("select * from t_user where user='".$_POST["user"]."';");
        while($row = mysqli_fetch_assoc($result)){
            $info= array('id'=>$row["id"],'user'=>$row["user"],'mail'=>$row["mail"],'mobile'=>$row["mobile"],"name"=>$row["name"]);
            $info_data=json_encode($info);
            $_SESSION["info_user"]=$info_data;
        }
    }
    $conn->close();
    echo $success;
}
doPost();
?>