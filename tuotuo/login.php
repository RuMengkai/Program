<?php
	function shou(){
		$mysql_server_name='localhost';//数据库连接地址
	    $mysql_username='root';//数据库用户名
	    $mysql_password='';//数据库密码
	    $mysql_database='user';//数据库名称
		//获取传送的数据 用户名和密码
		$_phone=$_POST["phone"];
		$_pw=$_POST["password"];
		//先查找有没有这个用户
		$sql="select * from user where phone=".$_phone."&&pw=".$_pw.";";
		query($mysql_server_name,$mysql_username,$mysql_password,$mysql_database,$sql,$_phone,$_pw);
	}
	//从数据库查找数据
	function query($mysql_server_name,$mysql_username,$mysql_password,$mysql_database,$sql,$_phone,$_pw){
	    $conn=new mysqli($mysql_server_name,$mysql_username,$mysql_password,$mysql_database);
	    mysqli_query($conn,"set names 'utf8'");
	    mysqli_query($conn,"set character set 'utf8'");
	    $result=$conn->query($sql);//返回的是记录集
	    while($row=mysqli_fetch_assoc($result)){
	        	echo 1;
	    }
	    mysqli_close($conn);//关闭数据库连接
	}
	shou();
?>







	
	
	
	
	
	

































