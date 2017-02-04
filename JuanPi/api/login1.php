<?php
    header("Content-type:text/html;charset=utf-8");
    function doPost(){
		session_start();
		//$_SESSION["user"]=null;
		// if($_SESSION["user"]==null|| $_SESSION["user"]==undefined){
		$user=0;
		if(!isset($_SESSION["info_user"])){
			if(isSet($_POST["user"]) && isSet($_POST["password"])){
				$conn=new mysqli("localhost","root","","usercenter");
				mysqli_query($conn,"set character set 'utf8'");//读库
				mysqli_query($conn,'set names utf8');//写库
				$result=$conn->query("select * from t_user where user='".$_POST["user"]."' and secret='".$_POST["password"]."';");
				while($row = mysqli_fetch_assoc($result)){
					$info= array('id'=>$row["id"],'user'=>$row["user"],'mail'=>$row["mail"],'mobile'=>$row["mobile"],"name"=>$row["name"]);
					//{"id":$row["id"],"user":$row["user"],"mail":$row["mail"],"mobile":$row["mobile"],"name":$row["name"]};
					$infodata=json_encode($info);
					$_SESSION["info_user"]=$infodata;
					$user=1;
				}
				$conn->close();
			}
			echo $_SESSION["info_user"];
		}else{
			echo $_SESSION["info_user"];
		}
    }
    doPost();
?>