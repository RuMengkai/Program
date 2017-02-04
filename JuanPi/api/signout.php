<?php
    header("Content-type:text/html;charset=utf-8");
    function doOut(){
		session_start();
		session_unset("user");
		session_destroy();
		echo 0;
    }
    doOut();
?>



