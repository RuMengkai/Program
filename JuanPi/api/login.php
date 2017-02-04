<?php
    header("Content-type:text/html;charset=utf-8");
    function doPost(){
		session_start();
		$info_data=0;//
		if(isSet($_POST["user"]) && isSet($_POST["password"])){
			$conn=new mysqli("localhost","root","","usercenter");
			mysqli_query($conn,"set character set 'utf8'");//读库
			mysqli_query($conn,'set names utf8');//写库
			$result=$conn->query("select * from t_user where user='".$_POST["user"]."' and secret='".$_POST["password"]."';");
			while($row = mysqli_fetch_assoc($result)){
				$info= array('id'=>$row["id"],'user'=>$row["user"],'mail'=>$row["mail"],'mobile'=>$row["mobile"],"name"=>$row["name"]);
				$info_data=json_encode($info);
				$_SESSION["info_user"]=$info_data;
			}
			$conn->close();
		}
		if(!isset($_SESSION["info_user"])||$info_data===0){
			echo $info_data;
			session_unset("info_user");//清空session
		}else{
			echo $_SESSION["info_user"];
		}
    }
    doPost();
?>