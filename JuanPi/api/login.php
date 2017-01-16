<?php
    header("Content-type:text/html;charset=utf-8");
    function doPost(){
		session_start();
		//$_SESSION["user"]=null;
		// if($_SESSION["user"]==null|| $_SESSION["user"]==undefined){
		$user=0;
		if(!isset($_SESSION["user"])){
			if(isSet($_POST["user"]) && isSet($_POST["password"])){
				$conn=new mysqli("localhost","root","","usercenter");
				mysqli_query($conn,"set character set 'utf8'");//读库
				mysqli_query($conn,'set names utf8');//写库
				$result=$conn->query("select * from t_user where user='".$_POST["user"]."' and secret='".$_POST["password"]."';");
				while($row = mysqli_fetch_assoc($result)){
					$user=$row["user"];
					$_SESSION["user"]=$row["user"];
				}
				$conn->close();
			}
			echo $user;
		}else{
			echo $_SESSION["user"];
		}
    }
    doPost();
?>