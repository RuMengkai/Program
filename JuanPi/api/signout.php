<?php
    header("Content-type:text/html;charset=utf-8");
    function doOut(){
		session_start();
		session_unset("info_user");//清空session
		echo 0;
    }
    doOut();
?>



