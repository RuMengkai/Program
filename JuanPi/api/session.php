<?php
    header("Content-type:text/html;charset=utf-8");
    function doPost(){
		session_start();
		if (isset($_SESSION["info_user"])) {
			echo $_SESSION["info_user"];
		}else{
			echo 0;
		}
    }
    doPost();
?>