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
		$sql="select * from user where phone=".$_phone.";";
		query($mysql_server_name,$mysql_username,$mysql_password,$mysql_database,$sql,$_phone,$_pw);
	}
	//插入数据到数据库函数
	function insert($mysql_server_name,$mysql_username,$mysql_password,$mysql_database,$sql){
	    //$flag=0;
	    $conn=new mysqli($mysql_server_name,$mysql_username,$mysql_password,$mysql_database);
	    mysqli_query($conn,"set names 'utf8'");
		mysqli_query($conn,"set character set 'utf8'");
	    if($conn->query($sql)==true){
	    }
	    mysqli_close($conn);
	}
	//从数据库查找数据
	function query($mysql_server_name,$mysql_username,$mysql_password,$mysql_database,$sql,$_phone,$_pw){
	    $conn=new mysqli($mysql_server_name,$mysql_username,$mysql_password,$mysql_database);
	    mysqli_query($conn,"set names 'utf8'");
	    mysqli_query($conn,"set character set 'utf8'");
	    $result=$conn->query("select * from user");//返回的是记录集
	    $sql2="insert into user (phone,pw) values('".$_phone."','".$_pw."');";
	   	$flag=true;
	    while($row=mysqli_fetch_assoc($result)){
	        $menuname=$row['phone'];
	        if($menuname == $_phone){//有这个用户
	        	echo 0;
				$flag=false;
				break;
	        }
	    }
		if($flag){
			echo 1;
			$sql2="insert into user (phone,pw) values('".$_phone."','".$_pw."');";
			insert($mysql_server_name,$mysql_username,$mysql_password,$mysql_database,$sql2);
		}
	    mysqli_close($conn);//关闭数据库连接
	}
	shou();
?>



