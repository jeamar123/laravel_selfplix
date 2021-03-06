<!DOCTYPE html>
<html lang="en" ng-app="app">
  <head>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv='expires' content='-1'>
    <meta http-equiv='pragma' content='no-cache'>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>Selfplix - Earn points and redeem prizes</title>
    <link rel="shortcut icon" href="{{ asset('img/logo/camera3.png') }}" type="image/ico">

    <link rel="stylesheet" type="text/css" href="../css/fonts.css">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../css/sweetalert.css">
    <link rel="stylesheet" type="text/css" href="../css/ng-img-crop.css">
    <link rel="stylesheet" type="text/css" href="../assets/main/css/auth-style.css">
    <link rel="stylesheet" type="text/css" href="../assets/main/css/header-style.css">
    <link rel="stylesheet" type="text/css" href="../assets/main/css/footer-style.css">
    <link rel="stylesheet" type="text/css" href="../assets/main/css/style.css">
    <link rel="stylesheet" type="text/css" href="../assets/main/css/responsive.css">
    <link rel="stylesheet" type="text/css" href="../css/loader.css">
    <link rel="stylesheet" type="text/css" href="../css/custom.css">

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-124730031-1"></script>
    <script>
      if( window.location.hostname != 'localhost' ){
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-124730031-1');
      }
    </script>



    <!-- <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <script>
      (adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-9253669175013365",
        enable_page_level_ads: true
      });
    </script> -->
  </head>
  <body ng-controller="mainController">
    <div class="main-body-container">
      <div ui-view="header"></div>

      <section class="main-content-container" >
        <div ui-view="main"></div>
      </section>

      <div ui-view="footer"></div>
    </div>

    <div class="body-loader">
      <div class="loader-container">
        <div class="loader">
          <img src="../img/loader.gif" style="width: 8%;">
        </div>
      </div>  
    </div>
  </body>

  <!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script> -->

  <script type="text/javascript" src="<?php echo $server; ?>/js/jquery.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/angular.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/moment.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/angular-ui-router.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/angular-local-storage.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/ng-file-upload-shim.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/ng-file-upload.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/sweetalert.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/ng-img-crop.js"></script>

  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/app.js"></script>

  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/controllers/mainController.js"></script>

  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/directives/authDirective.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/directives/headerDirective.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/directives/homeDirective.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/directives/leaderboardDirective.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/directives/uploadDirective.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/directives/profileDirective.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/directives/redeemDirective.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/directives/notifDirective.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/directives/searchDirective.js"></script>

  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/factories/factories.js"></script>

  <script type="text/javascript" src="<?php echo $server; ?>/assets/main/process/services/services.js"></script>  

  <script src="https://apis.google.com/js/api.js"></script>

  <!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCOzaOYgvdwnATwVIvSpYixj32rTLbVF3k"></script> -->
</html>